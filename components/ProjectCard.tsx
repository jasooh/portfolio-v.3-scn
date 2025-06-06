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

interface ProjectCardProps {
    title: string;
    year: string | number;
    github?: boolean;
    githubLink?: string;
    badges?: string[];
    description: string;
}

export default function ProjectCard({title, year, github, githubLink, badges, description}: ProjectCardProps) {
    return (
        <>
            <Card className="w-full max-w-sm max-h-[500px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{year}</CardDescription>
                    <CardAction>
                        {github && (
                            <Button variant="ghost" size="icon">
                                <a href={githubLink || "https://www.google.com/"} target="_blank">
                                    <FaGithub className="size-8 opacity-75"/>
                                </a>
                            </Button>
                        )}
                    </CardAction>
                </CardHeader>
                <CardContent className="h-full">
                    <Image
                        className="h-auto w-full"
                        src="https://placehold.co/768x512.png"
                        alt={title}
                        width={768}
                        height={512}
                    />
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardDescription className="flex flex-col gap-3">
                        <div className="flex flex-row flex-wrap gap-2">
                            {badges?.map((badgeText, index) => (
                                <Badge key={index} variant="default">{badgeText}</Badge>
                            ))}
                        </div>
                        <p>{description}</p>
                    </CardDescription>
                </CardFooter>
            </Card>
        </>
    )
}