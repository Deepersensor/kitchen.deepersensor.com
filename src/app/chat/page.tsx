"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AVAILABLE_MODELS, ModelId, getChatCompletion } from "@/lib/github-models";

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isLoading?: boolean;
};

type Theme = 'dark' | 'light' | 'synthwave' | 'cyberpunk';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelId>("gpt-4o-mini");
  const [theme, setTheme] = useState<Theme>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize with system message
  useEffect(() => {
    setMessages([{
      role: 'system',
      content: 'Welcome to the DeeperSensor Kitchen Chat! Ask me anything.',
      timestamp: Date.now(),
    }]);
    
    // Check for model in URL
    const modelParam = searchParams.get('model');
    if (modelParam && Object.keys(AVAILABLE_MODELS).includes(modelParam)) {
      setSelectedModel(modelParam as ModelId);
    }
    
    // Check for theme in URL
    const themeParam = searchParams.get('theme');
    if (themeParam && ['dark', 'light', 'synthwave', 'cyberpunk'].includes(themeParam)) {
      setTheme(themeParam as Theme);
    }
  }, [searchParams]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update URL with theme
    const params = new URLSearchParams(searchParams);
    params.set('theme', theme);
    params.set('model', selectedModel);
    router.replace(`/chat?${params.toString()}`, { scroll: false });
  }, [theme, selectedModel, router, searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    // Add loading message placeholder
    const assistantPlaceholder: ChatMessage = {
      role: 'assistant',
      content: '',
      timestamp: Date.now() + 1,
      isLoading: true,
    };

    setMessages(msgs => [...msgs, userMessage, assistantPlaceholder]);
    setInput("");
    setIsProcessing(true);

    try {
      // Format messages for API (excluding system greeting)
      const apiMessages = messages
        .filter(msg => msg.role !== 'system' || msg.content.startsWith('You are'))
        .concat([userMessage])
        .map(({ role, content }) => ({ role, content }));

      // Add system message if not present
      if (!apiMessages.some(msg => msg.role === 'system')) {
        apiMessages.unshift({
          role: 'system',
          content: 'You are a helpful assistant in the DeeperSensor Kitchen experimental playground.'
        });
      }

      const response = await getChatCompletion(apiMessages, selectedModel);

      // Replace loading message with actual response
      setMessages(msgs => 
        msgs.map(msg => 
          msg.isLoading ? {
            role: 'assistant',
            content: response || "Sorry, I couldn't generate a response.",
            timestamp: Date.now()
          } : msg
        )
      );
    } catch (error) {
      console.error(error);
      // Replace loading message with error
      setMessages(msgs => 
        msgs.map(msg => 
          msg.isLoading ? {
            role: 'assistant',
            content: "Sorry, there was an error processing your request. Please try again.",
            timestamp: Date.now()
          } : msg
        )
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function formatTimestamp(timestamp: number) {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      {/* Header */}
      <header className="kitchen-card p-4 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Kitchen Chat</h1>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full sm:hidden hover:bg-[var(--accent)]/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`kitchen-card fixed inset-0 z-20 transform transition-transform duration-300 sm:relative sm:inset-auto sm:transform-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          } w-[280px] p-4 overflow-auto`}
        >
          <div className="flex flex-col gap-6">
            <div className="sm:hidden flex justify-end">
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--accent)]/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Model Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Models</h2>
              <div className="flex flex-col gap-2">
                {Object.entries(AVAILABLE_MODELS).map(([id, model]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedModel(id as ModelId)}
                    className={`text-left p-3 rounded-lg transition-colors ${
                      selectedModel === id 
                        ? 'magic-btn text-white' 
                        : 'hover:bg-[var(--accent)]/10 kitchen-card'
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm opacity-70">{model.provider}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Theme Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Theme</h2>
              <div className="grid grid-cols-2 gap-2">
                {(['dark', 'light', 'synthwave', 'cyberpunk'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-3 rounded-lg capitalize ${
                      theme === t 
                        ? 'magic-btn text-white' 
                        : 'hover:bg-[var(--accent)]/10 kitchen-card'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Clear Chat Button */}
            <button
              onClick={() => setMessages([{
                role: 'system',
                content: 'Welcome to the DeeperSensor Kitchen Chat! Ask me anything.',
                timestamp: Date.now(),
              }])}
              className="kitchen-card p-3 mt-auto rounded-lg hover:bg-[var(--accent)]/10 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-64px)]">
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`${
                    message.role === 'user' 
                      ? 'ml-auto kitchen-card bg-[var(--accent)]/10' 
                      : message.role === 'system'
                        ? 'mx-auto text-center kitchen-card bg-[var(--secondary)]/10'
                        : 'mr-auto kitchen-card'
                  } max-w-[90%] rounded-xl p-4`}
                >
                  {message.isLoading ? (
                    <div className="flex space-x-2 justify-center items-center h-6">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  ) : (
                    <>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-50 mt-1 text-right">
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Form */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="kitchen-card w-full p-4 pr-12 bg-black/10 rounded-xl"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={isProcessing || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full magic-btn disabled:opacity-50 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
            <div className="text-xs text-center mt-2 max-w-3xl mx-auto opacity-70">
              <span className="font-medium">Using {AVAILABLE_MODELS[selectedModel].name}</span> • 
              <span className="ml-1">{AVAILABLE_MODELS[selectedModel].description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
