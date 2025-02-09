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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="prompt" className="text-lg font-semibold">
          Enter your slideshow prompt:
        </Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., The history of space exploration"
          className="mt-2 h-40"
        />
      </div>
      <Button type="submit" className="w-full">
        Generate Slideshow
      </Button>
    </form>
  )
}
