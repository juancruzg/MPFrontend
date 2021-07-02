import { formatMoney } from './Format';

describe('Format Money', () => {
    const decimal = 2000.5;

    it ('should format a decimal to money', () => {
        const money = formatMoney(decimal, 2);
    
        expect(money).toBe('2,000.50');
    });

    it ('should not format invalid entry', () => {
        const money = formatMoney(undefined, 2);

        expect(money).toBeNull();
    });

    it ('should not format string entry', () => {
        const money = formatMoney(decimal.toString(), 2);

        expect(money).toBeNull();
    });
});
