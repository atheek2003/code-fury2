import re
import requests
from fastapi import FastAPI ,HTTPException
from pathlib import Path
from pydantic import BaseModel
from doctr.io import DocumentFile as df
# import matplotlib.pyplot as plt
from doctr.models import ocr_predictor
from fastapi.middleware.cors import CORSMiddleware
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=['*']
)

class UrlInfo(BaseModel):
    url: str

@app.get("/")
async def root():
    return {"Welcome_message": "Verify NGO details"}

@app.post('/extract_info')
async def extract_info(url_info: UrlInfo):
    try:
        response = requests.get(url_info.url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to retrieve image from {url_info.url}: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to retrieve image from provided URL")
    try:
        response = requests.get(url_info.url)
        img_bytes = response.content
        img_path = Path("image.jpg")
        with open(img_path, "wb") as f:
            f.write(img_bytes)
        img = df.from_images(img_path)
        model = ocr_predictor(det_arch='db_resnet50', reco_arch='crnn_vgg16_bn', pretrained=True, export_as_straight_boxes=True)
        result = model(img)

        unique_id_pattern = re.compile(r'\b[a-zA-Z]{2}/\d{4}/\d{7,}\b')
        niti_aayog_present = False
        registration_number = None
        unique_id_score = 0
        unique_id = None

        for page in result.pages:
            for block in page.blocks:
                for line in block.lines:
                    words = [word.value for word in line.words]
                    if 'NITI' in words and 'Aayog' in words:
                        niti_aayog_present = True
                    if 'REGISTRATION' in words and 'NO:' in words:
                        registration_number = words[-1]
                    if 'UNIQUE' or 'Unique' in words  and 'ID' or 'Id' in words :
                        for word in line.words:
                            if unique_id_pattern.match(word.value) and word.confidence > unique_id_score:
                                unique_id = word.value
                                # print(unique_id)
                                unique_id_score = word.confidence
        if img_path.exists():
            img_path.unlink()

        return {'unique_id': unique_id, 'niti_aayog_present': niti_aayog_present, 'registration_number': registration_number}
    except Exception as e:
        logger.error(f"Failed to process image: {str(e)}")
        raise HTTPException(status_code=500,detail= "Failed to process the image")

