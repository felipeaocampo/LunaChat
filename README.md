
<div align="center">

# LunaChat


![Luna chat](https://github.com/felipeaocampo/LunaChat/assets/95617522/cf6d6acf-2a67-4567-9764-b0c9b4cfba6e)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)<br>
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)


<strong><em>A.I. chat app leveraging OpenAI and ElevenLabs to create a dialogue experience guided by user input</em></strong>

</div>


## What is LunaChat
LunaChat is an A.I. chatbot that allows the user to have a dialogue-like experience. Its current iteration has a prompt that primes the conversation to be about a job interview, but the application will soon be expanded so that the user can declare their own conversation prompt and then use it to dialogue with the A.I., who has been named "Luna". The application currently is set up so that a user can record their own voice message which is sent to the A.I., then the A.I.'s response is received and displayed on the UI. The messages can be replayed at any point. There is also the option to reset the conversation, making it so that the user can start the conversation with the A.I. anew. 

## Getting Started
In order to initiate LunaChat, first the project folder needs to be cloned. 

Upon opening the application on an IDE, first navigate into the backend directory and run the commands

```
source venv/bin/activate

uvicorn main:app --reload
```
Then, navigate into the frontend directory and run the command

```
npm run dev
```

## Tech Stack
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)

The frontend of this application is uses a TypeScript React infrastructure. Tailwind CSS was used to style the application in a quick and balanced manner. The application is responsive so that it can work on screens of any sized, even mobile.

The backend of this application relies on Python and FastAPI. Further, it connects with with the A.I. technologies OpenAI and ElevenLabs. This allows the backend to do all the heavy lifting so that the frontend only needs to focus on presenting the files received in the backend from the A.I. APIs.

## Features
Lunachat has the following features...

Record a message to begin the dialogue with Luna

https://github.com/felipeaocampo/LunaChat/assets/95617522/2cf1e5e0-f8a8-4b07-9ac2-e60e581d07c2

Press the reset button to restart the conversation

https://github.com/felipeaocampo/LunaChat/assets/95617522/023aad4b-1c56-4415-a143-76599e8fe261

## Contributing

If you are interested in contributing, feel free to submit an issue or a pull request! LunaChat is open source and so contributions from other developers are more than welcome!


