// api/revalidate
// responsible for triggering the sanity content lake webhook for re-rendering only when content changes.
// it does this by invalidating the data cache and forces a re-query of the data.

import { revalidateTag } from 'next/cache';
import { isValidSignature } from '@sanity/webhook';

export async function POST(req: Request) {
    const body = await req.json();
    const signature = req.headers.get('sanity-signature') || '';
    const ok = isValidSignature(JSON.stringify(body), signature, process.env.SANITY_REVALIDATE_SECRET!);
    if (!ok) return new Response('Invalid signature.', { status: 401 });

    console.log("REVALIDATE: " + body?._type);
    switch (body?._type) {
        case 'project':
            revalidateTag('project');
            break;
        case 'experience':
            revalidateTag('experience');
            break;
        case 'more':
            revalidateTag('more');
            break;
        case 'resume':
            revalidateTag('resume');
            break;
        default:
            revalidateTag('sanity');
    }

    return Response.json({ revalidated: true, now: Date.now() });
}

