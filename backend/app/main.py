from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import engine, get_db
from app.models import Base#, Item

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello world!"}

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# @app.post("/items/")
# async def create_item(name: str, description: str, db: AsyncSession = Depends(get_db)):
#     new_item = Item(name=name, description=description)
#     db.add(new_item)
#     await db.commit()
#     await db.refresh(new_item)
#     return new_item
