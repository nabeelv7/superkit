import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto'; // built-in

export async function POST({ request }) {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
        return new Response(JSON.stringify({ message: 'Invalid file' }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 👇 Unique filename using timestamp + UUID
    const ext = path.extname(file.name);
    const name = path.basename(file.name, ext);
    const uniqueFileName = `${name}-${Date.now()}-${randomUUID()}${ext}`;
    const uploadPath = path.resolve('static/uploads', uniqueFileName);

    try {
        await writeFile(uploadPath, buffer);
        return new Response(JSON.stringify({ message: 'File uploaded!', filename: uniqueFileName }));
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Upload failed' }), { status: 500 });
    }
}
