// Nav.tsx
// resolves the resume url, then hands off to the client dock.

import React from "react";
import { getResume } from "@/sanity/fetch";
import NavDock from "@/components/NavDock";

export default async function Nav() {
    const { resumeUrl } = await getResume();
    return <NavDock resumeUrl={resumeUrl} />;
}
