import { extractArticle } from '../services/article.js';
import { generateSummary } from '../services/summary.js';
import { generateCards } from '../services/cardgen.js';
import { getConfig, getAPIKey } from '../utils/config.js';
import { logSuccess, logError, logProcessing } from '../utils/logger.js';

export async function generateNews(
  url: string,
  options: { output: string }
): Promise<void> {
  try {
    const config = getConfig();
    const apiKey = getAPIKey();

    logProcessing('기사 추출 중...');
    const article = await extractArticle(url);

    logProcessing('AI 요약 생성 중...');
    const lines = await generateSummary(article, apiKey);

    logProcessing('카드 생성 중...');
    await generateCards(lines, config.magazineName, config.color, options.output);

    console.log('\n');
    logSuccess(`카드는 ${options.output}에 저장되었습니다.`);
    console.log('\n생성된 파일:');
    lines.forEach((line, i) => {
      console.log(`  0${i + 1}_*.png - ${line}`);
    });
    console.log('');
  } catch (error) {
    logError((error as Error).message);
    process.exit(1);
  }
}
