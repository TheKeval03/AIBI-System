from fastapi import APIRouter, HTTPException
from schemas.response.UserRegistrationResponse import UserRegistration, UserResponse
from repositories.GetUserRepository import GetUserRepository
from logger import logger 

router = APIRouter(tags=['User_Register'])

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegistration):
    try:
        logger.info(f"Received registration request for user: {user.username}")
        GetUserRepository.store_user(user)
        logger.info(f"User {user.username} successfully stored in the database.")
        return UserResponse(
            firstname=user.firstname,
            lastname=user.lastname,
            email=user.email,
            mobile_number=str(user.mobile_number),
            username=user.username
        )
    except Exception as e:
        logger.error(f"Error occurred while registering user {user.username}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
