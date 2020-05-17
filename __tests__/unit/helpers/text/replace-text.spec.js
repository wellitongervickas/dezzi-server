const replaceText = require('../../../../src/helpers/text/replace-text');

describe('Helpers Text Replace Text', () => {
  it('should be defined', () => {
    expect(replaceText).toBeDefined();
  });

  it('should be replaced text', () => {
    expect(replaceText('My name is {{name}}', { name: 'Jhon'})).toBe('My name is Jhon');
  });

  it('should have partially text values', () => {
    expect(replaceText('My name is {{name}} {{last_name}}', { name: 'Jhon'})).toBe('My name is Jhon last_name');
  });

  it('should have orinal text values', () => {
    expect(replaceText('My name is {{name}} {{last_name}}')).toBe('My name is name last_name');
  });

  it('should have empty text', () => {
    expect(replaceText()).toBe('');
    expect(replaceText('')).toBe('');
    expect(replaceText('', {})).toBe('');
  });
});
