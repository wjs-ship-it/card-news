import { extractArticle } from '../services/article';

describe('Article Extractor', () => {
  it('should reject invalid URLs', async () => {
    await expect(extractArticle('not a valid url')).rejects.toThrow(
      'Invalid URL format'
    );
  });

  it('should reject non-HTTP protocols', async () => {
    await expect(extractArticle('ftp://example.com')).rejects.toThrow(
      'Invalid URL format'
    );
  });

  // Note: These tests require actual network access
  // Skip them in CI/offline environments
  describe.skip('Real URL extraction', () => {
    it('should extract article from BBC', async () => {
      const article = await extractArticle('https://www.bbc.com/news');
      expect(article.title).toBeTruthy();
      expect(article.body).toBeTruthy();
      expect(article.body.length).toBeGreaterThan(100);
    });

    it('should handle timeout gracefully', async () => {
      // This would require a server that accepts connections but never responds
      // Skip in normal test runs
    });
  });
});
