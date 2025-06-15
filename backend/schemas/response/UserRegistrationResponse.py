from pydantic import BaseModel, EmailStr, Field, field_validator

class UserResponse(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    mobile_number: str
    username: str

class UserRegistration(BaseModel):
    firstname: str = Field(..., min_length=2, max_length=50)
    lastname: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=20)
    mobile_number: int = Field(..., ge=1000000000, le=9999999999)  # Only 10-digit numbers
    username: str = Field(..., min_length=3, max_length=30)

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if ' ' in v:
            raise ValueError('Password should not contain spaces')
        return v