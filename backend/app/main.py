from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import tempfile
import json
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, get_db
from app.models import Base
import requests
import stripe
import os
from sqlalchemy import select
from app.models import User
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


DEFAULT_CREDITS_ON_SIGNUP = 5

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SIGNING_SECRET")

class CreateCheckoutSessionRequest(BaseModel):
    quantity: int
    email_address: str

class GetUserCredits(BaseModel):
    email_address: str

class EnsureUserRequest(BaseModel):
    email_address: str

YOUR_DOMAIN = 'https://moleclue.org'

async def add_tokens_to_user_account(email_addr: str):
    async with AsyncSession(engine) as session:
        async with session.begin():
            # Query the user by email
            result = await session.execute(
                select(User).where(User.email == email_addr)
            )
            user = result.scalars().first()

            if user:
                # Update the user's credits
                user.credits += 10
            else:
                # Create a new user
                new_user = User(email=email_addr, credits=10)
                session.add(new_user)

@app.post('/credits')
async def get_user_credits(data: GetUserCredits):
    async with AsyncSession(engine) as session:
        async with session.begin():
            # Query the user by email
            result = await session.execute(
                select(User).where(User.email == data.email_address)
            )
            user = result.scalars().first()

            if user:
                return {"credits": user.credits}
            else:
                return {"credits": 0}

@app.post('/create-checkout-session')
async def create_checkout_session(data: CreateCheckoutSessionRequest):    
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': 'price_1QLyKgDiMJiLt3SAM1LmQRwW',
                    'quantity': data.quantity,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '/',
            cancel_url=YOUR_DOMAIN + '/',
            client_reference_id=str(data.email_address)
        )

    except Exception as e:
        return str(e)
    return {"id": checkout_session.id}



@app.post("/webhook")
async def webhook_received(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return {"error": "Invalid payload"}
    except stripe.error.SignatureVerificationError:
        return {"error": "Invalid signature"}

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Retrieve the user ID from the session
        email_address = session.get('client_reference_id')
        if email_address:
            # Updatepostgres user's account in your database
            await add_tokens_to_user_account(email_address)
        else:
            # Handle the case where user_id is not available
            pass

    return {'status': 'success'}

class MassSpectrumData(BaseModel):
    data: str
    filename: str

@app.get("/")
def root():
    return {"message": "Hello world!"}

@app.post('/ensure-user')
async def ensure_user(data: EnsureUserRequest):
    async with AsyncSession(engine) as session:
        async with session.begin():
            result = await session.execute(
                select(User).where(User.email == data.email_address)
            )
            user = result.scalars().first()
            if not user:
                user = User(email=data.email_address, credits=DEFAULT_CREDITS_ON_SIGNUP)
                session.add(user)
            return {"credits": user.credits}


def process_mass_spectrum(file_path):
    HOST_IP = 'host.docker.internal'  # Host's IP address
    PORT = 8001

    url = f"http://{HOST_IP}:{PORT}/process"
    files = {'file': open(file_path, 'rb')}
    response = requests.post(url, files=files)
    result = response.json()['result']

    result = result[:-2] + ']'

    result = re.sub(r"'", '"', result)


    return json.loads(result)


@app.post("/analyse")
async def analyse(data: MassSpectrumData):
    async with AsyncSession(engine) as session:
        async with session.begin():
            result = await session.execute(
                select(User).where(User.email == data.email_address)
            )
            user = result.scalars().first()
            if not user or user.credits < 1:
                raise HTTPException(status_code=400, detail="Not enough credits")

            # Deduct one credit
            user.credits -= 1

    suffix = f".{data.filename.split('.')[-1]}" if '.' in data.filename else '.txt'

    with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix=suffix) as temp_file:
        temp_file.write(data.data)
        temp_file_path = temp_file.name

    results = process_mass_spectrum(temp_file_path)
    return results

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
