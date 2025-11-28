import React, { useState, useEffect, useRef } from "react";
import { 
  SendHorizonal, 
  Bot, 
  User, 
  BrainCircuit, 
  Loader2, 
  ArrowLeft, 
  Download, 
  Sparkles 
} from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  Input, 
  Button, 
  Avatar, 
  AvatarFallback 
} from "./ui/integrated-ui";
import { cn } from "./../lib/utils";
import { Message } from "../types";
import { sendMessageStream, startChat } from "../services/gemini";
import { INITIAL_MESSAGE } from "../constants";

interface ChatProps {
  onBack: () => void;
}

const SUGGESTIONS = [
  "Class 10 - Science Stream",
  "Class 12 - Commerce",
  "Engineering Options",
  "Medical Entrance Exams",
  "Arts & Humanities Careers"
];

const Chat: React.FC<ChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "initial", role: "model", content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat session on mount
  useEffect(() => {
    startChat();
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
        });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setShowSuggestions(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const modelMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: modelMessageId, role: "model", content: "" },
      ]);

      let fullContent = "";
      const stream = sendMessageStream(userMessage.content);

      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === modelMessageId ? { ...msg, content: fullContent } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "model", content: "I apologize, but I encountered a connection error. Please try asking again." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleDownloadTranscript = () => {
    const transcript = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `C3-Career-Guidance-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Custom Markdown Components for consistent styling
  const MarkdownComponents: Components = {
    p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
    strong: ({ children }) => <span className="font-bold text-orange-300">{children}</span>,
    ul: ({ children }) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="pl-1">{children}</li>,
    h1: ({ children }) => <h1 className="text-lg font-bold text-orange-400 mb-2 mt-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-bold text-orange-400 mb-2 mt-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-bold text-orange-400 mb-1 mt-3">{children}</h3>,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex min-h-screen items-center justify-center bg-black p-4 relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-orange-600/5 blur-[100px]" />
         <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <Card className="w-full max-w-4xl h-[90vh] flex flex-col bg-zinc-900/90 backdrop-blur-md border-zinc-700/50 shadow-2xl shadow-orange-500/10 z-10 overflow-hidden">
        <CardHeader className="border-b border-zinc-700/50 py-4 shrink-0 bg-zinc-900/95 backdrop-blur-xl z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="relative">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  C3 <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-normal tracking-wide uppercase">AI Counselor</span>
                </CardTitle>
                <CardDescription className="text-zinc-400 text-xs mt-0.5 hidden sm:block">
                  Your personalized guide to a bright future in India
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTranscript}
              className="hidden sm:flex items-center gap-2 text-xs border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 bg-transparent"
            >
              <Download className="w-3.5 h-3.5" />
              Save Chat
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 relative flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth" ref={scrollAreaRef}>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex gap-3 text-sm group", {
                    "justify-end": message.role === "user",
                  })}
                >
                  {message.role === "model" && (
                    <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-orange-500/30 bg-zinc-800 shrink-0 mt-1 shadow-sm">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn("rounded-2xl p-3 px-4 max-w-[85%] md:max-w-[75%] shadow-md text-sm md:text-base", {
                      "bg-white text-zinc-900 rounded-br-none": message.role === "user",
                      "bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 rounded-bl-none": message.role === "model",
                    })}
                  >
                    {message.role === "model" ? (
                      <article className="prose prose-sm prose-invert max-w-none">
                         <ReactMarkdown components={MarkdownComponents}>{message.content}</ReactMarkdown>
                         {message.content === "" && (
                             <div className="flex gap-1 h-5 items-center px-1">
                                 <motion.div 
                                   className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                   animate={{ y: [0, -5, 0] }}
                                   transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                 />
                                 <motion.div 
                                   className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                   animate={{ y: [0, -5, 0] }}
                                   transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                 />
                                 <motion.div 
                                   className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                                   animate={{ y: [0, -5, 0] }}
                                   transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                 />
                             </div>
                         )}
                      </article>
                    ) : (
                        <div className="whitespace-pre-wrap font-medium">{message.content}</div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <Avatar className="w-8 h-8 md:w-9 md:h-9 shrink-0 mt-1 border border-zinc-700 shadow-sm">
                      <AvatarFallback className="bg-zinc-800 text-zinc-300">
                        <User className="w-4 h-4 md:w-5 md:h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {showSuggestions && messages.length < 3 && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 pl-12"
              >
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-500/50 text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-orange-500" />
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Spacer for scrolling */}
            <div className="h-4" /> 
          </div>
        </CardContent>

        <CardFooter className="p-4 border-t border-zinc-700/50 bg-zinc-900/50 backdrop-blur-md z-20">
          <form className="flex w-full items-center gap-3 relative" onSubmit={handleSubmit}>
            <div className="relative flex-1 group">
              <Input
                ref={inputRef}
                placeholder="Ask about career paths, courses, or exams..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-zinc-800/50 border-zinc-600/50 text-white placeholder:text-zinc-500 h-12 rounded-full px-6 pr-12 focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 transition-all shadow-inner group-hover:bg-zinc-800"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className={cn(
                  "w-12 h-12 shrink-0 rounded-full transition-all duration-300 shadow-lg",
                  isLoading || !input.trim() 
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white hover:scale-105 hover:shadow-orange-500/25"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <SendHorizonal className="w-5 h-5 ml-0.5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Chat;