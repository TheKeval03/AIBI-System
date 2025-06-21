import os
import bcrypt  # type: ignore
from schemas.request import UserRegistrationRequest
from supabase import create_client, Client  # type: ignore
from dotenv import load_dotenv  # type: ignore
from logger import logger

# Load environment variables
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validate environment variables
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Supabase environment variables are not set.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# Custom Exception for user existence
class UserAlreadyExistsException(Exception):
    pass


class GetUserRepository:

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password using bcrypt"""
        logger.info("🔐 Hashing password.")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')

    @staticmethod
    def store_user(user: UserRegistrationRequest):
        logger.info(f"📥 Storing user: {user.username}")

        # Check if user exists
        logger.info(f"🔎 Checking for existing user with email: {user.email} or username: {user.username}")
        try:
            existing_user = supabase.table("users").select("*").or_(
                f"email.eq.{user.email},username.eq.{user.username}"
            ).execute()

            if existing_user.data:
                logger.warning(f"❌ User with email '{user.email}' or username '{user.username}' already exists.")
                raise UserAlreadyExistsException("Email or Username already exists.")
        except Exception as e:
            logger.error(f"💥 Error checking existing user: {str(e)}")
            raise Exception("Error validating user existence.")

        # Hash password and insert user
        hashed_password = GetUserRepository.hash_password(user.password)

        user_data = {
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            "password": hashed_password,
            "mobile_number": str(user.mobile_number),
            "username": user.username
        }

        try:
            logger.info(f"✅ Inserting user: {user.username} into database.")
            response = supabase.table("users").insert(user_data).execute()
            logger.info(f"🎉 User '{user.username}' successfully inserted.")
            return response.data
        except Exception as e:
            logger.error(f"🚫 Error inserting user {user.username}: {str(e)}")
            raise Exception("Error inserting user into the database.")
