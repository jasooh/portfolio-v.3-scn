// homepage
// it's the homepage.

import React from "react";

// components
import {Separator} from "@/components/ui/separator";

// sections
import MoreSection from "@/components/sections/MoreSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import HeroSection from "@/components/sections/HeroSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <div className="px-12 w-[1200px]">
                <HeroSection />

                {/* projects */}
                <ProjectsSection />

                {/* experience */}
                <ExperienceSection />

                {/* more section */}
                <MoreSection />
            </div>
            {/* footer */}
            <Separator/>
            <FooterSection />
        </main>
    );
}
