// post-processing of streamed LLM response for better consistency

export function processStreamResponse(response: string): string {
    response = removeIndentation(response);
    response = removeInvalidStartingLines(response);
    return response;    
}

function removeIndentation(text: string): string {
    const lines = text.split('\n');
    const firstNonEmptyLine = lines.findIndex(line => line.trim() !== '');
    return lines.slice(firstNonEmptyLine).join('\n');
}

function removeInvalidStartingLines(text: string): string {
    const lines = text.split('\n');
    // find the first line that starts with #
    const firstLine = lines.findIndex(line => line.trim().startsWith('#'));
    // remove all lines before that line
    const cleanedLines = lines.toSpliced(0, firstLine);
    return cleanedLines.join('\n');
}