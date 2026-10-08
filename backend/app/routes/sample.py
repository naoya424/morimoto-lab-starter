from datetime import datetime, timezone
from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel, StringConstraints
from pymongo.asynchronous.database import AsyncDatabase

from app.db import get_db

router = APIRouter(prefix="/samples", tags=["samples"])


class SampleCreate(BaseModel):
    text: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=500)]


class Sample(BaseModel):
    id: str
    text: str
    created_at: datetime


@router.get("", response_model=list[Sample])
async def list_samples(db: AsyncDatabase = Depends(get_db)):
    documents = await db.samples.find().sort("_id", -1).limit(20).to_list(length=20)
    return [
        Sample(id=str(doc["_id"]), text=doc["text"], created_at=doc["created_at"].replace(tzinfo=timezone.utc))
        for doc in documents
    ]


@router.post("", response_model=Sample, status_code=201)
async def create_sample(sample: SampleCreate, db: AsyncDatabase = Depends(get_db)):
    document = {"text": sample.text, "created_at": datetime.now(timezone.utc)}
    result = await db.samples.insert_one(document)
    return Sample(id=str(result.inserted_id), text=document["text"], created_at=document["created_at"])
