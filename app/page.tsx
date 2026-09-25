// homepage
// it's the homepage.

import React from "react";

// components
import { Separator } from "@/components/ui/separator";

// sections
import Nav from "@/components/Nav";
import MoreSection from "@/components/sections/MoreSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HeroSection from "@/components/sections/HeroSection";
import FooterSection from "@/components/sections/FooterSection";
import BackgroundEffect from "@/components/three/BackgroundEffect";
import AnimatedLoading from "@/components/AnimatedLoading";

export default function Home() {
    return (
        <AnimatedLoading minDuration={600} maxDuration={2500} fadeOutMs={450}>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-white/15 focus:bg-background focus:px-4 focus:py-2"
            >
                skip to content
            </a>

            {/* before <main> so it's reachable by keyboard early, even though
                it floats at the bottom visually */}
            <Nav />

            <main id="main" className="flex flex-col items-stretch overflow-x-hidden">
                <HeroSection />
                <ProjectsSection />
                <ExperienceSection />
                <MoreSection />
                <Separator className="w-full mt-12 sm:mt-16 lg:mt-20" />
                <FooterSection />
                <BackgroundEffect />
            </main>
        </AnimatedLoading>
    );
}
