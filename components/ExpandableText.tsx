"use client";

import { useState } from "react";
import { useRef, useLayoutEffect } from "react";

interface ExpandableTextProps {
    text: string;
    color: string;
}

export default function ExpandableText({ text, color }: ExpandableTextProps) {
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState<string | number>("auto");
    const contentRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (contentRef.current) {
            if (expanded) {
                setHeight(contentRef.current.scrollHeight);
                // Wait for height to be set, then set to auto for smooth transition
                setTimeout(() => setHeight("auto"), 300);
            } else {
                setHeight(contentRef.current.scrollHeight);
                // Force reflow to enable transition
                void contentRef.current.offsetHeight;
                setHeight(72); // Approx height for 3 lines (adjust as needed)
            }
        }
    }, [expanded, text]);

    return (
        <div className="md:max-w-xl">
            <p
                ref={contentRef}
                style={{
                    maxHeight: expanded ? height : height,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                }}
                className={`font-manrope text-md text-background ${color} md:max-h-none`}
            >
                {text}
            </p>
            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-background font-medium md:hidden"
            >
                {expanded ? "Show Less" : "Read More"}
            </button>
        </div>
    );
}
