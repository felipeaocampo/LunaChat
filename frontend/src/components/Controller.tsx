import React, { useId, useState } from "react";
import Title from "./Title.tsx";
import RecordMessage from "./RecordMessage.tsx";
import axios from "axios";

export default function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const sendToBackend = async (blob: Blob, messageArr: any) => {
    // Construct audio to send file
    const formData = new FormData();
    formData.append("file", blob, "myFile.wav");

    try {
      // Send form data to API endpoint
      const res = await axios.post(
        "http://localhost:8000/post-audio",
        formData,
        {
          headers: {
            "Content-Type": "audio/mpeg",
          },
          responseType: "arraybuffer",
        }
      );

      const blobRes = res.data;
      const audio = new Audio();
      audio.src = createBlobUrl(blobRes);

      // Append to audio
      const lunaMessage = { sender: "luna", blobUrl: audio.src };
      messageArr.push(lunaMessage);
      setMessages(messageArr);

      // Play Audio (TEST)
      setIsLoading(false);
      audio.play();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const createBlobUrl = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messageArr = [...messages, myMessage];

    try {
      // Convert blob url to blob object
      const res = await fetch(blobUrl);
      const blob = await res.blob();
      await sendToBackend(blob, messageArr);
    } catch (error: any) {
      console.error(error.message);
    }

    setIsLoading(false);
  };

  const renderedMessages = messages.map((audio, i) => (
    <div
      key={i}
      className={`flex flex-col ${
        audio.sender === "luna" ? "flex items-end" : ""
      }`}
    >
      <div className="mt-4">Hello</div>
    </div>
  ));
  console.log(renderedMessages);

  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={setMessages} />
      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* CONVERSATION */}
        <div className="mt-5 px-5">{renderedMessages}</div>

        {/* RECORDER */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}
