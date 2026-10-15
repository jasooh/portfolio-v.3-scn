// MessageForm.tsx
// renders the form that uses formspree to send messages with reCAPTCHA v3.

"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MessageForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // pass a promise-producing fn for g-recaptcha-response so Formspree runs it on submit
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!, {
        data: {
            "g-recaptcha-response": async () =>
                executeRecaptcha ? await executeRecaptcha("contact_form") : "",
        },
    });

    /**
     * reCAPTCHA detail display, required if using Google reCAPTCHA
     */
    const ReCaptchaDetails = () => {
        return (
            <p className="mt-6 text-[11px] text-muted-foreground">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                >
                    Privacy Policy
                </a>{" "}
                and{" "}
                <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                >
                    Terms of Service
                </a>{" "}
                apply.
            </p>
        )
    }

    const canSubmit = !!executeRecaptcha && !state.submitting;

    // success msg
    if (state.succeeded) {
        return (
            <section
                aria-labelledby="contact-title"
                className="drafted mt-6 sm:mt-8 p-6 sm:p-8"
            >
                <h3 id="contact-title" className="mb-2 font-display text-3xl italic leading-none">
                    message sent — thank you!
                </h3>
                <p className="mb-5 text-muted-foreground">
                    i’ll get back to you as soon as i can. want to send another? :)
                </p>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className={buttonVariants({ variant: "fill", size: "lg" })}
                >
                    send another
                </button>

                <ReCaptchaDetails />
            </section>
        );
    }

    return (
        <section
            aria-labelledby="contact-title"
            className="drafted mt-6 sm:mt-8 p-6 sm:p-8"
        >
            <span className="label">[ 03.1 ] contact</span>
            <h3 id="contact-title" className="mt-2 mb-6 font-display text-4xl italic leading-none">
                let’s talk<span className="not-italic text-primary">.</span>
            </h3>

            <form className="grid gap-x-8 gap-y-6 sm:grid-cols-2" onSubmit={handleSubmit}>
                {/* honeypot */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="sm:col-span-1">
                    <label
                        htmlFor="contact-name"
                        className="label block"
                    >
                        name
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="name"
                        className="w-full border-0 border-b border-rule bg-transparent px-0 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus-visible:border-primary"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="sm:col-span-1">
                    <label
                        htmlFor="contact-email"
                        className="label block"
                    >
                        email
                    </label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@domain.com"
                        className="w-full border-0 border-b border-rule bg-transparent px-0 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus-visible:border-primary"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="contact-subject"
                        className="label block"
                    >
                        subject
                    </label>
                    <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="subject"
                        className="w-full border-0 border-b border-rule bg-transparent px-0 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus-visible:border-primary"
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="contact-message"
                        className="label block"
                    >
                        message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="hey justin, we'd like to offer you a job..."
                        className="w-full resize-y border-0 border-b border-rule bg-transparent px-0 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground/50 focus-visible:border-primary"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        aria-disabled={!canSubmit}
                        className={cn(
                            buttonVariants({ variant: "fill", size: "lg" }),
                            !canSubmit && "opacity-60 cursor-not-allowed"
                        )}
                    >
                        {state.submitting ? "sending..." : !executeRecaptcha ? "loading..." : "send message"}
                    </button>
                </div>

                {/* live region for a11y */}
                <p aria-live="polite" className="sr-only">
                    {state.submitting ? "sending" : state.errors ? "there were errors" : ""}
                </p>
            </form>

            <ReCaptchaDetails />
        </section>
    );
}
