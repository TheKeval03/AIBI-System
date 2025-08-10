from fastapi import APIRouter, HTTPException, Request

router = APIRouter(tags=['Get Job-Role'])

@router.post("/GetRole")
