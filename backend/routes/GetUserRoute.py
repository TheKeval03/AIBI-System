from fastapi import APIRouter
from schemas.response.UserRegistrationResponse import UserRegistration,UserResponse 

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegistration):
    
    return user
