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
        <div className="flex h-[calc(100vh-8rem)]">
            <div className="w-[300px] min-w-[300px] border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
                <AIPromptForm onSubmit={(p) => handlePromptSubmit(p)} />
                {isRequesting && <p className="text-center mt-4">Generating slides...</p>}
            </div>
            <div className="flex-1 p-6">
                {slideContent ? (
                    <div className="h-full w-full overflow-hidden border border-gray-300 rounded-lg">
                        <SlidesContainer slideContent={slideContent} />
                    </div>
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                        Enter a prompt to generate slides
                    </div>
                )}
            </div>
        </div>
    )
}
