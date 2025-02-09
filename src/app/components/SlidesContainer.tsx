"use client"
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import { useEffect, useRef } from 'react';
import Reveal from "reveal.js";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

export const SlidesContainer = ({ slideContent }: { slideContent: string }) => {
    const deckDivRef = useRef<HTMLDivElement>(null);
    const deckRef = useRef<Reveal.Api | null>(null);

    useEffect(() => {
        if (!deckDivRef.current) return;        
        const resizeObserver = new ResizeObserver(() => {
            if (deckRef.current) {
                deckRef.current.layout();
            }
        });

        resizeObserver.observe(deckDivRef.current);

        deckRef.current = new Reveal(deckDivRef.current, {
            transition: "slide",
            embedded: true,
        });

        deckRef.current.initialize({ plugins: [Markdown] });

        return () => {
            resizeObserver.disconnect();
            try {
                if (deckRef.current) {
                    deckRef.current.destroy();
                    deckRef.current = null;
                }
            } catch (e) {
                console.warn("Reveal.js destroy call failed.");
            }
        };
    }, []);
    return (
            <div className="reveal" ref={deckDivRef}>
                <div className="slides">
                    <section data-markdown="">
                        <textarea data-template value={slideContent} readOnly>
                        </textarea>
                    </section>
                </div>
            </div>
    )
}
