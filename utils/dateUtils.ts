
import { BloodPressureReading, TimeRange } from '../types';

export const filterReadingsByTimeRange = (readings: BloodPressureReading[], range: TimeRange): BloodPressureReading[] => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (range) {
    case 'day':
      return readings.filter(r => new Date(r.date) >= startOfDay);
    case 'week':
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfDay.getDate() - now.getDay());
      return readings.filter(r => new Date(r.date) >= startOfWeek);
    case 'month':
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return readings.filter(r => new Date(r.date) >= startOfMonth);
    case 'year':
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return readings.filter(r => new Date(r.date) >= startOfYear);
    case 'all':
    default:
      return readings;
  }
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
};
