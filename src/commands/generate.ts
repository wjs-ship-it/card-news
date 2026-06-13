import * as path from 'path';
import { extractArticle } from '../services/article.js';
import { generateSummary } from '../services/summary.js';
import { generateCards } from '../services/cardgen.js';
import { getConfig, getAPIKey } from '../utils/config.js';
import { logSuccess, logError, logProcessing } from '../utils/logger.js';
import { createZipArchive } from '../services/zip-export.js';
import { validateUrl } from '../utils/path-validator.js';

export async function generateNews(
  url: string,
  options: { output: string; zip?: boolean; template?: string }
): Promise<void> {
  try {
    // Validate URL
    if (!validateUrl(url)) {
      throw new Error('Invalid URL format. Please provide a valid HTTP/HTTPS URL.');
    }

    // Sanitize output path
    const outputPath = path.resolve(options.output);
    if (outputPath.includes('..')) {
      throw new Error('Output path cannot contain ".." (directory traversal not allowed)');
    }

    const config = getConfig();
    const apiKey = getAPIKey();

    logProcessing('기사 추출 중...');
    const article = await extractArticle(url);

    logProcessing('AI 요약 생성 중...');
    const lines = await generateSummary(article, apiKey);

    logProcessing(`카드 생성 중... (template: ${options.template || 'minimal'})`);
    await generateCards(lines, config.magazineName, config.color, options.output, options.template);

    console.log('\n');
    logSuccess(`카드는 ${options.output}에 저장되었습니다.`);
    console.log('\n생성된 파일:');
    lines.forEach((line, i) => {
      console.log(`  0${i + 1}_*.png - ${line}`);
    });

    if (options.zip) {
      logProcessing('ZIP 아카이브 생성 중...');
      const zipPath = `${options.output}.zip`;
      await createZipArchive(options.output, zipPath, config.magazineName);
      logSuccess(`ZIP 파일: ${zipPath}`);
    }

    console.log('');
  } catch (error) {
    logError((error as Error).message);
    process.exit(1);
  }
}
