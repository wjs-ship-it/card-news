import Anthropic from '@anthropic-ai/sdk';
import { getAPIKey } from '../utils/config.js';
import { logSuccess, logError, logProcessing } from '../utils/logger.js';

export async function testAPI(): Promise<void> {
  try {
    const apiKey = getAPIKey();
    logProcessing('Claude API 테스트 중...');

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Say "API connection successful!" in exactly 5 words.'
        }
      ]
    });

    console.log('');
    logSuccess('API 연결 성공!');
    console.log('');
    console.log(
      message.content[0].type === 'text' ? message.content[0].text : ''
    );
    console.log('');
  } catch (error) {
    console.log('');
    logError(`API 연결 실패: ${(error as Error).message}`);
    process.exit(1);
  }
}
