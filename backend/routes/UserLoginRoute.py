from fastapi import APIRouter, HTTPException, Request
from schemas.request.UserLoginRequest import LoginRequest
from repositories.UserLoginRepository import UserLoginRepository

router = APIRouter(tags=['User_Login'])

@router.post("/login")
async def login(login_request: LoginRequest):
    email = login_request.email
    password = login_request.password

    result = UserLoginRepository.login_user(email, password)
    print(result)
    return result

