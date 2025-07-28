
import { BPLevel } from './types';

export const BP_LEVELS_CONFIG = {
  [BPLevel.NORMAL]: {
    color: 'text-bp_normal',
    bgColor: 'bg-bp_normal/10',
    dotColor: 'fill-bp_normal',
  },
  [BPLevel.ELEVATED]: {
    color: 'text-bp_elevated',
    bgColor: 'bg-bp_elevated/10',
    dotColor: 'fill-bp_elevated',
  },
  [BPLevel.HIGH_1]: {
    color: 'text-bp_high_1',
    bgColor: 'bg-bp_high_1/10',
    dotColor: 'fill-bp_high_1',
  },
  [BPLevel.HIGH_2]: {
    color: 'text-bp_high_2',
    bgColor: 'bg-bp_high_2/10',
    dotColor: 'fill-bp_high_2',
  },
  [BPLevel.CRISIS]: {
    color: 'text-bp_crisis',
    bgColor: 'bg-bp_crisis/10',
    dotColor: 'fill-bp_crisis',
  },
  [BPLevel.UNKNOWN]: {
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
    dotColor: 'fill-slate-500',
  },
};
