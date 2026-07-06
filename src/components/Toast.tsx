"use client";

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-emerald-900 border-emerald-800 text-white',
          icon: <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-red-950 border-red-900 text-white',
          icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-stone-900 border-stone-800 text-white',
          icon: <Info className="w-5 h-5 text-sky-400 shrink-0" />
        };
    }
  };

  const { bg, icon } = getToastStyles();

  return (
    <div className="absolute top-16 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-lg ${bg} pointer-events-auto`}>
        {icon}
        <p className="text-xs font-semibold leading-normal flex-1">
          {toast.message}
        </p>
        <button
          onClick={hideToast}
          className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
