import os
import bcrypt # type: ignore
from schemas.request import UserRegistrationRequest
from supabase import create_client, Client # type: ignore
from dotenv import load_dotenv # type: ignore
from logger import logger 

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class GetUserRepository:
 
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password using bcrypt"""
        logger.info("Hashing password.")  # Logging password hashing step
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    @staticmethod
    def store_user(user: UserRegistrationRequest):
        logger.info(f"Storing user: {user.username}")
        
        hashed_password = GetUserRepository.hash_password(user.password)

        user_data = {
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            "password": hashed_password,  
            "mobile_number": str(user.mobile_number),
            "username": user.username
        }

        logger.info(f"Checking if user with email: {user.email} or username: {user.username} already exists.")
        existing_user = supabase.table("users").select("*").or_(
            f"email.eq.{user.email},username.eq.{user.username}"
        ).execute()

        if existing_user.data:
            logger.warning(f"User with email {user.email} or username {user.username} already exists.")
            raise Exception("Email or Username already exists.")

        try:
            logger.info(f"Inserting user: {user.username} into database.")
            response = supabase.table("users").insert(user_data).execute()
            logger.info(f"User {user.username} successfully inserted.")
            return response.data
        except Exception as e:
            logger.error(f"Error inserting user {user.username}: {str(e)}")
            raise Exception(f"Error inserting user: {str(e)}")
