import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Video, Phone } from 'lucide-react';
import MessageInput from '../components/MessageInput';

const fetchConversations = async () => {
  const response = await fetch('/api/conversations');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchMessages = async (conversationId) => {
  const response = await fetch(`/api/messages/${conversationId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const sendMessage = async ({ conversationId, content }) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ conversationId, content }),
  });
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const queryClient = useQueryClient();

  const { data: conversations, isLoading: conversationsLoading, error: conversationsError } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
  });

  const { data: messages, isLoading: messagesLoading, error: messagesError } = useQuery({
    queryKey: ['messages', selectedConversation],
    queryFn: () => fetchMessages(selectedConversation),
    enabled: !!selectedConversation,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', selectedConversation] });
    },
  });

  const handleSendMessage = (newMessage) => {
    if (selectedConversation) {
      sendMessageMutation.mutate({ conversationId: selectedConversation, content: newMessage });
    }
  };

  if (conversationsLoading) return <div>Loading conversations...</div>;
  if (conversationsError) return <div>Error loading conversations: {conversationsError.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="flex h-[600px] border rounded-lg overflow-hidden">
        <div className="w-1/3 border-r">
          <ScrollArea className="h-full">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{conversation.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
            <h2 className="font-semibold">{selectedConversation ? conversations.find(c => c.id === selectedConversation)?.name : 'Select a conversation'}</h2>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" title="Start video call">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" title="Start audio call">
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-grow p-4">
            {messagesLoading ? (
              <div>Loading messages...</div>
            ) : messagesError ? (
              <div>Error loading messages: {messagesError.message}</div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <p>{message.content}</p>
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
