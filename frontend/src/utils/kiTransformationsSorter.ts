import { Transformation } from '../interfaces';

export const unitMap: Record<string, number> = {
  Billion: 1,
  Trillion: 1_000,
  Quadrillion: 1_000_000,
  Quintillion: 1_000_000_000,
  Sextillion: 1_000_000_000_000,
  Septillion: 1_000_000_000_000_000_000,
};

export const parseKi = (ki: string): number => {
  if (!ki) return 0;

  const match = ki.match(/([\d.]+)\s(\w+)/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase();

  return Math.round(value * (unitMap[unit] ?? 1));
};

export const sortTransformationsByKi = (transformations: Transformation[]) => {
  return [...transformations].sort((a, b) => parseKi(a.ki) - parseKi(b.ki));
};
