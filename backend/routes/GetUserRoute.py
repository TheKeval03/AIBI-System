from fastapi import APIRouter, Form

router = APIRouter()

@router.post("/register",response_model=None)
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    # Now you can store the data to your database
    return {"username": username, "email": email}
