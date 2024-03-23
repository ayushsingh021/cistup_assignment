# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import FileResponse
# import os
# from random import randint
# import uuid
# from fastapi.middleware.cors import CORSMiddleware
 
# IMAGEDIR = "images/"
 
# app = FastAPI()
 

# # Set up CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Update this with your frontend's origin
#     allow_credentials=True,
#     allow_methods=["GET", "POST"],
#     allow_headers=["*"],
# )

 
# @app.post("/api/upload/")
# async def create_upload_file(file: UploadFile = File(...)):
    
#     file.filename = f"{uuid.uuid4()}.jpg"
#     contents = await file.read()
 
#     #save the file
#     with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
#         f.write(contents)
 
#     return {"filename": file.filename}
 
 
# @app.get("/api/show/")
# async def read_random_file():
 
#     # get random file from the image directory
#     files = os.listdir(IMAGEDIR)
#     random_index = randint(0, len(files) - 1)
 
#     path = f"{IMAGEDIR}{files[random_index]}"
     
#     return FileResponse(path)


from fastapi import FastAPI, File, UploadFile
from typing import List
import os
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

IMAGEDIR = "./images/"

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend's origin
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.post("/api/upload/")
async def upload_files(files: List[UploadFile] = File(...)):
    filenames = []
    for file in files:
        filename = f"{uuid.uuid4()}.jpg"
        contents = await file.read()
        with open(os.path.join(IMAGEDIR, filename), "wb") as f:
            f.write(contents)
        filenames.append(filename)
    return {"filenames": filenames}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
