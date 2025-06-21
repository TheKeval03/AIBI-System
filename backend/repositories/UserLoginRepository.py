import bcrypt
from fastapi import HTTPException
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class UserLoginRepository:

    @staticmethod
    def get_user_by_email(email: str):
        response = supabase.table('users').select('*').eq('email', email).single().execute()
        if response.data:
            return response.data
        return None

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str):
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

    @staticmethod
    def login_user(email: str, password: str):
        user = UserLoginRepository.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if not UserLoginRepository.verify_password(password, user['password']):
            raise HTTPException(status_code=401, detail="Incorrect password")

        # Optional: return JWT token if you want session management
        return {"message": "Login successful", "user": user}
