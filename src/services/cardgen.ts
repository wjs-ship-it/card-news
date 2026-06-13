import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';
import { loadTemplate, TemplateConfig, getDefaultTemplate } from './template-engine.js';

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
  outputDir: string,
  templateName?: string
): Promise<void> {
  fs.mkdirSync(outputDir, { recursive: true });

  const template = templateName ? loadTemplate(templateName) : getDefaultTemplate();

  await generateCoverCard(lines[0], magazineName, template, outputDir);

  for (let i = 1; i < 4; i++) {
    await generateContentCard(lines[i], i, template, outputDir);
  }

  await generateEndCard(lines[4], magazineName, template, outputDir);
}

async function generateCoverCard(
  title: string,
  magazineName: string,
  template: TemplateConfig,
  outputDir: string
): Promise<void> {
  const canvas = createCanvas(template.cardWidth, template.cardHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = template.backgroundColor;
  ctx.fillRect(0, 0, template.cardWidth, template.cardHeight);

  const cfg = template.coverCard;

  ctx.fillStyle = `rgba(0, 0, 0, ${cfg.magazineNameOpacity})`;
  ctx.font = `bold ${cfg.magazineNameFontSize}px ${template.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.fillText(magazineName, template.cardWidth / 2, 100);

  ctx.fillStyle = template.textColor;
  ctx.font = `bold ${cfg.titleFontSize}px ${template.fontFamily}`;
  ctx.textAlign = 'center';

  const titleLines = wrapText(ctx, title, template.cardWidth - cfg.padding);
  const startY = template.cardHeight / 2 - (titleLines.length * 80) / 2;

  titleLines.forEach((line, index) => {
    ctx.fillText(line, template.cardWidth / 2, startY + index * 80);
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, '01_cover.png'), buffer);
}

async function generateContentCard(
  content: string,
  index: number,
  template: TemplateConfig,
  outputDir: string
): Promise<void> {
  const canvas = createCanvas(template.cardWidth, template.cardHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = template.backgroundColor;
  ctx.fillRect(0, 0, template.cardWidth, template.cardHeight);

  const cfg = template.contentCard;

  ctx.fillStyle = `rgba(0, 0, 0, ${cfg.numberOpacity})`;
  ctx.font = `bold ${cfg.numberFontSize}px ${template.fontFamily}`;
  ctx.textAlign = 'right';
  ctx.fillText(index.toString(), template.cardWidth - 50, template.cardHeight - 100);

  ctx.fillStyle = template.textColor;
  ctx.font = `${cfg.textFontSize}px ${template.fontFamily}`;
  ctx.textAlign = 'center';

  const lines = wrapText(ctx, content, template.cardWidth - cfg.padding);
  const startY = template.cardHeight / 2 - (lines.length * 70) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, template.cardWidth / 2, startY + i * 70);
  });

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `0${index + 1}_content.png`), buffer);
}

async function generateEndCard(
  content: string,
  magazineName: string,
  template: TemplateConfig,
  outputDir: string
): Promise<void> {
  const canvas = createCanvas(template.cardWidth, template.cardHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = template.backgroundColor;
  ctx.fillRect(0, 0, template.cardWidth, template.cardHeight);

  const cfg = template.endCard;

  ctx.fillStyle = template.textColor;
  ctx.font = `bold ${cfg.mainTextFontSize}px ${template.fontFamily}`;
  ctx.textAlign = 'center';
  ctx.fillText('Thanks for reading!', template.cardWidth / 2, template.cardHeight / 2 - 100);

  ctx.font = `${cfg.subtextFontSize}px ${template.fontFamily}`;
  ctx.fillText(content, template.cardWidth / 2, template.cardHeight / 2 + 100);

  ctx.font = `bold ${cfg.magazineNameFontSize}px ${template.fontFamily}`;
  ctx.fillStyle = template.accentColor;
  ctx.fillText(magazineName, template.cardWidth / 2, template.cardHeight - 100);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, '05_end.png'), buffer);
}
