import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon, ImageIcon, PaperclipIcon, UserIcon, MicIcon, StopCircleIcon } from 'lucide-react';

const MessageInput = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleVoiceNote = () => {
    setIsRecording(!isRecording);
    // Here you would typically start/stop recording
    console.log(isRecording ? "Stopping recording" : "Starting recording");
  };

  return (
    <div className="border-t p-4 flex items-center">
      <Button variant="ghost" size="icon" title="Add picture">
        <ImageIcon className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Add file">
        <PaperclipIcon className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Add contact">
        <UserIcon className="h-5 w-5" />
      </Button>
      <Input
        className="flex-grow mx-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <Button variant="ghost" size="icon" title="Record voice note" onClick={handleVoiceNote}>
        {isRecording ? <StopCircleIcon className="h-5 w-5 text-red-500" /> : <MicIcon className="h-5 w-5" />}
      </Button>
      <Button onClick={handleSendMessage}>
        <SendIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInput;