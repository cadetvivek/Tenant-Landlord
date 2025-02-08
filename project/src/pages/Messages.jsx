
import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { rtdb } from "../firebase"; // Import the real-time database
import ChatBot from "../components/ChateBot";
function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chats = [
    { id: "chat1", name: "Sarah Johnson", avatar: "SJ" },
    { id: "chat2", name: "Michael Brown", avatar: "MB" },
    { id: "chat3", name: "Emma Wilson", avatar: "EW" },
  ];

  // Fetch messages from Firebase when a chat is selected
  useEffect(() => {
    if (!selectedChat) return;

    const chatRef = ref(rtdb, `chats/${selectedChat.id}/messages`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]);
      }
    });
  }, [selectedChat]);

  // Send message to Firebase
  const sendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const chatRef = ref(rtdb, `chats/${selectedChat.id}/messages`);
    push(chatRef, {
      text: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r">
        <h1 className="text-xl font-bold p-4 border-b">Messages</h1>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="p-4 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                {chat.avatar}
              </div>
              <span>{chat.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div className="bg-gray-200 p-2 rounded-lg inline-block">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex">
            <input
              type="text"
              className="flex-1 border p-2 rounded-lg"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <p className="p-4">Select a chat</p>
      )}
       <ChatBot/>
    </div>
     
  );
}

export default Messages;







