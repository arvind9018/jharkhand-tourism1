import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function ChatBotLauncher() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there, I'm Jharkhand Explorer! 👋\n\nWanna see what I can do?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  // Trigger wave animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveAnimation(true);
      setTimeout(() => setWaveAnimation(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-open effect when page loads (only once)
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  ///

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    }]);
    
    setMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thanks for your interest! I can help you explore Jharkhand's beautiful destinations, local cuisine, festivals, and more. What would you like to know? 🏞️",
        isBot: true,
        timestamp: new Date()
      }]);
    }, 500);
  };



  

  const handleQuickReply = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: text,
      isBot: false,
      timestamp: new Date()
    }]);
    
    // Simulate bot response based on quick reply
    setTimeout(() => {
      let response = "";
      switch(text) {
        case "Best places to visit":
          response = "Jharkhand has amazing places! 🌄\n\n• **Ranchi** - Hundru Falls, Rock Garden\n• **Netarhat** - Queen of Chotanagpur\n• **Deoghar** - Baidyanath Temple\n• **Jamshedpur** - Dalma Wildlife Sanctuary\n\nWant to know more about any specific place?";
          break;
        case "Local food":
          response = "Jharkhand's cuisine is delicious! 🍽️\n\n• **Dhuska** - Deep-fried rice flour bread\n• **Litti Chokha** - Roasted wheat balls with mashed veggies\n• **Rugra** - Local mushroom delicacy\n• **Thekua** - Sweet snack made from wheat flour\n\nWould you like recipe suggestions?";
          break;
        case "Festivals":
          response = "Jharkhand celebrates vibrant festivals! 🎉\n\n• **Sarhul** - Worship of nature (March-April)\n• **Karma** - Harvest festival (August-September)\n• **Tusu** - Harvest celebration (January)\n• **Sohrai** - Cattle worship festival\n\nInterested in festival dates?";
          break;
        default:
          response = "Great choice! I can provide more details about this. Would you like to connect with our tourism expert for personalized recommendations? 🎯";
      }
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Widget - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        <div 
          className={`absolute bottom-20 right-0 w-[380px] bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#E54E1A] px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Chatbot Generator</h3>
                <p className="text-white text-xs opacity-90">Online • Usually replies instantly</p>
              </div>
            </div>
            <button 
              onClick={handleToggleChat}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="h-[450px] overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    msg.isBot
                      ? 'bg-white text-gray-800 border border-gray-200'
                      : 'bg-gradient-to-r from-[#FF6B35] to-[#E54E1A] text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.isBot ? 'text-gray-400' : 'text-white/70'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Quick Reply Buttons - Only show after bot's first message and no pending messages */}
            {messages.length === 1 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {["Best places to visit", "Local food", "Festivals"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleQuickReply(topic)}
                    className="text-xs bg-white border border-[#FF6B35] text-[#FF6B35] px-3 py-1.5 rounded-full hover:bg-[#FF6B35] hover:text-white transition-all duration-200"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-[#FF6B35] to-[#E54E1A] text-white rounded-full w-9 h-9 flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Turn leads into revenue • No coding required
            </p>
          </div>
        </div>

        {/* Chat Button */}
        <div className="group relative">
          {/* Animated Tooltip */}
          <div className={`absolute bottom-16 right-0 bg-[#1B4D3E] text-white text-xs px-3 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap ${
            isHovered && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
            <div className="relative">
              Hi there! 👋 Wanna see what I can do?
              <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#1B4D3E] transform rotate-45"></div>
            </div>
          </div>

          {/* Chat Icon Button */}
          <button
            onClick={handleToggleChat}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #E54E1A 100%)',
            }}
          >
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" 
                 style={{ background: '#FF6B35' }}></div>
            
            {/* Icon */}
            <div className={`relative transition-all duration-500 ${
              waveAnimation && !isOpen ? 'animate-bounce' : ''
            }`}>
              {!isOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
                  <circle cx="7" cy="10" r="1.5" fill="#FF6B35"/>
                  <circle cx="12" cy="10" r="1.5" fill="#FF6B35"/>
                  <circle cx="17" cy="10" r="1.5" fill="#FF6B35"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/>
                </svg>
              )}
            </div>

            {/* Notification Dot */}
            {!isOpen && messages.length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
            )}
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes customBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-bounce {
          animation: customBounce 0.8s ease-in-out;
        }
      `}</style>
    </>
  );
}