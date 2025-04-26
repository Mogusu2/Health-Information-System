from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from app.api import routes

app = FastAPI(title="Health Information System")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(routes.router)
