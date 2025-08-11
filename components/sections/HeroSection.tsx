// HeroSection.tsx
// the website hero.

import {FaGithub, FaLinkedin} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {IoDocumentTextSharp} from "react-icons/io5";
import {FaArrowDownLong} from "react-icons/fa6";
import React from "react";

export default function HeroSection() {
    return (
        <section className="flex relative items-center justify-center h-screen">
            <div className="flex flex-col gap-10">
                <header className="text-center">
                    <p>hey, i&#39;m</p>
                    <h1 className="relative font-bold text-6xl leading-20 tracking-wide">
                        <span className="absolute inset-0 blur-xs">justin abuyuan.</span>
                        <span className="relative z-10">justin abuyuan.</span>
                    </h1>
                    <h2 className="text-xl leading-10">software engineering @ uwaterloo</h2>
                    <p className="text-gray-400">i like to code stuff and build things that solve problems.</p>
                </header>

                {/* social buttons */}
                <section className="flex flex-row justify-center gap-4 opacity-75">
                    <FaGithub className="size-10"/>
                    <FaLinkedin className="size-10"/>
                    <Button variant="outline" size="lg">
                        <IoDocumentTextSharp/> resume.
                    </Button>
                </section>
            </div>
            <div className="absolute flex justify-center bottom-10 w-full">
                <FaArrowDownLong
                    className="opacity-50 animate-bounce size-5"/>
            </div>
        </section>
    )
}