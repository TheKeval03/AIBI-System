from fastapi import FastAPI
from routes.GetResumeRoute import router as ResumeParserRouter

app = FastAPI()

app.include_router(ResumeParserRouter)
