// Marquee.tsx
// displays technologies in a marquee

import Marquee from "react-fast-marquee";
import React from "react";
import type { IconType } from "react-icons";

// Icons
import { RiNextjsFill } from "react-icons/ri";
import { FaDocker, FaPython, FaAws, FaReact, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiTypescript, SiTensorflow, SiPytorch, SiOpencv, SiLua } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

const TECHNOLOGIES: { Icon: IconType; label: string }[] = [
    { Icon: RiNextjsFill, label: "Next.js" },
    { Icon: FaDocker, label: "Docker" },
    { Icon: SiTypescript, label: "TypeScript" },
    { Icon: FaPython, label: "Python" },
    { Icon: FaAws, label: "AWS" },
    { Icon: FaReact, label: "React" },
    { Icon: SiTensorflow, label: "TensorFlow" },
    { Icon: SiPytorch, label: "PyTorch" },
    { Icon: SiOpencv, label: "OpenCV" },
    { Icon: IoLogoJavascript, label: "JavaScript" },
    { Icon: FaJava, label: "Java" },
    { Icon: SiLua, label: "Lua" },
    { Icon: FaHtml5, label: "HTML5" },
    { Icon: FaCss3Alt, label: "CSS3" },
];

export default function TechMarquee() {
    const iconClass = "size-10";

    return (
        <>
            {/* autoFill clones its children and the marquee only renders client
                side, so the readable copy of the stack lives here. */}
            <ul className="sr-only">
                {TECHNOLOGIES.map(({ label }) => (
                    <li key={label}>{label}</li>
                ))}
            </ul>

            <div aria-hidden="true" className="min-w-0 flex-1">
                <Marquee
                    speed={50}
                    gradient
                    gradientWidth={100}
                    gradientColor="oklch(0.21 0.006 285.885)"
                    autoFill
                >
                    {TECHNOLOGIES.map(({ Icon, label }) => (
                        // hover tooltip; not every logo is recognisable
                        <span key={label} title={label} className="mx-5 inline-flex">
                            <Icon className={iconClass} />
                        </span>
                    ))}
                </Marquee>
            </div>
        </>
    );
}
