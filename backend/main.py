from fastapi import FastAPI
from routes.GetResumeRoute import router as ResumeParserRouter
from routes.GetUserRoute import router as GetUserRoute
from routes.UserLoginRoute import router as UserLogin

app = FastAPI()

app.include_router(ResumeParserRouter)
app.include_router(GetUserRoute)
app.include_router(UserLogin)
