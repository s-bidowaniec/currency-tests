import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
    it('should return proper value when good input', () => {
        expect(convertPLNToUSD(1)).toBe('$0.29');
        expect(convertPLNToUSD(2)).toBe('$0.57');
        expect(convertPLNToUSD(20)).toBe('$5.71');
        expect(convertPLNToUSD(12)).toBe('$3.43');
    });
    it('should return NaN value when text input', () => {
        expect(convertPLNToUSD("")).toBeNaN();
        expect(convertPLNToUSD("2")).toBeNaN();
    });
    it('should return NaN value when empty input', () => {
        expect(convertPLNToUSD()).toBeNaN();
    });
    it('should return Error when non Number/String input', () => {
        expect(convertPLNToUSD({test:0})).toBe('Error');
    });
    it('should return $0.00 when input is below 0', () => {
        expect(convertPLNToUSD(-1)).toBe('$0.00');
    });
});