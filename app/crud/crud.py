from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas

def create_program(db: Session, program: schemas.ProgramCreate):
    db_program = models.Program(name=program.name)
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(name=client.name, email=client.email)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def get_client_by_email(db: Session, email: str):
    return db.query(models.Client).filter(models.Client.email == email).first()

def get_client_by_name(db: Session, name: str):
    return db.query(models.Client).filter(models.Client.name.ilike(f"%{name}%")).all()

def get_program_by_name(db: Session, name: str):
    return db.query(models.Program).filter(models.Program.name == name).first()

def enroll_client_in_programs(db: Session, client_id: int, program_ids: list[int]):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    for pid in program_ids:
        program = db.query(models.Program).get(pid)
        if program and program not in client.programs:
            client.programs.append(program)
    db.commit()
    return client

def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()
