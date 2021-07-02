import { formatMoney } from './Format';

describe('Format Money', () => {
    const decimmal = 2000.5;

    it ('should format a decimal to money', () => {
        const money = formatMoney(decimmal, 2);
    
        expect(money).toBe('2,000.50');
    });

    it ('should not format invalid entry', () => {
        const money = formatMoney(undefined, 2);

        expect(money).toBeNull();
    });
});
