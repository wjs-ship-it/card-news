#!/usr/bin/env node

import { program } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);

program
  .name('card-news')
  .description('🎨 Transform news articles into Instagram card news')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize magazine settings')
  .action(async () => {
    const { initSetup } = await import('./commands/init.js');
    await initSetup();
  });

program
  .command('generate <url>')
  .description('Generate card news from article URL')
  .option('-o, --output <dir>', 'output directory', './card-news-output')
  .option('--zip', 'create ZIP archive of all cards')
  .action(async (url: string, options: { output: string; zip?: boolean }) => {
    const { generateNews } = await import('./commands/generate.js');
    await generateNews(url, options);
  });

program
  .command('config')
  .description('View magazine configuration')
  .action(async () => {
    const { showConfig } = await import('./commands/config.js');
    await showConfig();
  });

program
  .command('test')
  .description('Test Claude API connection')
  .action(async () => {
    const { testAPI } = await import('./commands/test.js');
    await testAPI();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
