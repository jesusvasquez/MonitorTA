
import { BPLevel } from '../types';

export const getBPLevel = (systolic: number, diastolic: number): BPLevel => {
  if (systolic > 180 || diastolic > 120) return BPLevel.CRISIS;
  if (systolic >= 140 || diastolic >= 90) return BPLevel.HIGH_2;
  if (systolic >= 130 || diastolic >= 80) return BPLevel.HIGH_1;
  if (systolic >= 120) return BPLevel.ELEVATED;
  if (systolic < 120 && diastolic < 80) return BPLevel.NORMAL;
  return BPLevel.UNKNOWN;
};
