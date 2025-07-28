
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full text-xl p-4 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 dark:text-white"
        {...props}
      />
    </div>
  );
};

export default Input;
