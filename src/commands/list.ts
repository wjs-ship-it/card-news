import { getAvailableTemplates, loadTemplate } from '../services/template-engine.js';
import { logInfo, logSuccess } from '../utils/logger.js';

export async function listTemplates(): Promise<void> {
  try {
    const templates = getAvailableTemplates();

    logSuccess(`Available Templates (${templates.length})`);
    console.log('');

    templates.forEach((name) => {
      const template = loadTemplate(name);
      console.log(`  📋 ${name}`);
      console.log(`     ${template.description}`);
      console.log(`     Colors: BG=${template.backgroundColor} | Text=${template.textColor}`);
      console.log('');
    });

    logInfo('Usage: card-news generate <url> -t <template-name>');
    console.log('');
  } catch (error) {
    console.error(`Error listing templates: ${(error as Error).message}`);
    process.exit(1);
  }
}
