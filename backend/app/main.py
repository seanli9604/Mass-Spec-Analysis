from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import tempfile
import json
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, get_db
from app.models import Base
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MassSpectrumData(BaseModel):
    data: str


@app.get("/")
def root():
    return {"message": "Hello world!"}

def process_mass_spectrum(file_path):
    HOST_IP = 'host.docker.internal'  # Host's IP address
    PORT = 8001

    url = f"http://{HOST_IP}:{PORT}/process"
    files = {'file': open(file_path, 'rb')}
    response = requests.post(url, files=files)
    result = response.json()['result']

    # interpret the result as a JSON string
    result = json.loads(result)

    return result

@app.post("/analyse")
def analyse(data: MassSpectrumData):

    with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix=".txt") as temp_file:
        temp_file.write(data.data)
        temp_file_path = temp_file.name

    results = process_mass_spectrum(temp_file_path)
    return results

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
