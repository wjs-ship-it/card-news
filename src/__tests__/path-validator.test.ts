import { validateUrl, validateOutputPath, sanitizeFilename } from '../utils/path-validator';

describe('Path Validator', () => {
  describe('validateUrl', () => {
    it('should accept valid HTTP URLs', () => {
      expect(validateUrl('http://example.com')).toBe(true);
      expect(validateUrl('https://www.example.com/path')).toBe(true);
      expect(validateUrl('https://example.com/article?id=123')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not a url')).toBe(false);
      expect(validateUrl('ftp://example.com')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });

  describe('sanitizeFilename', () => {
    it('should remove dangerous characters', () => {
      expect(sanitizeFilename('my-file.txt')).toBe('my-file.txt');
      expect(sanitizeFilename('file<script>.txt')).toBe('file_script_.txt');
      expect(sanitizeFilename('..\\dangerous')).toBe('__dangerous');
    });

    it('should remove leading dots', () => {
      expect(sanitizeFilename('...hidden')).toBe('hidden');
      expect(sanitizeFilename('.gitignore')).toBe('gitignore');
    });

    it('should limit filename length', () => {
      const longName = 'a'.repeat(300);
      expect(sanitizeFilename(longName).length).toBe(255);
    });
  });

  describe('validateOutputPath', () => {
    it('should reject directory traversal attempts', () => {
      expect(validateOutputPath('../../../etc/passwd')).toBe(false);
      expect(validateOutputPath('output/..')).toBe(false);
    });

    it('should reject absolute paths', () => {
      expect(validateOutputPath('/etc/passwd')).toBe(false);
      expect(validateOutputPath('~/secret')).toBe(false);
    });

    it('should accept valid relative paths', () => {
      expect(validateOutputPath('output')).toBe(true);
      expect(validateOutputPath('output/cards')).toBe(true);
    });
  });
});
