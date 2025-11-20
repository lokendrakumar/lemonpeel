import { formatDate, formatCurrency, capitalize, isValidEmail, validatePasswordStrength } from '../../lib/helpers';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-01-15');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/January 15, 2025/);
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      const amount = 1234.56;
      const formatted = formatCurrency(amount);
      expect(formatted).toBe('$1,234.56');
    });

    it('formats currency with different currency code', () => {
      const amount = 1000;
      const formatted = formatCurrency(amount, 'EUR');
      expect(formatted).toMatch(/€/);
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('')).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('validates email correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid.email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('validates strong password', () => {
      const result = validatePasswordStrength('StrongPass123');
      expect(result.isValid).toBe(true);
      expect(result.checks.minLength).toBe(true);
      expect(result.checks.hasUpperCase).toBe(true);
      expect(result.checks.hasLowerCase).toBe(true);
      expect(result.checks.hasNumbers).toBe(true);
    });

    it('validates weak password', () => {
      const result = validatePasswordStrength('weak');
      expect(result.isValid).toBe(false);
      expect(result.checks.minLength).toBe(false);
      expect(result.checks.hasUpperCase).toBe(false);
      expect(result.checks.hasNumbers).toBe(false);
    });
  });
});
