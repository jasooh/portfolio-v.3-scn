// api/revalidate
// responsible for triggering the sanity content lake webhook for re-rendering only when content changes.

import { revalidateTag } from 'next/cache';
import { isValidSignature } from '@sanity/webhook';

export async function POST(req: Request) {
    const body = await req.json();
    const signature = req.headers.get('sanity-signature') || '';
    const ok = isValidSignature(JSON.stringify(body), signature, process.env.SANITY_REVALIDATE_SECRET!);
    if (!ok) return new Response('Invalid signature.', { status: 401 });

    switch (body?._type) {
        case 'project':
            revalidateTag('project');
            break;
        case 'experience':
            revalidateTag('experience');
            break;
        default:
            revalidateTag('sanity');
    }

    return Response.json({ revalidated: true, now: Date.now() });
}

