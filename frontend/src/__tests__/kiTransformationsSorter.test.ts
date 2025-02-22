import { Transformation } from '../interfaces';
import { parseKi, sortTransformationsByKi } from '../utils/kiTransformationsSorter';

describe('Utils functions', () => {
  describe('parseKi', () => {
    it('should convert KI values to numerical format in Billions', () => {
      expect(parseKi('3 Billion')).toBe(3);
      expect(parseKi('6 Trillion')).toBe(6000);
      expect(parseKi('2 Quadrillion')).toBe(2000000);
      expect(parseKi('9 Quintillion')).toBe(9000000000);
      expect(parseKi('7 Sextillion')).toBe(7000000000000);
      expect(parseKi('90 Septillion')).toBe(90000000000000000000);
    });

    it('should return 0 for invalid KI values', () => {
      expect(parseKi('Unknown')).toBe(0);
      expect(parseKi('')).toBe(0);
      expect(parseKi('5')).toBe(0);
    });
  });

  describe('sortTransformationsByKi', () => {
    it('should correctly sort transformations by KI value', () => {
      const transformations: Transformation[] = [
        { id: 1, name: 'Goku SSJ', ki: '3 Billion', image: '' },
        { id: 2, name: 'Goku SSJ2', ki: '6 Billion', image: '' },
        { id: 3, name: 'Goku SSJ3', ki: '24 Billion', image: '' },
        { id: 4, name: 'Goku SSJ4', ki: '2 Quadrillion', image: '' },
        { id: 5, name: 'Goku SSJB', ki: '9 Quintillion', image: '' },
        { id: 6, name: 'Goku Ultra Instinct', ki: '90 Septillion', image: '' },
      ];

      const sorted = sortTransformationsByKi(transformations);
      const sortedNames = sorted.map((t) => t.name);

      expect(sortedNames).toEqual([
        'Goku SSJ',
        'Goku SSJ2',
        'Goku SSJ3',
        'Goku SSJ4',
        'Goku SSJB',
        'Goku Ultra Instinct',
      ]);
    });
  });
});
