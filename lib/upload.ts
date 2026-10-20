import {mkdir, writeFile} from 'fs/promises';
import path from 'path';
import {put} from '@vercel/blob';

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
}

export async function saveUpload(file: File) {
  const filename = `${Date.now()}-${safeName(file.name || 'photo.jpg')}`;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    const blob = await put(`vehicles/${filename}`, file, {
      access: 'public',
      token,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(dir, {recursive: true});
  const buf = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buf);
  return `/uploads/${filename}`;
}
