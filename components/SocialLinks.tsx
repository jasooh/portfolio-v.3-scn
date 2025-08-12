// SocialLinks.tsx
// renders all the socials on the home page.


import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { SocialIcon } from "@/components/SocialIcon";

export default function SocialLinks() {
    return (
        <nav aria-label="Social links" className="mt-2">
            <ul className="flex flex-row items-center justify-center opacity-80 transition-opacity hover:opacity-100">
                <li>
                    <SocialIcon
                        href="https://github.com/jasooh"
                        icon={FaGithub}
                        label="GitHub"
                    />
                </li>
                <li>
                    <SocialIcon
                        href="https://www.linkedin.com/in/justin-abuyuan"
                        icon={FaLinkedin}
                        label="LinkedIn"
                    />
                </li>
                <li>
                    <SocialIcon
                        href="/resume.pdf"
                        icon={IoDocumentTextSharp}
                        label="Resume"
                        external={false}
                    />
                </li>
            </ul>
        </nav>
    );
}
