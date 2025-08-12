// FooterSection.tsx
// renders the footer section of the home page.

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";

export default function FooterSection() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                    {/* left: brand + tagline + social */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="relative font-bold text-2xl sm:text-3xl leading-[1.2] tracking-wide">
                                {/* decorative glow */}
                                <span aria-hidden="true" className="absolute inset-0 blur-xl">justin abuyuan</span>
                                <span className="relative z-10 text-gray-200">justin abuyuan</span>
                            </h3>
                            <p className="italic text-gray-400">
                                software engineer and hardstuck plat on valorant
                            </p>
                        </div>

                        {/* social links */}
                        <nav aria-label="Social links">
                            <ul className="flex flex-row items-center gap-3">
                                <li>
                                    <a
                                        href="https://github.com/jasooh"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                        title="GitHub"
                                        className="inline-flex items-center justify-center rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <FaGithub className="size-6 sm:size-7" />
                                        <span className="sr-only">GitHub</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/justin-abuyuan"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        title="LinkedIn"
                                        className="inline-flex items-center justify-center rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <FaLinkedin className="size-6 sm:size-7" />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Resume"
                                        title="Resume"
                                        className="inline-flex items-center justify-center rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <IoDocumentTextSharp className="size-6 sm:size-7" />
                                        <span className="sr-only">Resume</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://se-webring.xyz/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="SE Webring"
                                        title="SE Webring"
                                        className="inline-flex items-center justify-center rounded-lg p-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <Image
                                            src="/logo_w.svg"
                                            alt="SE Webring Logo"
                                            width={28}
                                            height={28}
                                            className="h-7 w-7"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* right: credits */}
                    <div className="flex flex-col sm:items-end">
                        <p className="italic text-gray-500 text-sm text-left sm:text-right">
                            Built with ❤ using Next.js and TypeScript, and deployed using Vercel.
                            <br />
                            © {year} Justin Abuyuan. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
