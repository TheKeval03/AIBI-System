import hashlib
from typing import Optional, Dict
from schemas.request import UserRegistrationRequest

class GetUserRepository:
    def __init__(self):
        # In-memory storage for demo (replace with actual database)
        self.users = {}
        self.user_counter = 1
    
    def _hash_password(self, password: str) -> str:
        """Hash password using SHA256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    async def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Check if user exists by email"""
        for user in self.users.values():
            if user['email'] == email:
                return user
        return None
    
    async def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """Get user by ID"""
        return self.users.get(user_id)
    
    async def create_user(self, user_data: UserRegistrationRequest) -> int:
        """Create new user and return user ID"""
        user_id = self.user_counter
        
        user_record = {
            'id': user_id,
            'firstname': user_data.firstname,
            'lastname': user_data.lastname,
            'email': user_data.email,
            'password': self._hash_password(user_data.password),
            'mobile_number': user_data.mobile_number,
            'username': user_data.username
        }
        
        self.users[user_id] = user_record
        self.user_counter += 1
        
        return user_id
    
    async def get_all_users(self) -> Dict:
        """Get all users (excluding passwords)"""
        safe_users = {}
        for user_id, user in self.users.items():
            safe_user = user.copy()
            del safe_user['password']  # Remove password from response
            safe_users[user_id] = safe_user
        return safe_users