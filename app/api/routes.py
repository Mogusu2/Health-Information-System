from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, validator
from app.database import SessionLocal
from app.schemas import schemas
from app.crud import crud
from app.models import models


router = APIRouter()

class EnrollmentRequest(BaseModel):
    # program_ids: List[int]
    program: str  
    clientId: int
    
    @validator('program', 'clientId', pre=True)
    def convert_string_to_int(cls, v):
        return int(v) if isinstance(v, str) else v

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# Create health program
@router.post("/programs/", response_model=schemas.Program)
def create_program(program: schemas.ProgramCreate, db: Session = Depends(get_db)):
    return crud.create_program(db, program)


@router.get("/programs/", response_model=List[schemas.Program])
def get_programs(db: Session = Depends(get_db)):
    programs = db.query(models.Program).all()
    return programs 


# Register a client
@router.post("/clients/", response_model=schemas.Client)
def register_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_client = crud.get_client_by_email(db, client.email)
    if db_client:
        raise HTTPException(status_code=400, detail="Client with this email already exists")
    return crud.create_client(db, client)


@router.get("/clients/", response_model=List[schemas.Client])
def get_clients(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    return clients



# Enroll a client in programs
@router.post("/enroll", response_model=schemas.Client)
def enroll_client(
    enrollment: EnrollmentRequest, 
    db: Session = Depends(get_db)
):
    program = crud.get_program_by_name(db, enrollment.program)
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    return crud.enroll_client_in_programs(
        db, 
        client_id=enrollment.clientId, 
        program_ids=[program.id]  
    )
    
    
# Search for a client
@router.get("/clients/search/", response_model=List[schemas.Client])
def search_client(name: str = "", db: Session = Depends(get_db)):
    return crud.get_client_by_name(db, name)


# View && Expose client profile
@router.get("/clients/{client_id}", response_model=schemas.Client)
def get_client_profile(client_id: int, db: Session = Depends(get_db)):
    client = crud.get_client(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client
