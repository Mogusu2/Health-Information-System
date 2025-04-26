# Health Information System

A basic health information system for managing clients and health programs/services, designed for doctors to track patient enrollments in various health programs.

## Features

- Create health programs (TB, Malaria, HIV, etc.)
- Register new clients in the system
- Enroll clients in one or more health programs
- Search for registered clients
- View client profiles with program enrollments
- REST API for client profile access

## Technologies Used

- Backend: FastAPI
- Database: PostgreSQL- Supabase
- Frontend: React-Vite
- Testing: pytest
- Deployment: Render/Heroku/Vercel (choose one)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/health-info-system.git
   frontend -   cd health-info-system
                cd client
                npm install
                npm run dev

   backend -   cd healt-info-system
                pipenv install
                pipenv shell
                uvicorn app:main:app --reload           


# API Documentation
## Client Endpoints
- GET /api/clients - List all clients

- POST /api/clients - Create a new client

- GET /api/clients/:id - Get client details

- PUT /api/clients/:id - Update client information

- GET /api/clients/search?q=[query] - Search clients

## Program Endpoints
- GET /api/programs - List all programs

- POST /api/programs - Create a new program

- POST /api/enrollments - Enroll client in a program