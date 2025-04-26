import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_create_program():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/programs/", json={"name": "Malaria"})
    assert response.status_code == 200
    assert response.json()["name"] == "Malaria"


@pytest.mark.asyncio
async def test_register_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/clients/", json={"name": "John Doe", "email": "john@example.com"})
    assert response.status_code == 200
    assert response.json()["email"] == "john@example.com"
    
    
@pytest.mark.asyncio
async def test_search_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/clients/search/", params={"name": "John"})
    assert response.status_code == 200
    assert len(response.json()) > 0

@pytest.mark.asyncio
async def test_enroll_client_in_program():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Enroll client (assuming client ID = 1, program ID = 1)
        response = await ac.post("/clients/1/enroll", json=[1])
    assert response.status_code == 200
    assert "programs" in response.json()

@pytest.mark.asyncio
async def test_get_client_profile():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/clients/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
