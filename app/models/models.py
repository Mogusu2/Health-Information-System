from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base



enrollments = Table(
    'enrollments', Base.metadata,
    Column('client_id', ForeignKey('clients.id'), primary_key=True),
    Column('program_id', ForeignKey('programs.id'), primary_key=True)
)


class Client(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)

    programs = relationship("Program", secondary=enrollments, back_populates="clients")


class Program(Base):
    __tablename__ = 'programs'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    clients = relationship("Client", secondary=enrollments, back_populates="programs")
