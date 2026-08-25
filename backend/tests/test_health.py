from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check_returns_200():
    response = client.get("/health")
    assert response.status_code == 200


def test_health_check_response_body():
    response = client.get("/health")
    data = response.json()
    assert data["status"] == "ok"
    assert "service" in data
    assert "version" in data
    assert "environment" in data


def test_root_endpoint_returns_200():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
