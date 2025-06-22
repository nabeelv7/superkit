/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { url } = await request.json();
    console.log("server:", url)
    return new Response({
        code: 200,
    });
};