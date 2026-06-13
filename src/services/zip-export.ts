import * as fs from 'fs';
import * as path from 'path';
import { createWriteStream } from 'fs';

const archiver = require('archiver');

export async function createZipArchive(
  sourceDir: string,
  outputPath: string,
  magazineName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate input paths
    if (!fs.existsSync(sourceDir)) {
      reject(new Error(`Source directory not found: ${sourceDir}`));
      return;
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    fs.mkdirSync(outputDir, { recursive: true });

    const output = createWriteStream(outputPath);
    const archive = archiver.default('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      resolve(outputPath);
    });

    output.on('error', (err: any) => {
      reject(new Error(`Failed to create ZIP: ${err.message}`));
    });

    archive.on('error', (err: any) => {
      reject(new Error(`Archiver error: ${err.message}`));
    });

    archive.pipe(output);

    // Add all PNG files from source directory
    const files = fs.readdirSync(sourceDir);
    const pngFiles = files.filter((f) => f.endsWith('.png'));

    if (pngFiles.length === 0) {
      reject(new Error('No PNG files found to archive'));
      return;
    }

    pngFiles.forEach((file) => {
      const filePath = path.join(sourceDir, file);
      archive.file(filePath, { name: file });
    });

    // Add metadata
    const metadata = {
      magazineName,
      generatedAt: new Date().toISOString(),
      cardCount: pngFiles.length,
      files: pngFiles
    };

    archive.append(JSON.stringify(metadata, null, 2), {
      name: 'metadata.json'
    });

    archive.finalize();
  });
}
