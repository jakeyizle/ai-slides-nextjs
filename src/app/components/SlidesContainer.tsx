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

        deckRef.current.initialize({ plugins: [Markdown] }).then(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "f") {
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        deckDivRef.current?.requestFullscreen();
                    }
                }
            };
            deckDivRef.current?.addEventListener("keydown", handleKeyDown);
        });

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
        <div className="h-[calc(100%-40px)] w-full">
            <div className="reveal h-full" ref={deckDivRef}>
                <div className="slides">
                    <section data-markdown="">
                        <textarea data-template value={slideContent} readOnly>
                        </textarea>
                    </section>
                </div>
            </div>
        </div>
    )
}
