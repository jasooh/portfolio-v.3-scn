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

export default function Home() {
    return (
        <main className="flex flex-col items-stretch overflow-x-hidden">
            {/* Each section already handles its own max-width + padding */}
            <HeroSection />

            <ProjectsSection />

            <ExperienceSection />

            <MoreSection />

            {/* full-width separator, but visually centered by each section’s own container */}
            <Separator className="w-full my-12 sm:my-16 lg:my-20" />

            <FooterSection />
        </main>
    );
}
