import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

const images = await findImages('./public');
console.log(`找到 ${images.length} 张图片，开始转换...`);

for (const file of images) {
  const webpPath = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  try {
    const before = (await stat(file)).size;
    await sharp(file)
      
      .webp({ quality: 100 })
      .toFile(webpPath);
    const after = (await stat(webpPath)).size;
    const saved = Math.round((1 - after / before) * 100);
    console.log(`✓ ${file} → 节省${saved}%`);
  } catch (e) {
    console.log(`✗ 跳过 ${file}: ${e.message}`);
  }
}
console.log('全部完成！');
