// glide.ts
// the scene glide in flight, shared between SceneSnap (which starts glides)
// and SmoothScroll (which decides what wheel input does while one runs).
//
// "commit": the hero handing off. wheel input in the same direction is
//   absorbed, so a flick still lands cleanly; turning around cancels it.
// "magnet": a settle onto a nearby scene. any input at all cancels it, so
//   it never stands between the visitor and the scroll they asked for.

export type GlideMode = "commit" | "magnet";

export const glide: { mode: GlideMode | null; dir: number } = { mode: null, dir: 0 };
