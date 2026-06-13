import { getConfig, configExists } from '../utils/config.js';
import { logInfo, logError } from '../utils/logger.js';

export async function showConfig(): Promise<void> {
  try {
    if (!configExists()) {
      logError('설정이 없습니다. 먼저 `card-news init`을 실행하세요.');
      process.exit(1);
    }

    const config = getConfig();
    console.log('\n📋 현재 설정:\n');
    console.log(`  매거진명: ${config.magazineName}`);
    console.log(`  주 색상: ${config.color}`);
    console.log(`  API 키: ${config.apiKey ? '***' + config.apiKey.slice(-4) : '설정되지 않음'}`);
    console.log(`  해시태그: ${config.hashtags.join(', ')}`);
    console.log('');
  } catch (error) {
    logError((error as Error).message);
    process.exit(1);
  }
}
