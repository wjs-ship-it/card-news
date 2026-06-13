import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TemplateConfig {
  name: string;
  description: string;
  cardWidth: number;
  cardHeight: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  coverCard: {
    titleFontSize: number;
    magazineNameFontSize: number;
    magazineNameOpacity: number;
    padding: number;
  };
  contentCard: {
    textFontSize: number;
    numberFontSize: number;
    numberOpacity: number;
    padding: number;
  };
  endCard: {
    mainTextFontSize: number;
    subtextFontSize: number;
    magazineNameFontSize: number;
  };
}

export function getAvailableTemplates(): string[] {
  const templatesDir = path.join(__dirname, '..', '..', 'templates');
  const files = fs.readdirSync(templatesDir);
  return files
    .filter((f) => f.endsWith('.json') && f !== 'card.json')
    .map((f) => f.replace('.json', ''));
}

export function loadTemplate(templateName: string): TemplateConfig {
  const templatesDir = path.join(__dirname, '..', '..', 'templates');
  const templatePath = path.join(templatesDir, `${templateName}.json`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `Template not found: ${templateName}. Available: ${getAvailableTemplates().join(', ')}`
    );
  }

  const content = fs.readFileSync(templatePath, 'utf8');
  return JSON.parse(content) as TemplateConfig;
}

export function getDefaultTemplate(): TemplateConfig {
  return loadTemplate('minimal');
}
