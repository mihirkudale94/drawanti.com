/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, '../public/gallery_media');
const outputFilePath = path.join(__dirname, '../data/galleryMedia.ts');

try {
  if (!fs.existsSync(mediaDir)) {
    console.error(`Media directory does not exist: ${mediaDir}`);
    process.exit(1);
  }

  const mediaFiles = fs.readdirSync(mediaDir);
  
  const videoFile = mediaFiles.find((file) => file.endsWith('.mp4') || file.endsWith('.mov')) || null;
  const imageFiles = mediaFiles
    .filter((file) => file.match(/\.(jpg|jpeg|png|webp)$/i))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10);
      return numA - numB;
    });

  const content = `// This file is auto-generated. Do not edit manually.
export const galleryMedia = {
  videoFile: ${JSON.stringify(videoFile)},
  imageFiles: ${JSON.stringify(imageFiles, null, 2)}
};
`;

  fs.writeFileSync(outputFilePath, content, 'utf8');
  // console.log(`Successfully generated ${outputFilePath} with ${imageFiles.length} images and video: ${videoFile}`);
} catch (error) {
  console.error('Failed to generate gallery media data:', error);
  process.exit(1);
}
