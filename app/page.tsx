// homepage
// it's the homepage.

import React from "react";

// components
import { Separator } from "@/components/ui/separator";

// sections
import MoreSection from "@/components/sections/MoreSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HeroSection from "@/components/sections/HeroSection";
import FooterSection from "@/components/sections/FooterSection";
import BackgroundEffect from "@/components/three/BackgroundEffect";
import AnimatedLoading from "@/components/AnimatedLoading";

export default function Home() {
    return (
        <AnimatedLoading minDuration={1000} fadeOutMs={300}>
            <main className="flex flex-col items-stretch overflow-x-hidden">
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
