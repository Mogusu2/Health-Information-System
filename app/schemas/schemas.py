from pydantic import BaseModel
from typing import List, Optional

class ProgramCreate(BaseModel):
    name: str

class Program(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class ClientCreate(BaseModel):
    name: str
    email: str

class Client(BaseModel):
    id: int
    name: str
    email: str
    programs: List[Program] = []

    class Config:
        orm_mode = True
