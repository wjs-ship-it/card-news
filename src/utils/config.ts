import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface MagazineConfig {
  apiKey: string;
  magazineName: string;
  color: string;
  hashtags: string[];
}

const CONFIG_DIR = path.join(os.homedir(), '.card-news');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export function initConfig(config: Partial<MagazineConfig>): void {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  const fullConfig: MagazineConfig = {
    apiKey: process.env.CLAUDE_API_KEY || config.apiKey || '',
    magazineName: config.magazineName || 'My Magazine',
    color: config.color || '#FF6B6B',
    hashtags: config.hashtags || ['뉴스', '핫이슈']
  };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(fullConfig, null, 2));
}

export function getConfig(): MagazineConfig {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error('Config not found. Run: card-news init');
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

export function getAPIKey(): string {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (apiKey) return apiKey;

  const config = getConfig();
  if (config.apiKey) return config.apiKey;

  throw new Error('Claude API key not found. Set CLAUDE_API_KEY or run: card-news init');
}

export function updateConfig(updates: Partial<MagazineConfig>): void {
  const current = getConfig();
  const updated = { ...current, ...updates };
  initConfig(updated);
}

export function configExists(): boolean {
  return fs.existsSync(CONFIG_FILE);
}
