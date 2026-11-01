import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  MessageCircle,
  Sparkles,
  HelpCircle,
  Building2,
  Megaphone,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ENV } from '../../config/env';

export default function SmartAIChatbot({ activePage = 'home' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Namaste! Welcome to Pixelix. I can help you calculate house construction costs, explore 3D virtual property walkthroughs, or plan high-ROI digital ad campaigns. How can I assist you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'How do I calculate building construction costs & bricks?',
    'What is included in a 3D Virtual Property Tour?',
    'How do Meta Lead Ads work for real estate?',
    'Connect directly with Pixelix Team on WhatsApp'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg = { id: `usr-${Date.now()}`, sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch(`${ENV.API_BASE_URL}/api/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          currentService: activePage
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            whatsappHandoff: data.whatsappHandoff,
            whatsappNumber: data.whatsappNumber
          }
        ]);
      } else {
        throw new Error('Fallback triggered');
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Thank you for your question! We specialize in house construction cost calculation, 3D architectural virtual tours, and performance digital lead generation. Would you like to connect directly on WhatsApp with our team?',
          whatsappHandoff: true,
          whatsappNumber: '919876543210'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleWhatsAppHandoff = (number = '919876543210') => {
    const msg = 'Hello Pixelix! I was chatting with your AI Advisor on the website and would like to speak directly with your strategic team.';
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-bold text-xs shadow-xl transition-all cursor-pointer ${
            isOpen
              ? 'bg-espresso-900 hover:bg-espresso-800'
              : 'bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-500 hover:to-terracotta-600 hover:scale-105 active:scale-95'
          }`}
          aria-label="Toggle Pixelix AI Assistant"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Bot className="w-5 h-5 text-cream-200" />
              <span className="hidden sm:inline">Pixelix AI Advisor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 left-6 z-50 w-[92vw] sm:w-[380px] max-h-[580px] h-[75vh] bg-white dark:bg-darkbg-card border border-cream-300 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-4 bg-espresso-950 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-terracotta-500 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Pixelix AI Advisor</h4>
                <p className="text-[10px] text-cream-300/80 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active • Smart Concierge
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-terracotta-500 text-white rounded-br-none'
                      : 'bg-cream-100 dark:bg-darkbg-base text-espresso-900 dark:text-cream-100 rounded-bl-none border border-cream-200 dark:border-white/5'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>

                {m.whatsappHandoff && (
                  <button
                    type="button"
                    onClick={() => handleWhatsAppHandoff(m.whatsappNumber)}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Continue on WhatsApp</span>
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 p-3 rounded-2xl bg-cream-100 dark:bg-darkbg-base text-espresso-400 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="p-2.5 px-3 border-t border-cream-200 dark:border-white/10 bg-cream-50/70 dark:bg-darkbg-surface/50 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-darkbg-card border border-cream-300 dark:border-white/10 text-espresso-700 dark:text-cream-300 hover:border-terracotta-400 shrink-0 font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-cream-200 dark:border-white/10 bg-white dark:bg-darkbg-card flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question or inquire..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-cream-300 dark:border-white/15 bg-cream-50/60 dark:bg-darkbg-base text-xs text-espresso-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-8 h-8 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

