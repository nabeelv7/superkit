import User from '$lib/server/models/User';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const user = User.findOne({ page: params.user })
    console.log(user)
    return {};
};