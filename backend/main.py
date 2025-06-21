from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.GetResumeRoute import router as ResumeParserRouter
from routes.GetUserRoute import router as GetUserRoute
from routes.UserLoginRoute import router as UserLogin

app = FastAPI()

# ✅ Add CORS middleware here
origins = [
    "https://preview--aibi-interview-flow.lovable.app",
    "http://localhost:3000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allow your frontend domain
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)

# ✅ Keep your original code below this
app.include_router(ResumeParserRouter)
app.include_router(GetUserRoute)
app.include_router(UserLogin)
