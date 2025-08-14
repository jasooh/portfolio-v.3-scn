// MessageForm.tsx
// renders the form that uses formspree to send messages with reCAPTCHA v3.

"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

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
            <p className="mt-4 text-[11px] text-gray-400">
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
                className="mt-6 sm:mt-8 rounded-2xl border border-white/10 p-6 bg-card"
            >
                <h3 id="contact-title" className="text-lg font-semibold mb-2">
                    message sent — thank you!
                </h3>
                <p className="text-gray-300 mb-4">
                    i’ll get back to you as soon as i can. want to send another? :)
                </p>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-xl border border-white/10 px-4 py-2"
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
            className="mt-6 sm:mt-8 rounded-2xl border border-white/10 p-6 bg-card"
        >
            <h3 id="contact-title" className="text-lg font-semibold mb-4">
                let’s talk.
            </h3>

            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                {/* honeypot */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="sm:col-span-1">
                    <label
                        htmlFor="contact-name"
                        className="mb-1 block text-xs uppercase tracking-wide text-gray-400"
                    >
                        name
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="name"
                        className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none ring-1 ring-transparent focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>

                <div className="sm:col-span-1">
                    <label
                        htmlFor="contact-email"
                        className="mb-1 block text-xs uppercase tracking-wide text-gray-400"
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
                        className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none ring-1 ring-transparent focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="contact-subject"
                        className="mb-1 block text-xs uppercase tracking-wide text-gray-400"
                    >
                        subject
                    </label>
                    <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="hey justin, we'd like to offer you a job..."
                        className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none ring-1 ring-transparent focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="contact-message"
                        className="mb-1 block text-xs uppercase tracking-wide text-gray-400"
                    >
                        message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="go on..."
                        className="w-full resize-y rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none ring-1 ring-transparent focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        aria-disabled={!canSubmit}
                        className={`rounded-xl border border-white/10 px-4 py-2 ${
                            !canSubmit ? "opacity-60 cursor-not-allowed" : ""
                        }`}
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
