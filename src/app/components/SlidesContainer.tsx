"use client"
import { useEffect, useRef, useState } from 'react';
import Reveal from "reveal.js";
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

export const SlidesContainer = ({ slideContent }: { slideContent: string }) => {

    const deckDivRef = useRef<HTMLDivElement>(null);
    const deckRef = useRef<Reveal.Api | null>(null);

    useEffect(() => {
        if (deckRef.current) return;

        deckRef.current = new Reveal(deckDivRef.current!, {
            transition: "slide",
        });

        deckRef.current.initialize({ plugins: [Markdown] }).then(() => {
        });
        return () => {
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