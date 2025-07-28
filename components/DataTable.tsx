import React from 'react';
import { BloodPressureReading } from '../types';
import { getBPLevel } from '../utils/bloodPressureUtils';
import { BP_LEVELS_CONFIG } from '../constants';
import { formatDate, formatTime } from '../utils/dateUtils';

interface DataTableProps {
  data: BloodPressureReading[];
  onEdit: (reading: BloodPressureReading) => void;
  onDelete: (readingId: string) => void;
}

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  if (data.length === 0) {
    return null; // El chart ya muestra un mensaje, no necesitamos duplicarlo
  }

  const sortedData = data.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-700 ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-slate-900 dark:text-white sm:pl-6">Fecha</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-slate-900 dark:text-white">Presión (SYS/DIA)</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-slate-900 dark:text-white">Ritmo Cardíaco</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-slate-900 dark:text-white">Nivel</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-slate-900 dark:text-white">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800/50">
                {sortedData.map((reading) => {
                  const level = getBPLevel(reading.systolic, reading.diastolic);
                  const levelConfig = BP_LEVELS_CONFIG[level];
                  return (
                    <tr key={reading.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-slate-800 dark:text-slate-200 sm:pl-6">
                        {formatDate(reading.date)} <span className="text-slate-500">{formatTime(reading.date)}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg text-slate-600 dark:text-slate-300">
                        <span className="font-bold">{reading.systolic}</span> / {reading.diastolic}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg text-slate-600 dark:text-slate-300">{reading.heartRate} ppm</td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg">
                        <span className={`inline-flex items-center rounded-md px-3 py-1 font-medium ${levelConfig.bgColor} ${levelConfig.color}`}>
                          {level}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg">
                          <button onClick={() => onEdit(reading)} aria-label="Editar" className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                              <EditIcon/>
                          </button>
                          <button 
                            onClick={() => {
                                if (window.confirm('¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.')) {
                                    onDelete(reading.id);
                                }
                            }} 
                            aria-label="Eliminar" 
                            className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors ml-2"
                          >
                              <DeleteIcon/>
                          </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;