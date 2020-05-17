const monetization = require('../../../../src/helpers/sanitizers/monetization');

describe('Helpers Sanitizers Monetization', () => {
  it('should be defined', () => {
    expect(monetization).toBeDefined();
    expect(monetization.demonetization).toBeDefined();
  });

  it('should demonetize values to Int', () => {
    expect(monetization.demonetization('R$ 200,00')).toBe(20000);
    expect(monetization.demonetization('R$ 100,00')).toBe(10000);

    expect(monetization.demonetization('$ 200,00')).toBe(20000);
    expect(monetization.demonetization('$ 100,00')).toBe(10000);

    expect(monetization.demonetization('R$ 1.000,00')).toBe(100000);
    expect(monetization.demonetization('$ 1.000,00')).toBe(100000);

    expect(monetization.demonetization('1.000,00')).toBe(100000);
    expect(monetization.demonetization('100000')).toBe(100000);

    expect(monetization.demonetization()).toBe(0);
    expect(monetization.demonetization(null)).toBe(0);
    expect(monetization.demonetization(undefined)).toBe(0);
  });
});
