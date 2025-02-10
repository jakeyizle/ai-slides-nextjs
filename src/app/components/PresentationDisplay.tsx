"use client"

import { PresentationHeader } from "./PresentationHeader"
import { SlidesContainer } from "./SlidesContainer"
import { CodeEditor } from "./CodeEditor"

interface PresentationDisplayProps {
    slideContent: string
    activeTab: 'preview' | 'code' | 'notes'
    onTabChange: (tab: 'preview' | 'code' | 'notes') => void
    onSlideContentChange: (content: string) => void
    notesContent: string
}

export function PresentationDisplay({
    slideContent,
    activeTab,
    onTabChange,
    onSlideContentChange,
    notesContent
}: PresentationDisplayProps) {

    return (
        <div className="h-full w-full overflow-hidden border border-gray-300 rounded-lg">
            <PresentationHeader activeTab={activeTab} onTabChange={onTabChange} />
            {activeTab === 'preview' ? (
                !slideContent ? (<div className="h-full w-full flex items-center justify-center text-gray-400">
                    Enter a prompt to generate slides
                </div>) :
                    <SlidesContainer slideContent={slideContent} />
            ) : activeTab === 'code' ? (
                <CodeEditor value={slideContent} onChange={onSlideContentChange} />
            ) : (
                <div className="p-4 overflow-y-auto h-[calc(100%-40px)] prose prose-sm max-w-none">
                    {notesContent ? (
                        <div>
                            <h2>Presenter Notes</h2>
                            {notesContent}
                        </div>
                    ) : (
                        <div className="text-gray-400 text-center mt-8">
                            No presenter notes available
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
