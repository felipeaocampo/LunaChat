# starting Script
# source venv/bin/activate
# uvicorn main:app --reload

# main Imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai

# Custom Function Imports
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.database import store_messages, reset_messages
from functions.text_to_speech import convert_text_to_speech



app = FastAPI()

# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:3000",
]

# CORS - Middlaware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def check_health():
    return {"message": "Healthy"}

# Reset Messages
@app.get("/reset")
async def reset_conversation():
    reset_messages()
    return {"message": "conversation reset"}


# Get audio 
@app.post("/post-audio/")
async def post_audio(file: UploadFile = File(...)):
    
    # This code was for set up purposes. Not for the actual app
    #  Get saved audio
    # audio_input = open("voice.mp3", "rb")

    # Save file from frontend
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    audio_input = open(file.filename, "rb")

    # Decode Audio
    message_decoded = convert_audio_to_text(audio_input)

    #  Guard: Ensure message decoded
    if not message_decoded:
        return HTTPException(status_code=400, detail="Failed to decode audio")
    
    # Get ChatGPT Reponse
    chat_response = get_chat_response(message_decoded)
    print(chat_response)

    #  Guard: Ensure text chat response was received
    if not chat_response:
        return HTTPException(status_code=400, detail="Failed to chat response")

    # Convert chat response to audio
    audio_output = convert_text_to_speech(chat_response)

    #  Guard: Ensure audio response was received
    if not audio_output:
        return HTTPException(status_code=400, detail="Failed to get Eleven Labs audio response")

    # Store messages
    store_messages(message_decoded, chat_response)

    # Create a generator that yields chuncks of data
    def iterfile():
        yield audio_output

    # Return audio file
    return StreamingResponse(iterfile(), media_type="application/octet-stream")


# Post bot response
# Note: Not playing in browser when using post request
# @app.post("/post-audio/")
# async def post_audio(file: UploadFile = File(...)):
#     print("Hello")