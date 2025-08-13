// CaptchaProvider.tsx
// provides the Google reCAPTCHA to the site.

"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function CaptchaProvider({ children }: { children: React.ReactNode }) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            scriptProps={{ async: true, defer: true }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}