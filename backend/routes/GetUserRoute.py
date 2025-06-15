from fastapi import APIRouter, HTTPException
from repositories.GetUserRepository import GetUserRepository
from schemas.request.UserRegistrationRequest import UserRegistrationRequest
from schemas.response.UserRegistrationResponse import UserRegistrationResponse

router = APIRouter()
user_repo = GetUserRepository()

@router.post("/register", response_model=UserRegistrationResponse)
async def register_user(user_data: UserRegistrationRequest):
    try:
        # Check if user already exists
        existing_user = await user_repo.get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Create new user
        user_id = await user_repo.create_user(user_data)
        return UserRegistrationResponse(
            success=True,
            message="User registered successfully",
            user_id=user_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}")
async def get_user(user_id: int):
    try:
        user = await user_repo.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))