import React, { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical } from 'lucide-react';

function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      property: 'Sunset Apartments, Unit 304',
      lastMessage: 'Thank you for addressing the maintenance issue so quickly!',
      time: '10:30 AM',
      unread: 2,
    },
    {
      id: 2,
      name: 'Michael Brown',
      avatar: 'MB',
      property: 'Pine Grove Complex, Unit 12B',
      lastMessage: 'When will the AC technician arrive?',
      time: 'Yesterday',
      unread: 0,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      property: 'Oakwood Heights, Unit 506',
      lastMessage: 'I\'ve submitted the rent payment for this month.',
      time: '2 days ago',
      unread: 0,
    },
  ];

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex h-full bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white ${
                    chat.unread ? 'ring-2 ring-blue-300' : ''
                  }`}>
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <p className="text-xs text-gray-500">{chat.time}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{chat.property}</p>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{chat.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {selectedChat.name}
                  </h3>
                  <p className="text-xs text-gray-500">{selectedChat.property}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Sample messages - in a real app, these would be dynamic */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[70%]">
                    <p className="text-sm text-gray-800">Hello! How can I help you today?</p>
                    <p className="text-xs text-gray-500 mt-1">10:25 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[70%]">
                    <p className="text-sm text-white">Thank you for addressing the maintenance issue so quickly!</p>
                    <p className="text-xs text-blue-100 mt-1">10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
