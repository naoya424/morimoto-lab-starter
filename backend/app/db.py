import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase


@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncMongoClient(
        os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017"),
        serverSelectionTimeoutMS=3000,
        timeoutMS=5000,
    )
    try:
        await client.admin.command("ping")
        app.state.db = client[os.getenv("MONGODB_DATABASE", "lab_starter")]
        yield
    finally:
        await client.close()


def get_db(request: Request) -> AsyncDatabase:
    return request.app.state.db
