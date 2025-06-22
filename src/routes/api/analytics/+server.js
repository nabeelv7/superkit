import Visit from '$lib/server/models/Visit';
import connectMongo from '$lib/server/utils/mongoose';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const body = await request.json();
        console.log("BODY", body)

        await connectMongo();
        const visit = new Visit(body); // ✅ create the document
        await visit.save();

        return new Response(JSON.stringify({ success: true, visit }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error saving visit:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
