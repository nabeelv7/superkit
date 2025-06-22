import User from '$lib/server/models/User';
import connectMongo from '$lib/server/utils/mongoose';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const session = await locals.auth();
        console.log(session);
        const data = await request.formData();
        console.log(data);
        const page = data.get("page");


        // find the user by the session id and add the page
        await connectMongo();
        const user = await User.findOne({ email: session.user.email });
        console.log("USER", user)
        user.page = page;
        await user.save();

        redirect(303, "/dashboard/pfp");
    }
};