// api/revalidate
// responsible for triggering the sanity content lake webhook for re-rendering only when content changes.
// it does this by invalidating the data cache and forces a re-query of the data.

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

type SanityWebhookBody = {
    _type?: 'project' | 'experience' | 'more' | 'resume' | (string & {})
    _id?: string
    slug?: { current?: string }
}

const TYPE_TO_TAG: Record<string, string> = {
    project: 'project',
    experience: 'experience',
    more: 'more',
    resume: 'resume',
}

export async function POST(req: NextRequest) {
    try {
        const secret = process.env.SANITY_REVALIDATE_SECRET
        if (!secret) return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })

        const { isValidSignature, body } = await parseBody<SanityWebhookBody>(req, secret, true)
        if (!isValidSignature) {
            return NextResponse.json({ message: 'Invalid signature', body }, { status: 401 })
        }

        const type = body?._type ?? 'unknown'
        const tags = new Set<string>([TYPE_TO_TAG[type] ?? 'sanity'])

        for (const tag of tags) revalidateTag(tag)

        return NextResponse.json({
            revalidated: true,
            type,
            invalidated: [...tags],
            now: Date.now(),
        })
    } catch (err) {
        console.error(err)
        return new Response((err as Error).message, { status: 500 })
    }
}
