import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { BloodPressureReading, Theme, View } from './types';
import Header from './components/Header';
import DataEntryForm from './components/DataEntryForm';
import HistoryView from './components/HistoryView';
import Button from './components/ui/Button';

const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [view, setView] = useState<View>('entry');
  const [readings, setReadings] = useLocalStorage<BloodPressureReading[]>('bpReadings', []);
  const [editingReading, setEditingReading] = useState<BloodPressureReading | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleSaveReading = (newReading: BloodPressureReading) => {
    setReadings(prevReadings => [...prevReadings, newReading]);
  };
  
  const handleUpdateReading = (updatedReading: BloodPressureReading) => {
    setReadings(prevReadings => prevReadings.map(r => r.id === updatedReading.id ? updatedReading : r));
    setEditingReading(null);
    setView('history');
  };

  const handleDeleteReading = (readingId: string) => {
    setReadings(prevReadings => prevReadings.filter(r => r.id !== readingId));
  };
  
  const handleStartEdit = (reading: BloodPressureReading) => {
    setEditingReading(reading);
    setView('entry');
  };
  
  const handleCancelEdit = () => {
    setEditingReading(null);
    setView('history');
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <div className="container mx-auto max-w-5xl px-4 pb-12">
        <Header theme={theme} setTheme={setTheme} />
        <main>
          <nav className="flex justify-center my-8 gap-4">
              <Button 
                onClick={() => {
                  setView('entry')
                  setEditingReading(null); // Asegurarse de limpiar la edición al cambiar de vista manualmente
                }} 
                variant={view === 'entry' ? 'primary' : 'secondary'}
                className="w-1/2 md:w-auto"
              >
                  Registrar Lectura
              </Button>
              <Button 
                onClick={() => setView('history')} 
                variant={view === 'history' ? 'primary' : 'secondary'}
                className="w-1/2 md:w-auto"
              >
                  Historial y Progreso
              </Button>
          </nav>

          <div className="transition-opacity duration-300">
            {view === 'entry' && (
              <DataEntryForm 
                onSave={editingReading ? handleUpdateReading : handleSaveReading}
                readingToEdit={editingReading}
                onCancelEdit={editingReading ? handleCancelEdit : undefined}
              />
            )}
            {view === 'history' && (
              <HistoryView 
                readings={readings}
                onEdit={handleStartEdit}
                onDelete={handleDeleteReading}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;