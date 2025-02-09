"use client"
import { useEffect, useRef, useState } from 'react';
import Reveal from "reveal.js";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import { SlidesContainer } from './SlidesContainer';

export default function Presentation() {
   

    const [slideContent, setSlideContent] = useState('');

    useEffect(() => {
        async function fetchSlides() {
            try {
                const response = await fetch('/api/slides/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: 'A very short and simple presentation.',
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch slides');
                }
                const data = await response.json();
                setSlideContent(data.content);
            } catch (error) {
                console.error('Error fetching slides:', error);
                setSlideContent('## Error\nFailed to load presentation content.');
            }
        }

        fetchSlides();
    }, []);
    return (
        <>
            { !!slideContent ? <SlidesContainer slideContent={slideContent} /> : <div>Loading...</div> }
        </>
    );
}
