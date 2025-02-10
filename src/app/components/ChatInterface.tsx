"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
  streamingContent?: string;
  streamingType?: 'slides' | 'explanation';
}

export function ChatInterface({
  onSubmit,
  isLoading,
  error,
  streamingContent,
  streamingType
}: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    // Add user message to history
    const userMessage: Message = {
      role: 'user',
      content: prompt
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and submit
    setPrompt("")
    onSubmit(userMessage.content)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              message.role === 'user'
                ? 'bg-blue-100 ml-4'
                : 'bg-gray-100 mr-4'
            }`}
          >
            <div className="text-xs text-gray-500 mb-1">
              {message.role === 'user' ? 'You' : 'Assistant'}
            </div>
            <div className="text-sm whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        ))}
        {streamingContent && (
          <div className="bg-gray-100 mr-4 p-2 rounded">
            <div className="text-xs text-gray-500 mb-1">
              Assistant {streamingType === 'slides' ? '(Generating Slides)' : '(Creating Notes)'}
            </div>
            <div className="text-sm whitespace-pre-wrap font-mono">
              {streamingContent}
            </div>
          </div>
        )}
        {isLoading && !streamingContent && (
          <div className="bg-gray-100 mr-4 p-2 rounded animate-pulse">
            <div className="text-xs text-gray-500 mb-1">Assistant</div>
            <div className="text-sm">Thinking...</div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Separator className="mb-2" />
        <div className="flex-1">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={messages.length === 0 
              ? "Enter your presentation topic..." 
              : "Ask me to modify the slides or explain something..."}
            className="resize-none h-24 text-sm"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          size="sm"
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </form>
    </div>
  )
}
