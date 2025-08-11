// FooterSection.tsx
// renders the footer section of the home page.

import {FaGithub, FaLinkedin} from "react-icons/fa";
import {IoDocumentTextSharp} from "react-icons/io5";
import Image from "next/image";
import React from "react";

export default function FooterSection() {
    return (
        <section className="flex flex-row justify-between px-12 w-[1200px] py-10 h-60">
            <div className="flex flex-col justify-between w-1/4 h-full">
                <div>
                    <h3 className="relative font-bold text-2xl leading-12 tracking-wide">
                        <span className="absolute inset-0 blur-xl ">justin abuyuan</span>
                        <span className="relative z-10 text-gray-200">justin abuyuan</span>
                    </h3>
                    <p className="italic text-gray-400">software engineer and hardstuck plat on valorant</p>
                </div>
                <div className="flex flex-row gap-2">
                    <FaGithub className="size-7"/>
                    <FaLinkedin className="size-7"/>
                    <IoDocumentTextSharp className="size-7"/>
                    <Image
                        src="/logo_w.svg"
                        alt="SE Webring Logo"
                        width={28}
                        height={28}
                        className="size-7"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-end">
                <p className="italic text-gray-500 text-sm text-right">
                    Built with ❤ using Next.js and TypeScript, and deployed using Vercel.
                    <br/>
                    © 2024 Justin Abuyuan. All rights reserved.
                </p>
            </div>
        </section>
    )
}