from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import numpy as np

import cv2
from deepface import DeepFace

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can restrict this for better security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class BiometricData(BaseModel):
    idUser: int
    biometric_ref: str

@app.post('/biometric')
def index(data: BiometricData):
    try:
        image_ref = cv2.imread(f"./bio_ref/user_{data.idUser}.png")
        if(image_ref):
            pass

        img_data = data.biometric_ref.split(",")[-1]
        img_binary = base64.b64decode(img_data)
        img_array = np.frombuffer(img_binary, dtype=np.uint8)
        image = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)
        img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)

        cv2.imshow('Decoded Image', img_rgb)  # Use img_rgb for RGB display
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        # cv2.imwrite(f"./bio_ref/user_{data.idUser}.png", img_rgb)
        return {"message": "success"}
    except ValueError:
        print("fuck of mate")

