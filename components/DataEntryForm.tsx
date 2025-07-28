import React, { useState, useEffect } from 'react';
import { BloodPressureReading } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

interface DataEntryFormProps {
  onSave: (reading: BloodPressureReading) => void;
  readingToEdit?: BloodPressureReading | null;
  onCancelEdit?: () => void;
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onSave, readingToEdit, onCancelEdit }) => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isEditing = !!readingToEdit;

  useEffect(() => {
    if (isEditing && readingToEdit) {
      setSystolic(String(readingToEdit.systolic));
      setDiastolic(String(readingToEdit.diastolic));
      setHeartRate(String(readingToEdit.heartRate));
      setWeight(String(readingToEdit.weight ?? ''));
      setHeight(String(readingToEdit.height ?? ''));
      setSuccessMessage('');
    }
  }, [readingToEdit, isEditing]);
  
  const clearForm = () => {
    setSystolic('');
    setDiastolic('');
    setHeartRate('');
    setWeight('');
    setHeight('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const readingData: BloodPressureReading = {
      id: isEditing ? readingToEdit.id : new Date().toISOString(),
      date: isEditing ? readingToEdit.date : new Date().toISOString(), // Mantiene la fecha original en edición
      systolic: parseInt(systolic, 10),
      diastolic: parseInt(diastolic, 10),
      heartRate: parseInt(heartRate, 10),
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? parseFloat(height) : undefined,
    };
    onSave(readingData);
    
    if (!isEditing) {
      clearForm();
      setSuccessMessage('¡Lectura guardada con éxito!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
        {isEditing ? 'Editar Lectura' : 'Registrar Nueva Lectura'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="systolic" label="Sistólica (mmHg)" type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} required min="50" max="300" />
          <Input id="diastolic" label="Diastólica (mmHg)" type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} required min="30" max="200" />
        </div>
        <Input id="heartRate" label="Ritmo Cardíaco (ppm)" type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} required min="30" max="250" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="weight" label="Peso (kg) (Opcional)" type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} min="20" max="300" />
          <Input id="height" label="Altura (cm) (Opcional)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} min="100" max="250" />
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button type="submit" className="w-full sm:w-auto">
                {isEditing ? 'Actualizar Lectura' : 'Guardar Lectura'}
            </Button>
            {isEditing && (
                <Button type="button" onClick={onCancelEdit} variant="secondary" className="w-full sm:w-auto">
                    Cancelar
                </Button>
            )}
        </div>
        {successMessage && (
            <p className="mt-4 text-center text-lg text-green-600 dark:text-green-400">{successMessage}</p>
        )}
      </form>
    </Card>
  );
};

export default DataEntryForm;