"use client"
import { useState } from "react";
import { generateSlidesStream, generateExplanationStream } from "../actions/generateSlides";
import { ChatInterface } from "../components/ChatInterface";
import { PresentationDisplay } from "../components/PresentationDisplay";

export default function Page() {
    const [slideContent, setSlideContent] = useState('');
    const [explanation, setExplanation] = useState('');
    // TODO: presenter notes
    const [notesContent, setNotesContent] = useState('');
    const [isGeneratingSlides, setIsGeneratingSlides] = useState(false);
    const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'notes'>('code');

    const handlePromptSubmit = async (prompt: string) => {
        // slide content goes in code editor
        // explanation goes in chat
        // TODO: presenter notes goes in notes
        setSlideContent('');
        setExplanation('');
        setNotesContent('')
        setError(null);
        setIsGeneratingSlides(true);
        setActiveTab('code'); // Show code editor for streaming

        try {
            // Generate slides with streaming if available
            const slideStream = await generateSlidesStream(prompt);
            const reader = slideStream.chunks.getReader();
            let accumulatedSlides = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    accumulatedSlides += value.content;
                    setSlideContent(accumulatedSlides);
                }
            } finally {
                reader.releaseLock();
            }

            // After slides are complete, generate explanation
            setIsGeneratingExplanation(true);

            const explanationStream = await generateExplanationStream(accumulatedSlides);
            const explanationReader = explanationStream.chunks.getReader();
            let accumulatedExplanation = '';

            try {
                while (true) {
                    const { done, value } = await explanationReader.read();
                    if (done) break;
                    
                    accumulatedExplanation += value.content;
                    setExplanation(accumulatedExplanation);
                }
            } finally {
                explanationReader.releaseLock();
            }

        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            // Keep the current tab if there's an error
            if (!slideContent) {
                setActiveTab('code');
            }
        } finally {
            setIsGeneratingSlides(false);
            setIsGeneratingExplanation(false);
            if (!error && slideContent) {
                setActiveTab('preview'); // Only switch to preview on success
            }
        }
    }

    const isLoading = isGeneratingSlides || isGeneratingExplanation;

    return (
        <div className="flex h-[calc(100vh-8rem)]">
            <div className="w-[300px] min-w-[300px] border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
                <ChatInterface 
                    onSubmit={handlePromptSubmit}
                    isLoading={isLoading}
                    error={error}
                    streamingContent={isGeneratingExplanation ? explanation : undefined}
                    streamingType={isGeneratingExplanation ? 'explanation' : undefined}
                />
            </div>
            <div className="flex-1 p-6">
                <PresentationDisplay 
                    slideContent={slideContent}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onSlideContentChange={setSlideContent}
                    notesContent={notesContent}
                />
            </div>
        </div>
    )
}
