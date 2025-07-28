import React, { useState, useRef, useMemo } from 'react';
import { BloodPressureReading, TimeRange } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import BloodPressureChart from './BloodPressureChart';
import DataTable from './DataTable';
import { filterReadingsByTimeRange } from '../utils/dateUtils';
import { exportReadingsToCSV, exportElementAsPNG } from '../services/exportService';

interface HistoryViewProps {
  readings: BloodPressureReading[];
  onEdit: (reading: BloodPressureReading) => void;
  onDelete: (readingId: string) => void;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const HistoryView: React.FC<HistoryViewProps> = ({ readings, onEdit, onDelete }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const chartRef = useRef<HTMLDivElement>(null);

  const filteredReadings = useMemo(() => filterReadingsByTimeRange(readings, timeRange), [readings, timeRange]);

  const timeRanges: { id: TimeRange; label: string }[] = [
    { id: 'day', label: 'Día' },
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'year', label: 'Año' },
    { id: 'all', label: 'Todo' },
  ];

  const handleExportChart = () => {
    if (chartRef.current) {
      exportElementAsPNG(chartRef.current, 'grafico_tension_arterial');
    }
  };

  const handleExportCSV = () => {
    exportReadingsToCSV(filteredReadings);
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Historial y Progreso</h2>
        <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-xl flex items-center gap-1">
          {timeRanges.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTimeRange(id)}
              className={`text-base font-semibold px-4 py-2 rounded-lg transition-colors duration-300 ${
                timeRange === id 
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-900/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div ref={chartRef} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
        <BloodPressureChart data={filteredReadings} timeRange={timeRange} />
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <Button onClick={handleExportCSV} variant="secondary" disabled={filteredReadings.length === 0}>
            <DownloadIcon />
            Descargar Datos (CSV)
        </Button>
        <Button onClick={handleExportChart} variant="secondary" disabled={filteredReadings.length === 0}>
            <DownloadIcon />
            Descargar Gráfico (PNG)
        </Button>
      </div>

      <DataTable data={filteredReadings} onEdit={onEdit} onDelete={onDelete} />
    </Card>
  );
};

export default HistoryView;