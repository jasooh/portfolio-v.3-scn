// api/revalidate
// responsible for triggering the sanity content lake webhook for re-rendering only when content changes.
// it does this by invalidating the data cache and forces a re-query of the data.

import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

type SanityWebhookBody = {
    _type?: 'project' | 'experience' | 'more' | 'siteSettings' | (string & {})
    _id?: string
    slug?: { current?: string }
}

// sanity document type -> cache tag. the resume lives on siteSettings.
const TYPE_TO_TAG: Record<string, string> = {
    project: 'project',
    experience: 'experience',
    more: 'more',
    siteSettings: 'resume',
}

const ALL_TAGS = Object.values(TYPE_TO_TAG)

export async function POST(req: NextRequest) {
    try {
        const secret = process.env.SANITY_REVALIDATE_SECRET
        if (!secret) return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })

        const { isValidSignature, body } = await parseBody<SanityWebhookBody>(req, secret, true)
        if (!isValidSignature) {
            return NextResponse.json({ message: 'Invalid signature', body }, { status: 401 })
        }

        const type = body?._type ?? 'unknown'
        const mapped = TYPE_TO_TAG[type]

        // unknown type: clear everything rather than risk serving stale content
        const tags = mapped ? [mapped] : ALL_TAGS
        if (!mapped) {
            console.warn(`[revalidate] unmapped sanity type "${type}", clearing all tags`)
        }

        for (const tag of tags) revalidateTag(tag)

        return NextResponse.json({
            revalidated: true,
            type,
            invalidated: tags,
            now: Date.now(),
        })
    } catch (err) {
        console.error(err)
        return new Response((err as Error).message, { status: 500 })
    }
}
