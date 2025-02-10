"use client"

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
    return (
        <div className="h-[calc(100%-40px)] w-full p-4 bg-gray-50">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm bg-white shadow-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                spellCheck="false"
                placeholder="Start creating, or generate a presentation..."
            />
        </div>
    );
};
