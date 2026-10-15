// github.ts
// a year of github contributions, folded into weeks and a few headline stats.
// github has no public api for the contribution graph, so this reads the
// community proxy react-github-calendar used; it fails soft to null.

export const GITHUB_USER = "jasooh";

type Day = { date: string; count: number };

export type ContributionWeek = {
    /** iso date of the week's sunday */
    start: string;
    count: number;
};

export type Contributions = {
    total: number;
    weeks: ContributionWeek[];
    bestWeek: number;
    longestStreak: number;
    currentStreak: number;
};

// streaks count consecutive days with at least one contribution. today is
// still in progress, so an empty today doesn't break the current streak
function streaks(days: Day[]) {
    let longest = 0;
    let run = 0;
    for (const d of days) {
        run = d.count > 0 ? run + 1 : 0;
        longest = Math.max(longest, run);
    }
    let current = 0;
    let i = days.length - 1;
    if (i >= 0 && days[i].count === 0) i--;
    for (; i >= 0 && days[i].count > 0; i--) current++;
    return { longest, current };
}

function toWeeks(days: Day[]): ContributionWeek[] {
    const weeks = new Map<string, number>();
    for (const d of days) {
        const date = new Date(`${d.date}T00:00:00Z`);
        date.setUTCDate(date.getUTCDate() - date.getUTCDay());
        const key = date.toISOString().slice(0, 10);
        weeks.set(key, (weeks.get(key) ?? 0) + d.count);
    }
    return [...weeks].map(([start, count]) => ({ start, count }));
}

export async function getContributions(): Promise<Contributions | null> {
    try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data: { total?: { lastYear?: number }; contributions?: Day[] } = await res.json();
        const days = (data.contributions ?? [])
            .filter((d) => typeof d.count === "number")
            .sort((a, b) => a.date.localeCompare(b.date));
        if (days.length === 0) return null;

        const weeks = toWeeks(days);
        const { longest, current } = streaks(days);
        return {
            total: data.total?.lastYear ?? days.reduce((n, d) => n + d.count, 0),
            weeks,
            bestWeek: Math.max(...weeks.map((w) => w.count)),
            longestStreak: longest,
            currentStreak: current,
        };
    } catch (err) {
        console.error("[getContributions] fetch failed:", err);
        return null;
    }
}
