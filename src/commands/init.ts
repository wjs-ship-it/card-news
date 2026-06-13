import inquirer from 'inquirer';
import { initConfig } from '../utils/config.js';
import { logSuccess, logInfo } from '../utils/logger.js';

export async function initSetup(): Promise<void> {
  console.log('\n🎨 Card News Magazine 초기 설정\n');

  const answers = await inquirer.prompt([
    {
      type: 'password',
      name: 'apiKey',
      message: 'Claude API 키를 입력하세요 (또는 CLAUDE_API_KEY 환경변수 사용):',
      default: process.env.CLAUDE_API_KEY || ''
    },
    {
      type: 'input',
      name: 'magazineName',
      message: '매거진 이름을 입력하세요:',
      default: 'My Magazine'
    },
    {
      type: 'input',
      name: 'color',
      message: '주 색상을 입력하세요 (hex color, 예: #FF6B6B):',
      default: '#FF6B6B'
    },
    {
      type: 'input',
      name: 'hashtags',
      message: '해시태그를 입력하세요 (쉼표로 구분, 예: 뉴스,핫이슈):',
      default: '뉴스,핫이슈'
    }
  ]);

  const config = {
    apiKey: answers.apiKey || process.env.CLAUDE_API_KEY,
    magazineName: answers.magazineName,
    color: answers.color,
    hashtags: answers.hashtags.split(',').map((tag: string) => tag.trim())
  };

  initConfig(config);
  logSuccess('설정이 저장되었습니다!');
  logInfo(`매거진: ${answers.magazineName}`);
  logInfo(`색상: ${answers.color}`);
}
