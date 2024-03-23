from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import os
from random import randint
import uuid
from fastapi.middleware.cors import CORSMiddleware
 
IMAGEDIR = "images/"
 
app = FastAPI()
 

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend's origin
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

 
@app.post("/api/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
 
    #save the file
    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)
 
    return {"filename": file.filename}
 
 
@app.get("/api/show/")
async def read_random_file():
 
    # get random file from the image directory
    files = os.listdir(IMAGEDIR)
    random_index = randint(0, len(files) - 1)
 
    path = f"{IMAGEDIR}{files[random_index]}"
     
    return FileResponse(path)