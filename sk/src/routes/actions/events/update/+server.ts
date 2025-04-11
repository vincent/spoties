import { saveEvent } from '$lib/domain/events';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch, locals }) => {
    const form = await request.json()
    const options = { fetch }

    await saveEvent(locals, form, options)

    return new Response(String(true))
}
