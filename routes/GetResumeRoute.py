from fastapi import APIRouter, UploadFile, File, HTTPException
from schemas.response.GetResumeResponse import ResumeResponse
from repositories.GetResumeRepository import GetResumeRepositoryV1
from logger import logger

router = APIRouter(tags=['Resume_Parser'])

@router.post("/resume_parsing", response_model=ResumeResponse)
async def get_resume(file: UploadFile = File(...)):

    logger.info(f"Received file: {file.filename}")

    if not file.filename.endswith('.pdf'):
        logger.warning(f"File rejected (not a PDF): {file.filename}")
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    resume_repo = GetResumeRepositoryV1()
    file_content = await file.read()

    try:
        
        extracted_text = resume_repo.process_resume(file_content)
        if not extracted_text:
            logger.warning(f"No text extracted from file: {file.filename}")
            raise HTTPException(status_code=400, detail="No text could be extracted from the PDF.")
        
        logger.info(f"File processed successfully: {file.filename}")
        return {"extracted_text": extracted_text}
    
    except Exception as e:
        logger.error(f"Error processing file {file.filename}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
