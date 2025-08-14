// ptComponents.tsx
// defines components for rich text styling provided by sanity.

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextComponents } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);
const urlFor = (src: SanityImageSource) => builder.image(src);

export const ptComponents: PortableTextComponents = {
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 space-y-1">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 space-y-1">{children}</ol>,
    },
    listItem: ({ children }) => <li className="marker:text-muted-foreground">{children}</li>,
    block: {
        normal: ({ children }) => <p className="leading-5">{children}</p>,
        h1: ({ children }) => <h1 className="mt-6 text-3xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="mt-6 text-2xl font-semibold">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-5 text-xl font-semibold">{children}</h3>,
        h4: ({ children }) => <h4 className="mt-4 text-lg font-semibold">{children}</h4>,
        h5: ({ children }) => <h5 className="mt-3 text-base font-semibold">{children}</h5>,
        h6: ({ children }) => <h6 className="mt-3 text-sm font-semibold uppercase tracking-wide">{children}</h6>,
        blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-2 pl-4 italic text-muted-foreground">{children}</blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{children}</code>,
        link: ({ children, value }) => {
            const href = value?.href || "#";
            const external = /^https?:\/\//i.test(href);
            return external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary duration-100">
                    {children}
                </a>
            ) : (
                <Link href={href} className="underline hover:text-primary duration-100">
                    {children}
                </Link>
            );
        }
    },
    types: {
        image: ({ value }) => {
            const alt: string = value?.alt ?? "";
            const src = urlFor(value).width(1200).height(800).fit("crop").auto("format").url();
            return (
                <div className="relative my-4 w-full overflow-hidden rounded-md" style={{ aspectRatio: "3 / 2" }}>
                    <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
                </div>
            );
        },
    },
    hardBreak: () => <br />,
};
