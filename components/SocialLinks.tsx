// SocialLinks.tsx
// renders all the socials on the home page.

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { SocialIcon } from "@/components/SocialIcon";
import Image from "next/image";
import React from "react";

export default function SocialLinks() {
    return (
        <nav aria-label="Social links">
            <ul className="flex flex-row items-center gap-3">
                <li>
                    <SocialIcon href="https://github.com/jasooh" label="GitHub">
                        <FaGithub className="size-6 sm:size-7" />
                    </SocialIcon>
                </li>
                <li>
                    <SocialIcon href="https://www.linkedin.com/in/justin-abuyuan" label="LinkedIn">
                        <FaLinkedin className="size-6 sm:size-7" />
                    </SocialIcon>
                </li>
                <li>
                    {/* internal link; open in same tab */}
                    <SocialIcon href="/resume.pdf" label="Resume" external={false}>
                        <IoDocumentTextSharp className="size-6 sm:size-7" />
                    </SocialIcon>
                </li>
                <li>
                    <SocialIcon href="https://se-webring.xyz/" label="SE Webring">
                        {/* decorative image: alt can be empty since link has aria-label */}
                        <Image src="/logo_w.svg" alt="" width={28} height={28} className="h-7 w-7" />
                    </SocialIcon>
                </li>
            </ul>
        </nav>
    );
}
