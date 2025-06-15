from PyPDF2 import PdfReader  # type: ignore
import io
from logger import logger

class GetResumeRepositoryV1:

    def process_resume(self, pdf_file: bytes) -> str:

        try:

            logger.info("Started processing resume.")

            reader = PdfReader(io.BytesIO(pdf_file))
            pdf_content = ""
            for page in reader.pages:
                pdf_content += page.extract_text()
                
            logger.info("Resume processing completed successfully.")
            return pdf_content
        
        except Exception as e:

            logger.error(f"Error processing PDF: {e}")
            raise Exception(f"Error processing PDF: {e}")