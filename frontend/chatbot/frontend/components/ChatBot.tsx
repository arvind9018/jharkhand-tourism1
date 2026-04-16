import { useState, useRef, useEffect } from "react";
import { sendChat } from "../services/chatApi";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Add welcome message when component mounts
  useEffect(() => {
    setChat([
      {
        text: "Namaste! Welcome to Jharkhand Tourism. How can I help you explore the beautiful state of Jharkhand today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Trigger wave animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setWaveAnimation(true);
        setTimeout(() => setWaveAnimation(false), 1000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  // Auto-open effect when page loads (only once)
  

  const send = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");

    // Add user message to chat
    setChat((prev) => [
      ...prev,
      {
        text: userMessage,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);

    try {
      const response = await sendChat(userMessage);

      // Add bot response to chat
      setChat((prev) => [
        ...prev,
        {
          text: response,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      // Add error message
      setChat((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickReply = async (text: string) => {
    // Add user message
    setChat((prev) => [
      ...prev,
      {
        text: text,
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);

    try {
      const response = await sendChat(text);
      
      // Add bot response
      setChat((prev) => [
        ...prev,
        {
          text: response,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Quick reply suggestions based on context
  const quickReplies = [
    "🏞️ Tourist places",
    "🍛 Local food",
    "🎉 Festivals",
    "🏠 Best time to visit",
    "🚗 How to reach",
    "🏨 Accommodation"
  ];

  // Add keyframes animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.6;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      
      @keyframes customBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      
      @keyframes ping {
        75%, 100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.7;
        }
      }
      
      .animate-bounce {
        animation: customBounce 0.8s ease-in-out;
      }
      
      /* Scrollbar styling */
      .messages-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .messages-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      .messages-container::-webkit-scrollbar-thumb {
        background: #FF6B35;
        border-radius: 10px;
      }
      
      .messages-container::-webkit-scrollbar-thumb:hover {
        background: #E54E1A;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Styles object containing all CSS
  const styles = {
    // Floating Widget Container
    widgetContainer: {
      position: 'fixed' as const,
      bottom: '24px',
      right: '24px',
      zIndex: 50,
    },
    // Chat Window
    chatWindow: {
      position: 'absolute' as const,
      bottom: '80px',
      right: '0',
      width: '400px',
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
      pointerEvents: isOpen ? ('auto' as const) : ('none' as const),
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    },
    // Header
    header: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #E54E1A 100%)',
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    headerIcon: {
      width: '40px',
      height: '40px',
      background: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
    headerTitle: {
      margin: 0,
      color: 'white',
      fontSize: '16px',
      fontWeight: 600,
    },
    headerStatus: {
      margin: '2px 0 0',
      color: 'rgba(255,255,255,0.9)',
      fontSize: '12px',
    },
    closeButton: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    // Messages Container
    messagesContainer: {
      height: '450px',
      overflowY: 'auto' as const,
      padding: '20px',
      background: '#F5F5F5',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
    },
    messageWrapper: (sender: "user" | "bot") => ({
      display: 'flex',
      justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
      animation: 'fadeIn 0.3s ease',
    }),
    messageBubble: (sender: "user" | "bot") => ({
      maxWidth: '80%',
      padding: '10px 14px',
      borderRadius: '12px',
      ...(sender === 'user' 
        ? {
            background: 'linear-gradient(135deg, #FF6B35 0%, #E54E1A 100%)',
            color: 'white',
            borderBottomRightRadius: '4px',
          }
        : {
            background: 'white',
            color: '#4A5568',
            borderBottomLeftRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
          }
      ),
    }),
    messageText: {
      fontSize: '14px',
      lineHeight: 1.5,
      whiteSpace: 'pre-wrap' as const,
    },
    messageTime: (sender: "user" | "bot") => ({
      fontSize: '10px',
      marginTop: '6px',
      opacity: 0.7,
      textAlign: 'right' as const,
      ...(sender === 'user' && { color: 'rgba(255,255,255,0.8)' }),
    }),
    // Typing Indicator
    typingIndicator: {
      display: 'flex',
      gap: '6px',
      padding: '12px 16px',
      background: 'white',
      borderRadius: '12px',
      alignSelf: 'flex-start' as const,
      borderBottomLeftRadius: '4px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    typingDot: {
      width: '8px',
      height: '8px',
      background: '#E0E0E0',
      borderRadius: '50%',
      animation: 'typing 1.4s infinite ease-in-out',
    },
    // Quick Replies
    quickRepliesContainer: {
      marginTop: '8px',
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
    },
    quickReplyButton: {
      background: 'white',
      border: '1px solid #FF6B35',
      color: '#FF6B35',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontWeight: 500,
    },
    // Input Area
    inputContainer: {
      padding: '16px 20px',
      background: 'white',
      borderTop: '1px solid #E0E0E0',
    },
    inputWrapper: {
      display: 'flex',
      gap: '12px',
    },
    input: {
      flex: 1,
      padding: '10px 16px',
      border: '2px solid #E0E0E0',
      borderRadius: '24px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.3s',
      fontFamily: 'inherit',
    },
    sendButton: {
      background: 'linear-gradient(135deg, #FF6B35 0%, #E54E1A 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    footerText: {
      fontSize: '10px',
      color: '#9CA3AF',
      textAlign: 'center' as const,
      marginTop: '10px',
      marginBottom: 0,
    },
    // Chat Button
    chatButtonContainer: {
      position: 'relative' as const,
    },
    tooltip: {
      position: 'absolute' as const,
      bottom: '70px',
      right: 0,
      background: '#1B4D3E',
      color: 'white',
      fontSize: '12px',
      padding: '6px 12px',
      borderRadius: '8px',
      whiteSpace: 'nowrap' as const,
      transition: 'all 0.3s',
      opacity: isHovered && !isOpen ? 1 : 0,
      transform: isHovered && !isOpen ? 'translateY(0)' : 'translateY(8px)',
      pointerEvents: 'none' as const,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
    tooltipArrow: {
      position: 'absolute' as const,
      bottom: '-4px',
      right: '12px',
      width: '8px',
      height: '8px',
      background: '#1B4D3E',
      transform: 'rotate(45deg)',
    },
    chatButton: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FF6B35 0%, #E54E1A 100%)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
      transition: 'all 0.3s',
      position: 'relative' as const,
    },
    rippleEffect: {
      position: 'absolute' as const,
      inset: 0,
      borderRadius: '50%',
      background: '#FF6B35',
      opacity: 0.2,
      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
    },
    notificationDot: {
      position: 'absolute' as const,
      top: '-4px',
      right: '-4px',
      width: '12px',
      height: '12px',
      background: '#FF6B35',
      borderRadius: '50%',
      border: '2px solid white',
      animation: 'pulse 1s infinite',
    },
  };

  return (
    <div style={styles.widgetContainer}>
      {/* Chat Window */}
      <div style={styles.chatWindow}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              🌿
            </div>
            <div>
              <h3 style={styles.headerTitle}>Jharkhand Tourism</h3>
              <p style={styles.headerStatus}>Online • Usually replies instantly</p>
            </div>
          </div>
          <button 
            onClick={handleToggleChat}
            style={styles.closeButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Messages Area */}
        <div className="messages-container" style={styles.messagesContainer}>
          {chat.map((msg, index) => (
            <div key={index} style={styles.messageWrapper(msg.sender)}>
              <div style={styles.messageBubble(msg.sender)}>
                <div style={styles.messageText}>{msg.text}</div>
                <div style={styles.messageTime(msg.sender)}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={styles.typingIndicator}>
              <span style={styles.typingDot}></span>
              <span style={{...styles.typingDot, animationDelay: "0.2s"}}></span>
              <span style={{...styles.typingDot, animationDelay: "0.4s"}}></span>
            </div>
          )}
          
          {/* Quick Replies - Show after welcome message */}
          {chat.length === 1 && !isLoading && (
            <div style={styles.quickRepliesContainer}>
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply.replace(/[^\w\s]/g, '').trim())}
                  style={styles.quickReplyButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#FF6B35";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#FF6B35";
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={isLoading}
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FF6B35";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E0E0E0";
              }}
            />
            <button 
              onClick={send}
              disabled={isLoading || !message.trim()}
              style={{
                ...styles.sendButton,
                opacity: isLoading || !message.trim() ? 0.6 : 1,
                cursor: isLoading || !message.trim() ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && message.trim()) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && message.trim()) {
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p style={styles.footerText}>
            Turn leads into revenue • No coding required
          </p>
        </div>
      </div>

      {/* Chat Button */}
      <div style={styles.chatButtonContainer}>
        {/* Tooltip */}
        <div style={styles.tooltip}>
          <div style={{ position: 'relative' }}>
            Hi there! 👋 Wanna explore Jharkhand?
            <div style={styles.tooltipArrow}></div>
          </div>
        </div>

        {/* Chat Button - Fixed duplicate onMouseEnter/Leave */}
        <button
          onClick={handleToggleChat}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          style={styles.chatButton}
        >
          {/* Ripple Effect */}
          <div style={styles.rippleEffect}></div>
          
          {/* Icon */}
          <div className={waveAnimation && !isOpen ? "animate-bounce" : ""}>
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
          {!isOpen && chat.length > 1 && (
            <div style={styles.notificationDot}></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;