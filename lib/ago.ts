// ago.ts
// compact relative times: "now", "12m ago", "3h ago", "2d ago".

export function ago(iso: string, now = Date.now()) {
    const mins = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000));
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.round(mins / 60);
    if (hours < 48) return `${hours}h ago`;
    return `${Math.round(hours / 24)}d ago`;
}
