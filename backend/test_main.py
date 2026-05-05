from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_register_login_and_me():
    email = "testuser@example.com"
    password = "password123"

    register_response = client.post("/register", json={
        "email": email,
        "password": password
    })

    assert register_response.status_code in [200, 400]

    login_response = client.post("/login", json={
        "email": email,
        "password": password
    })

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    me_response = client.get("/me", headers={
        "Authorization": f"Bearer {token}"
    })

    assert me_response.status_code == 200
    assert me_response.json()["email"] == email


def test_notes_crud():
    email = "notesuser@example.com"
    password = "password123"

    client.post("/register", json={
        "email": email,
        "password": password
    })

    login_response = client.post("/login", json={
        "email": email,
        "password": password
    })

    token = login_response.json()["access_token"]

    create_response = client.post("/notes", json={
        "title": "Test note",
        "content": "Test content"
    }, headers={
        "Authorization": f"Bearer {token}"
    })

    assert create_response.status_code == 200

    note_id = create_response.json()["id"]

    get_response = client.get("/notes", headers={
        "Authorization": f"Bearer {token}"
    })

    assert get_response.status_code == 200
    assert len(get_response.json()) >= 1

    delete_response = client.delete(f"/notes/{note_id}", headers={
        "Authorization": f"Bearer {token}"
    })

    assert delete_response.status_code == 200