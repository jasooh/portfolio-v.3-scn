// MoreSection.tsx
// renders the more section of the home page.

import TechMarquee from "@/components/TechMarquee";
import GitHubCalendar from "react-github-calendar";
import React from "react";

export default function MoreSection() {
    return (
        <section className="mt-40 mb-20" id="more">
            <div className="flex flex-row justify-between items-end mb-10">
                <div>
                    <h2 className="text-5xl leading-25 font-bold">more.</h2>
                    <p className="text-gray-400">github activity, tools i use, and what i’m up to now.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* row 1, cols 1-2: Tech marquee */}
                <div className="flex justify-center lg:col-span-2 h-full rounded-2xl border border-white/10 p-6 bg-card">
                    <TechMarquee />
                </div>

                {/* row 1, col 3: availability */}
                <div className="h-full rounded-2xl border border-white/10 bg-card p-6">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        {/* status pill */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                    </span>
                            <span className="text-sm font-medium leading-none">available for projects</span>
                        </div>

                        {/* location / mode */}
                        <span className="text-xs sm:text-sm text-gray-400 leading-none">
                                    Toronto · remote-friendly
                                </span>
                    </div>
                </div>

                {/* row 2, cols 1-2: GitHub calendar */}
                <div className="lg:col-span-2 h-full rounded-2xl border border-white/10 p-6 bg-card">
                    <GitHubCalendar hideColorLegend hideMonthLabels username="jasooh" />
                </div>

                {/* row 2, col 3: fun stats */}
                <div className="h-full rounded-2xl border border-white/10 p-6 bg-card">
                    <h3 className="text-lg font-semibold mb-4">fun stats 🎯</h3>

                    {/* row 1 of fun stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-semibold leading-tight">4</div>
                            <div className="text-xs text-gray-400">hackathons</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold leading-tight">12</div>
                            <div className="text-xs text-gray-400">PRs</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold leading-tight">plat</div>
                            {/* TODO: link tracker gg to ts */}
                            <div className="text-xs text-gray-400">valorant rank</div>
                        </div>
                    </div>

                    {/* row 2 of fun stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-semibold leading-tight">X</div>
                            <div className="text-xs text-gray-400">leetcode</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold leading-tight">Y</div>
                            <div className="text-xs text-gray-400">talks/posts</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold leading-tight">Z</div>
                            <div className="text-xs text-gray-400">coffee ☕</div>
                        </div>
                    </div>
                </div>

                {/* message me - TODO: turn into separate component and implement backend */}
                <div className="lg:col-span-3 rounded-2xl border border-white/10 p-6 bg-card">
                    <h3 className="text-lg font-semibold mb-4">let’s talk.</h3>
                    {/* FRONTEND-ONLY form — wire to your backend later */}
                    <form className="grid gap-4 sm:grid-cols-2" /* no action yet */>
                        {/* name */}
                        <div className="sm:col-span-1">
                            <label htmlFor="contact-name" className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
                                name
                            </label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                required
                                placeholder="name"
                                className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none focus:border-white/20"
                            />
                        </div>

                        {/* email */}
                        <div className="sm:col-span-1">
                            <label htmlFor="contact-email" className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
                                email
                            </label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@domain.com"
                                className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none focus:border-white/20"
                            />
                        </div>

                        {/* subject */}
                        <div className="sm:col-span-2">
                            <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
                                subject
                            </label>
                            <input
                                id="contact-subject"
                                name="subject"
                                type="text"
                                required
                                placeholder="hey justin, we'd like to offer you a job..."
                                className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none focus:border-white/20"
                            />
                        </div>

                        {/* message */}
                        <div className="sm:col-span-2">
                            <label htmlFor="contact-message" className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
                                message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                required
                                rows={5}
                                placeholder="tell me about your project, timeline, and goals…"
                                className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 outline-none focus:border-white/20 resize-y"
                            />
                        </div>

                        {/* actions */}
                        <div className="sm:col-span-2 flex items-center gap-3">
                            {/* TODO: primary submit — disabled since no backend yet */}
                            <button
                                type="button"
                                disabled
                                className="rounded-xl border border-white/10 px-4 py-2 opacity-60 cursor-not-allowed"
                                title="Hook this up to your backend to enable"
                            >
                                send message (coming soon)
                            </button>

                            {/* fallback mail link */}
                            <a
                                href="mailto:abuyuanjustin@gmail.com"
                                className="text-sm underline hover:no-underline text-gray-300"
                            >
                                or email me directly
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}