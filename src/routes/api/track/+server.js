/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    // get the fetch request's ip
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // Load balancers, proxies
        request.headers.get("x-real-ip") ||                               // Nginx, etc.
        request.headers.get("cf-connecting-ip") ||                        // Cloudflare, optional
        "Unknown";


    console.log("IP:", ip)
    return new Response({
        code: 200,
    });
};