// ptComponents.tsx
// defines components for rich text styling provided by sanity.

import React from "react";
import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import SanityImage from "@/components/SanityImage";
import { hasAsset } from "@/sanity/lib/image";

export const ptComponents: PortableTextComponents = {
    list: {
        bullet: ({ children }) => <ul className="list-[square] pl-5 space-y-1.5">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 marker:font-mono marker:text-[0.85em]">{children}</ol>,
    },
    listItem: ({ children }) => <li className="pl-1 marker:text-primary">{children}</li>,
    block: {
        normal: ({ children }) => <p className="leading-relaxed empty:hidden">{children}</p>,
        h1: ({ children }) => <h1 className="mt-8 font-display text-4xl leading-none">{children}</h1>,
        h2: ({ children }) => <h2 className="mt-8 font-display text-3xl leading-none">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-6 font-display text-2xl leading-none">{children}</h3>,
        h4: ({ children }) => <h4 className="mt-5 text-lg font-semibold">{children}</h4>,
        h5: ({ children }) => <h5 className="mt-3 text-base font-semibold">{children}</h5>,
        h6: ({ children }) => <h6 className="label mt-4 text-foreground">{children}</h6>,
        blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-2 border-primary pl-4 italic text-muted-foreground">{children}</blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>,
        link: ({ children, value }) => {
            const href = value?.href || "#";
            const external = /^https?:\/\//i.test(href);
            return external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary">
                    {children}
                </a>
            ) : (
                <Link href={href} className="underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary">
                    {children}
                </Link>
            );
        }
    },
    types: {
        image: ({ value }) => {
            if (!hasAsset(value)) return null;
            return (
                <div className="relative my-4 w-full overflow-hidden border border-border" style={{ aspectRatio: "3 / 2" }}>
                    <SanityImage image={value} aspect={3 / 2} alt={value.alt ?? ""} fill className="object-cover" sizes="100vw" />
                </div>
            );
        },
    },
    hardBreak: () => <br />,
};
