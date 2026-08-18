from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello from Docker!"}

@app.get("/students")
def get_students():
    return [
        {"id": 1, "name": "Brian", "course": "Cloud Engineering"},
        {"id": 2, "name": "Alice", "course": "DevOps"}
    ]
