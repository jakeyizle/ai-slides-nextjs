"use client"

interface PresentationHeaderProps {
    activeTab: 'preview' | 'code' | 'notes'
    onTabChange: (tab: 'preview' | 'code' | 'notes') => void
}

export function PresentationHeader({ activeTab, onTabChange }: PresentationHeaderProps) {
    return (
        <div className="flex border-b border-gray-300">
            <button
                className={`px-4 py-2 text-sm ${
                    activeTab === 'preview'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => onTabChange('preview')}
            >
                Preview
            </button>
            <button
                className={`px-4 py-2 text-sm ${
                    activeTab === 'code'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => onTabChange('code')}
            >
                Markdown
            </button>
            {/* <button
                className={`px-4 py-2 text-sm ${
                    activeTab === 'notes'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => onTabChange('notes')}
            >
                Presenter Notes
            </button> */}
        </div>
    )
}
