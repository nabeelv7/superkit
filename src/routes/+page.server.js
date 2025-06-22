import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.auth();
    if (session || session?.user) {
        redirect(303, "/dashboard")
    }
    return {};
}
