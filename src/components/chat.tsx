"use client";
import React, { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { SendHorizonal, BrainCircuit} from "lucide-react";
import ReactMarkdown from "react-markdown";
// import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Chat = ({ onBack }: { onBack?: () => void }) => {
  // This hook automatically connects to /api/chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      { id: "1", role: "assistant", content: "Hello! I'm C3, your career clarity chatbot. Which grade have you completed (10th or 12th)?" }
    ]
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-4xl h-[85vh] flex flex-col bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-orange-500 w-6 h-6" />
            <CardTitle className="text-white">C3 Career Assistant</CardTitle>
          </div>
          {onBack && <Button variant="ghost" onClick={onBack} className="text-zinc-400">Back</Button>}
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role !== "user" && <Avatar className="h-8 w-8"><AvatarFallback className="bg-orange-600 text-white">AI</AvatarFallback></Avatar>}
              <div className={cn("rounded-lg p-3 max-w-[80%]", m.role === "user" ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-100")}>
                <ReactMarkdown className="prose prose-invert text-sm">{m.content}</ReactMarkdown>
              </div>
              {m.role === "user" && <Avatar className="h-8 w-8"><AvatarFallback className="bg-zinc-700 text-white">ME</AvatarFallback></Avatar>}
            </div>
          ))}
          {isLoading && <div className="text-zinc-500 text-xs animate-pulse">C3 is thinking...</div>}
        </CardContent>

        <CardFooter className="p-4 border-t border-zinc-800">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input 
              value={input} 
              onChange={handleInputChange} 
              placeholder="Ask me anything about your career..." 
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            <Button type="submit" disabled={isLoading || !input} className="bg-orange-600 hover:bg-orange-500">
              <SendHorizonal className="w-4 h-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;