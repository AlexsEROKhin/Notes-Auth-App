from fastapi import FastAPI

from .database import Base, engine
from . import models

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}