from fastapi import FastAPI
from app.api import routes

app = FastAPI(title="Health Information System")

app.include_router(routes.router)
