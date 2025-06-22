import User from '$lib/server/models/User';
import connectMongo from '$lib/server/utils/mongoose';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    console.log("YOOO")

    await connectMongo();
    const user = await User.findOne({ page: params.user })
    if (!user) {
        redirect(303, "/")
    }
    return {};
};