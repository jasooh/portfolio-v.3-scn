// Marquee.tsx
// displays technologies in a marquee

import Marquee from "react-fast-marquee";

// Icons
import { RiNextjsFill } from "react-icons/ri";
import { FaDocker } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { SiPytorch } from "react-icons/si";
import { SiOpencv } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import { SiLua } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";

import React from "react";

export default function TechMarquee() {
    const iconClass = "mx-5 size-10"; // Tailwind class for uniform sizing

    return (
        <Marquee
            speed={50}
            gradient
            gradientWidth={100}
            gradientColor="oklch(0.141 0.005 285.823)"
            autoFill
        >
            <RiNextjsFill className={iconClass} />
            <FaDocker className={iconClass} />
            <SiTypescript className={iconClass} />
            <FaPython className={iconClass} />
            <FaAws className={iconClass} />
            <FaReact className={iconClass} />
            <SiTensorflow className={iconClass} />
            <SiPytorch className={iconClass} />
            <SiOpencv className={iconClass} />
            <IoLogoJavascript className={iconClass} />
            <FaJava className={iconClass} />
            <SiLua className={iconClass} />
            <FaHtml5 className={iconClass} />
            <FaCss3Alt className={iconClass} />
        </Marquee>
    );
}