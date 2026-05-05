from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from .auth import hash_password, verify_password, create_access_token
from .database import Base, engine, get_db
from .schemas import UserCreate, UserResponse, UserLogin, TokenResponse
from . import models

app = FastAPI()

Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.post("/login", response_model=TokenResponse)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(existing_user.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }