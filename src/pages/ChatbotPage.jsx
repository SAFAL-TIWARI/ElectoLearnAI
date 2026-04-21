import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, Sparkles, RotateCcw } from 'lucide-react';
import { getElectionResponse } from '../services/aiService';
import { useLanguage } from '../hooks/useLanguage';

const getWelcomeMessage = (language) => (
  language === 'en'
    ? "Hello! I'm ElectoLearn AI. Ask me election questions or how to use this website features like Timeline, Learn, Quiz, Simulator, and Dashboard."
    : "नमस्ते! मैं इलेक्टोलर्न AI हूँ। आप मुझसे चुनाव से जुड़े सवाल या इस वेबसाइट के फीचर्स जैसे Timeline, Learn, Quiz, Simulator और Dashboard के बारे में पूछ सकते हैं।"
);

const ChatbotPage = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState(() => ([
    {
      role: 'assistant',
      content: getWelcomeMessage(language),
    },
  ]));
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    language === 'en' ? "What is EVM?" : "EVM क्या है?",
    language === 'en' ? "How to get a Voter ID?" : "वोटर आईडी कैसे प्राप्त करें?",
    language === 'en' ? "What is Model Code of Conduct?" : "आचार संहिता क्या है?",
    language === 'en' ? "Why is VVPAT important?" : "VVPAT क्यों महत्वपूर्ण है?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Keep the initial assistant message in sync after language toggle.
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.role !== 'assistant') {
        return prev;
      }

      return [{ role: 'assistant', content: getWelcomeMessage(language) }];
    });
  }, [language]);

  const handleSend = async (text = input) => {
    const normalizedText = text.trim();
    if (!normalizedText || isLoading) return;

    const userMessage = { role: 'user', content: normalizedText };
    // Keep a reference to the history BEFORE adding the new message
    const currentHistory = [...messages];
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the text and the history EXCLUDING the latest message (as getElectionResponse adds it)
      const response = await getElectionResponse(normalizedText, currentHistory);
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMessage = { 
        role: 'assistant', 
        content: language === 'en' 
          ? "I'm having a little trouble connecting right now. Could you try asking again in a moment?" 
          : "मुझे अभी जुड़ने में थोड़ी समस्या हो रही है। क्या आप एक पल में फिर से पूछ सकते हैं?" 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: getWelcomeMessage(language)
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col h-[calc(100vh-160px)]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-election-blue/10 p-3 rounded-2xl text-election-blue">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ElectoLearn AI</h1>
            <p className="text-slate-500 text-sm flex items-center space-x-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Online & ready to help</span>
            </p>
          </div>
        </div>
        <button 
          onClick={resetChat}
          className="p-2 text-slate-400 hover:text-election-blue transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Reset Conversation"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow glass-card p-6 overflow-y-auto space-y-6 mb-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-2 rounded-xl shrink-0 mt-1 ${
                msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-800 text-slate-700' : 'bg-election-blue text-white'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-election-blue text-white rounded-tr-none shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700/50 shadow-sm'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex space-x-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((q, idx) => (
            <button 
              key={idx}
              onClick={() => handleSend(q)}
              className="text-sm px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-election-blue hover:text-election-blue transition-all bg-white/50 dark:bg-slate-900/50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="relative"
      >
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'en' ? "Ask about elections or website features..." : "चुनाव या वेबसाइट फीचर्स के बारे में पूछें..."}
          className="w-full pl-6 pr-16 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-election-blue/50 shadow-lg text-slate-800 dark:text-slate-200"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-election-blue text-white rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
