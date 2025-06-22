import User from '$lib/server/models/User';
import connectMongo from '$lib/server/utils/mongoose';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        try {
            const session = await locals.auth();
            console.log(session);
            const data = await request.formData();
            console.log(data);
            const page = data.get("page")?.toLowerCase().trim();


            if (!page) {
                return { status: 400, error: "Page is Required" };
            }

            await connectMongo();

            const pageExists = await User.findOne({
                page,
                email: { $ne: session.user.email } // Exclude current user
            });

            if (pageExists) {
                return {
                    status: 400,
                    error: "Page already exists"
                }
            }


            // find the user by the session id and add the page
            const user = await User.findOne({ email: session.user.email });
            console.log("USER", user)
            user.page = page;
            await user.save();

            return {
                status: 200,
            }
        } catch (err) {
            return {
                status: 500,
                error: "Internal server error. Please try again."
            }
        } finally {
            redirect(303, "/dashboard/pfp");
        }
    }
};