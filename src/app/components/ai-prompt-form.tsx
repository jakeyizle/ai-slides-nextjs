"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AIPromptFormProps {
    onSubmit: (prompt: string) => void
}

export function AIPromptForm({onSubmit}: AIPromptFormProps) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(prompt)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex-1">
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your slideshow topic..."
          className="resize-none h-24 text-sm"
        />
      </div>
      <Button type="submit" size="sm" className="w-full">
        Generate
      </Button>
    </form>
  )
}
