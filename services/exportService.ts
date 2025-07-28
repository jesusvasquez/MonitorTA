
import { toPng } from 'html-to-image';
import { BloodPressureReading } from '../types';
import { formatDate } from '../utils/dateUtils';

export const exportReadingsToCSV = (readings: BloodPressureReading[]) => {
  const headers = "Fecha,Hora,Sistólica (mmHg),Diastólica (mmHg),Ritmo Cardíaco (ppm),Peso (kg),Altura (cm)";
  const rows = readings.map(r => {
    const date = new Date(r.date);
    return [
      date.toLocaleDateString('es-ES'),
      date.toLocaleTimeString('es-ES'),
      r.systolic,
      r.diastolic,
      r.heartRate,
      r.weight ?? '',
      r.height ?? ''
    ].join(',');
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "historial_tension_arterial.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const exportElementAsPNG = (element: HTMLElement, fileName: string) => {
  toPng(element, { 
    cacheBust: true, 
    backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#f8fafc' 
  })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error('Error al exportar el gráfico:', err);
      alert('Hubo un error al exportar el gráfico. Por favor, intente de nuevo.');
    });
};
