"use client";

import { useChat } from "ai/react";
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
import { SendHorizonal, Bot, User, BrainCircuit } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";
// import Link from "next/link";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      // The API route we created earlier
      api: "/api/chat",
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card className="w-[95%] max-w-2xl h-[90vh] grid grid-rows-[auto,1fr,auto] bg-background border-border shadow-2xl shadow-orange-400/10">
        <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
                <BrainCircuit className="w-8 h-8 text-orange-400"/>
                <CardTitle className="text-2xl font-bold text-white">
                    Career Clarity Chatbot
                </CardTitle>
            </div>
          <CardDescription className="text-muted-foreground">
            Your AI-powered guide to a bright future in India.
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-hidden">
          <ScrollArea className="h-full w-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 text-sm ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-8 h-8 border-2 border-orange-400">
                      <AvatarFallback>
                        <Bot className="text-orange-400" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[85%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <article className="prose prose-sm prose-invert text-white">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </article>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Ask about careers, courses, or exams..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 bg-input text-white placeholder:text-muted-foreground"
            />
            <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
              <SendHorizonal className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}