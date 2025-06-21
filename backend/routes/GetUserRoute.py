from fastapi import APIRouter, HTTPException
from schemas.response.UserRegistrationResponse import UserRegistration, UserResponse
from repositories.GetUserRepository import GetUserRepository, UserAlreadyExistsException
from logger import logger

router = APIRouter(tags=['User_Register'])

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegistration):
    try:
        logger.info(f"📨 Registration request received for: {user.username}")
        GetUserRepository.store_user(user)
        logger.info(f"✅ Registration success for: {user.username}")

        return UserResponse(
            firstname=user.firstname,
            lastname=user.lastname,
            email=user.email,
            mobile_number=str(user.mobile_number),
            username=user.username
        )

    except UserAlreadyExistsException as ve:
        logger.warning(f"⚠️ Registration failed: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        logger.error(f"🔥 Unexpected registration error for {user.username}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error. Please try again.")
