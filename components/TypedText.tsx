// TypedText.tsx
// renders a typing effect used in the main home page hero.
'use client'

import Typewriter from "typewriter-effect";

export default function TypedText({ words, className }: { words: string[], className?: string }) {
    return <div className={className}>
        <Typewriter
            options={{
                strings: words,
                autoStart: true,
                loop: true,
                delay: 15,
                deleteSpeed: 50,
            }}
        />
    </div>
}