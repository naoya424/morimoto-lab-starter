from fastapi import Depends, FastAPI, Request
from fastapi.responses import JSONResponse
from pymongo.asynchronous.database import AsyncDatabase
from pymongo.errors import PyMongoError

from app.db import get_db, lifespan
from app.routes.sample import router as sample_router

app = FastAPI(
    title="森本研究室 システム開発スターター API",
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url=None,
)
app.include_router(sample_router, prefix="/api")


@app.exception_handler(PyMongoError)
async def database_error(request: Request, exc: PyMongoError):
    return JSONResponse(status_code=503, content={"detail": "データベースに接続できません。"})


@app.get("/api/health", tags=["health"])
async def health(db: AsyncDatabase = Depends(get_db)):
    await db.command("ping")
    return {"status": "ok", "database": "connected"}
