
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BloodPressureReading, BPLevel } from '../types';
import { getBPLevel } from '../utils/bloodPressureUtils';
import { BP_LEVELS_CONFIG } from '../constants';
import { formatTime, formatDate } from '../utils/dateUtils';
import { TimeRange } from '../types';

interface BloodPressureChartProps {
  data: BloodPressureReading[];
  timeRange: TimeRange;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data: BloodPressureReading = payload[0].payload;
    const level = getBPLevel(data.systolic, data.diastolic);
    const levelConfig = BP_LEVELS_CONFIG[level];
    
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="font-bold text-slate-800 dark:text-white">{formatDate(label)} - {formatTime(label)}</p>
        <p className="text-blue-600 dark:text-blue-400">{`Sistólica: ${payload[0].value} mmHg`}</p>
        <p className="text-teal-600 dark:text-teal-400">{`Diastólica: ${payload[1].value} mmHg`}</p>
        <p className="text-red-500">{`Ritmo Cardíaco: ${payload[2].value} ppm`}</p>
        <p className={`${levelConfig.color} font-semibold mt-2`}>{level}</p>
      </div>
    );
  }

  return null;
};

const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ data, timeRange }) => {
    
  if (data.length === 0) {
    return (
        <div className="flex items-center justify-center h-80 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <p className="text-xl text-slate-500">No hay datos para mostrar en este período.</p>
        </div>
    );
  }

  const chartData = data.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const tickFormatter = (tick: string) => {
    if (timeRange === 'day') return formatTime(tick);
    return formatDate(tick);
  }
  
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
          <XAxis 
            dataKey="date" 
            tickFormatter={tickFormatter} 
            stroke="rgb(100 116 139)"
            angle={-20}
            textAnchor="end"
            height={50}
            />
          <YAxis yAxisId="left" stroke="rgb(100 116 139)" domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '40px' }}/>
          <Line yAxisId="left" type="monotone" dataKey="systolic" name="Sistólica" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line yAxisId="left" type="monotone" dataKey="diastolic" name="Diastólica" stroke="#14b8a6" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line yAxisId="left" type="monotone" dataKey="heartRate" name="Ritmo Cardíaco" stroke="#ef4444" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodPressureChart;
