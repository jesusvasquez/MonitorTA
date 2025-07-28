
export interface BloodPressureReading {
  id: string;
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  weight?: number;
  height?: number;
}

export enum BPLevel {
  NORMAL = 'Normal',
  ELEVATED = 'Elevada',
  HIGH_1 = 'Hipertensión (Etapa 1)',
  HIGH_2 = 'Hipertensión (Etapa 2)',
  CRISIS = 'Crisis Hipertensiva',
  UNKNOWN = 'Desconocido'
}

export type Theme = 'light' | 'dark';

export type View = 'entry' | 'history';

export type TimeRange = 'day' | 'week' | 'month' | 'year' | 'all';
