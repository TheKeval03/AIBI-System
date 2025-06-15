import logging

# Create a custom logger
logger = logging.getLogger("resume_parser")
logger.setLevel(logging.INFO)

# File handler
file_handler = logging.FileHandler("app.log")
file_handler.setLevel(logging.INFO)

# Formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

# Avoid duplicate handlers
if not logger.hasHandlers():
    logger.addHandler(file_handler)
