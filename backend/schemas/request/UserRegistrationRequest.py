from pydantic import BaseModel, EmailStr

class UserRegistrationRequest(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str
    mobile_number: str
    username: str