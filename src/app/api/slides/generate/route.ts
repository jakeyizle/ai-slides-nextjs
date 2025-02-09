import { NextRequest, NextResponse } from 'next/server';
import { createLLMService } from '@/app/lib/llm/factory';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const llm = createLLMService();
    const result = await llm.generateSlides(prompt);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: result.content });
  } catch (error) {
    console.error('Error in slides generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
