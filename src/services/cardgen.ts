import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 255, g: 107, b: 107 };
}

function wrapText(
  ctx: any,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function generateCards(
  lines: string[],
  magazineName: string,
  color: string,
  outputDir: string
): Promise<void> {
  fs.mkdirSync(outputDir, { recursive: true });

  const rgb = hexToRgb(color);
  const bgColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  await generateCoverCard(lines[0], magazineName, bgColor, outputDir);

  for (let i = 1; i < 4; i++) {
    await generateContentCard(lines[i], i, bgColor, outputDir);
  }

  await generateEndCard(lines[4], magazineName, bgColor, outputDir);
}

async function generateCoverCard(
  title: string,
  magazineName: string,
  bgColor: string,
  outputDir: string
): Promise<void> {
  const canvas = createCanvas(CARD_WIDTH, CARD_HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'center';
  ctx.fillText(magazineName, CARD_WIDTH / 2, 150);

  ctx.fillStyle = 'white';
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'center';

  const titleLines = wrapText(ctx, title, CARD_WIDTH - 100);
  const startY = CARD_HEIGHT / 2 - (titleLines.length * 80) / 2;

  titleLines.forEach((line, index) => {
    ctx.fillText(line, CARD_WIDTH / 2, startY + index * 80);
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, '01_cover.png'), buffer);
}

async function generateContentCard(
  content: string,
  index: number,
  bgColor: string,
  outputDir: string
): Promise<void> {
  const canvas = createCanvas(CARD_WIDTH, CARD_HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = 'bold 300px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'right';
  ctx.fillText(index.toString(), CARD_WIDTH - 50, CARD_HEIGHT - 100);

  ctx.fillStyle = 'white';
  ctx.font = '52px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'center';

  const lines = wrapText(ctx, content, CARD_WIDTH - 100);
  const startY = CARD_HEIGHT / 2 - (lines.length * 70) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, CARD_WIDTH / 2, startY + i * 70);
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `0${index + 1}_content.png`), buffer);
}

async function generateEndCard(
  content: string,
  magazineName: string,
  bgColor: string,
  outputDir: string
): Promise<void> {
  const canvas = createCanvas(CARD_WIDTH, CARD_HEIGHT);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = 'white';
  ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.textAlign = 'center';
  ctx.fillText('Thanks for reading!', CARD_WIDTH / 2, CARD_HEIGHT / 2 - 100);

  ctx.font = '32px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.fillText(content, CARD_WIDTH / 2, CARD_HEIGHT / 2 + 100);

  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI"';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText(magazineName, CARD_WIDTH / 2, CARD_HEIGHT - 100);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, '05_end.png'), buffer);
}
