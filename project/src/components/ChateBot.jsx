import { useState, useEffect } from "react";

const ChatBot = () => {
  const faqs = [
    // ... (keep your existing FAQ array)
    {
      question: "How do mobile rent payments work?",
      answer:
        "In the app, tenants can set up an automated monthly reminder for when rent is due or set up auto-payments to automatically pay rent on their preferred day.",
    },
    {
      question: "How much does Renteasy cost?",
      answer:
        "We offer monthly $29.95 monthly or 6-month $20 monthly  or annual $12 .",
    },
    {
      question: "How quickly do I receive mobile rent payments?",
      answer:
        "Mobile-submitted rent payments are typically processed within 2 business days.",
    },
    {
      question: "What support does Renteasy provide?",
      answer:
        "Renteasy supports a wide range of rental properties, including single-family homes, apartments, townhouses, duplexes, condos, and even commercial spaces.",
    },
    {
      question: "What types of properties does Renteasy support?",
      answer: "We provide hands-on product support and online demos.",
    },
    {
      question: "Can I manage multiple properties with Renteasy?",
      answer:
        " Yes, you can easily manage multiple properties and units within your Renteasy account.",
    },
    {
      question: "How can I contact Renteasy support?",
      answer:
        "You can contact our support team via email by phone or through the in web app footer section  We're here to help",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleQuestionClick = (question, answer) => {
    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: question }]);

    // Add bot response after delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content: answer }]);
      speakAnswer(answer);
    }, 500);
  };

  const speakAnswer = (text) => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const speech = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);

    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white rounded-xl shadow-xl overflow-hidden transform transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              {isSpeaking && (
                <div className="absolute -top-1 -right-1 flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-white font-semibold">Renteasy Assistant</h2>
              <p className="text-xs text-blue-100">Online 24/7</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white hover:text-blue-200"
            >
              ×
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-96 p-4 bg-gray-50 overflow-y-auto space-y-4">
            {/* Initial Bot Message */}
            <div className="animate-slideIn">
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-md max-w-[85%]">
                <p className="text-sm text-gray-600">
                  Hi! I'm here to help. Choose a question:
                </p>
              </div>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`animate-slideIn flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white rounded-tl-none shadow-md"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Questions */}
          <div className="p-4 bg-gray-100 border-t">
            <div className="grid grid-cols-1 gap-2">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(faq.question, faq.answer)}
                  className="text-left p-2 bg-white hover:bg-blue-50 rounded-lg transition-all text-sm text-gray-700 hover:text-blue-600 shadow-sm"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
