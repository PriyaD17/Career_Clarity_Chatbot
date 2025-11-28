"use client";

import { useChat } from "@ai-sdk/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SendHorizonal, Bot, User, BrainCircuit, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const botWelcomeMessage = {
    id: "initial-message",
    role: "assistant" as const,
    content: "Hello! I'm C3, your personal career clarity chatbot. To get started, please tell me what grade you've completed (e.g., 10th or 12th) and what your stream is (e.g., Science, Commerce, Arts). How can I help you today?",
  };
export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages: [botWelcomeMessage],
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col bg-zinc-900 border-zinc-700 shadow-2xl shadow-orange-500/10">
        <CardHeader className="border-b border-zinc-700">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-full">
              <BrainCircuit className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Career Clarity Chatbot (C3)
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Your AI-powered guide to a bright future in India.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="overflow-hidden p-0">
          <ScrollArea className="h-full w-full" ref={scrollAreaRef}>
            <div className="p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3 text-white text-sm", {
                    "justify-end": message.role === "user",
                  })}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-9 h-9 border-2 border-orange-500 shrink-0">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="w-5 h-5 text-orange-500" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn("rounded-xl p-3 px-4 max-w-[85%] shadow", {
                      "bg-orange-600 text-primary-foreground": message.role === "user",
                      "bg-zinc-800 text-zinc-200": message.role === "assistant",
                    })}
                  >
                    <article className="prose prose-sm prose-invert prose-p:text-white prose-headings:text-white prose-strong:text-white">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </article>
                  </div>

                  {message.role === "user" && (
                    <Avatar className="w-9 h-9 shrink-0">
                        
                      <AvatarFallback className="bg-zinc-700 text-zinc-300">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t border-zinc-700">
          <form className="flex w-full items-center gap-3" onSubmit={handleSubmit}>
            <Input
              placeholder="Ask me anything about career paths, courses, or exams"
              value={input}
              onChange={handleInputChange}
              className="flex-1 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 h-11 focus-visible:ring-1 focus-visible:ring-orange-500"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="w-11 h-11 shrink-0 bg-orange-600 hover:bg-orange-500 text-white transition-all duration-300 disabled:bg-zinc-700"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <SendHorizonal className="w-5 h-5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}