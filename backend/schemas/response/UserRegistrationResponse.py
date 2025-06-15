from pydantic import BaseModel

class UserRegistrationResponse(BaseModel):
    success: bool
    message: str
    user_id: int