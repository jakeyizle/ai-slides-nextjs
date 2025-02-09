"use client"
import { useState } from "react";
import { generateSlides } from "../actions/generateSlides";
import { AIPromptForm } from "../components/ai-prompt-form";
import { SlidesContainer } from "../components/SlidesContainer";

export default function Page() {
    const [slideContent, setSlideContent] = useState('');
    const [isRequesting, setIsRequesting] = useState(false);

    const handlePromptSubmit = async (prompt: string) => {
        setSlideContent('')
        setIsRequesting(true)
        try {
            const result = await generateSlides(prompt);
            setSlideContent(result.content)
            console.log(result.content);
        }
        finally {
            setIsRequesting(false)
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Create Your AI-Powered Slideshow</h2>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <AIPromptForm onSubmit={(p) => handlePromptSubmit(p)} />
                </div>
                <div className="w-full md:w-2/3">
                    {isRequesting && <p className="text-center">Generating slides...</p>}
                    {slideContent && <div className="overflow-y-auto h-[calc(100vh-16rem)] border border-gray-300 rounded-md p-4"><SlidesContainer slideContent={slideContent} /></div>}
                </div>
            </div>
        </div>
    )
}