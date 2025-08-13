// ProjectCard.tsx
// displays project info.

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/types/queryTypes";
import { PortableText } from "@portabletext/react";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export default function ProjectCard({title, year, imageUrl, alt, githubUrl, badges, description, websiteUrl}: Project) {
    return (
        <Card className="w-full max-w-sm h-[520px] flex flex-col">
            <CardHeader className="shrink-0">
                <CardTitle className="font-semibold line-clamp-1">{title}</CardTitle>
                <CardDescription>{year}</CardDescription>
            </CardHeader>

            <CardContent className="shrink-0">
                <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: "3 / 2" }}>
                    <Image
                        src={imageUrl || "https://placehold.co/768x512.png"}
                        alt={alt || title}
                        fill
                        sizes="(min-width:1024px) 384px, 100vw"
                        className="object-cover"
                    />
                </div>
            </CardContent>

            {/* footer expands within the fixed card height */}
            <CardFooter className="flex flex-col gap-5 grow min-h-0">
                <CardDescription className="flex flex-col gap-3 overflow-hidden">
                    <div className="flex flex-row flex-wrap gap-2">
                        {badges?.map((badgeText, i) => (
                            <Badge key={i} variant="default">{badgeText}</Badge>
                        ))}
                    </div>

                    {/* clamp description so cards don't grow past fixed height */}
                    <div className="line-clamp-4 [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical] overflow-hidden">
                        <PortableText value={description} />
                    </div>
                </CardDescription>

                {/* icons */}
                <div className="mt-auto flex w-full items-center justify-start gap-1">
                    {githubUrl && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={githubUrl} target="_blank" rel="noreferrer">
                                <FaGithub className="size-5 opacity-75" />
                            </a>
                        </Button>
                    )}
                    {websiteUrl && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={websiteUrl} target="_blank" rel="noreferrer">
                                <TbWorld className="size-5 opacity-75" />
                            </a>
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
