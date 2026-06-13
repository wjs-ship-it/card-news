import { getAvailableTemplates, loadTemplate, getDefaultTemplate } from '../services/template-engine';

describe('Template Engine', () => {
  describe('getAvailableTemplates', () => {
    it('should return a list of available templates', () => {
      const templates = getAvailableTemplates();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should include minimal, detailed, and colorful', () => {
      const templates = getAvailableTemplates();
      expect(templates).toContain('minimal');
      expect(templates).toContain('detailed');
      expect(templates).toContain('colorful');
    });
  });

  describe('loadTemplate', () => {
    it('should load minimal template', () => {
      const template = loadTemplate('minimal');
      expect(template.name).toBe('minimal');
      expect(template.cardWidth).toBe(1080);
      expect(template.cardHeight).toBe(1350);
    });

    it('should load detailed template', () => {
      const template = loadTemplate('detailed');
      expect(template.name).toBe('detailed');
      expect(template.backgroundColor).toBe('#F8F9FA');
    });

    it('should load colorful template', () => {
      const template = loadTemplate('colorful');
      expect(template.name).toBe('colorful');
      expect(template.backgroundColor).toBe('#FF6B6B');
      expect(template.textColor).toBe('#FFFFFF');
    });

    it('should throw error for non-existent template', () => {
      expect(() => loadTemplate('non-existent')).toThrow();
    });
  });

  describe('getDefaultTemplate', () => {
    it('should return minimal template as default', () => {
      const template = getDefaultTemplate();
      expect(template.name).toBe('minimal');
    });
  });

  describe('Template Configuration', () => {
    it('should have valid color values', () => {
      const templates = getAvailableTemplates();
      templates.forEach((name) => {
        const template = loadTemplate(name);
        // Check hex color format
        expect(template.backgroundColor).toMatch(/^#[0-9A-F]{6}$/i);
        expect(template.textColor).toMatch(/^#[0-9A-F]{6}$/i);
      });
    });

    it('should have proper font sizes', () => {
      const template = loadTemplate('minimal');
      expect(template.coverCard.titleFontSize).toBeGreaterThan(0);
      expect(template.contentCard.textFontSize).toBeGreaterThan(0);
      expect(template.endCard.mainTextFontSize).toBeGreaterThan(0);
    });
  });
});
