// ProjectCard.tsx
// displays project info.

import React from "react";

// components
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";

// icons
import {FaGithub} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {Project} from "@/lib/types/queryTypes";

export default function ProjectCard({title, year, imageUrl, alt, githubUrl, badges, description}: Project) {
    return (
        <Card className="w-full max-w-sm max-h-[500px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{year}</CardDescription>
                <CardAction>
                    {githubUrl && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={githubUrl || "#"} target="_blank" rel="noreferrer">
                                <FaGithub className="size-5 opacity-75"/>
                            </a>
                        </Button>
                    )}
                </CardAction>
            </CardHeader>

            <CardContent className="h-full">
                <div className="relative w-full overflow-hidden rounded-md" style={{aspectRatio: "3 / 2"}}>
                    <Image
                        src={imageUrl || "https://placehold.co/768x512.png"}
                        alt={alt || title}
                        fill
                        sizes="(min-width:1024px) 384px, 100vw"
                        className="object-cover"
                    />
                </div>
            </CardContent>

            <CardFooter className="flex-col gap-2">
                <CardDescription className="flex flex-col gap-3">
                    <div className="flex flex-row flex-wrap gap-2">
                        {badges?.map((badgeText, i) => (
                            <Badge key={i} variant="default">{badgeText}</Badge>
                        ))}
                    </div>
                    <p>{description}</p>
                </CardDescription>
            </CardFooter>
        </Card>
    )
}