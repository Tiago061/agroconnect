"use client";

import React from 'react';
import { useApp } from '../context/AppContext';

interface FrameProps {
  children: React.ReactNode;
}

export const Frame: React.FC<FrameProps> = ({ children }) => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-green-950 p-0 md:p-6 overflow-hidden">
      {/* Decorações do agronegócio de fundo no desktop */}
      <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-500 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-green-500 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-amber-500 blur-3xl" />
      </div>

      {/* Título de Apresentação no Desktop */}
      <div className="hidden lg:flex flex-col text-white max-w-xs xl:max-w-md mr-12 select-none z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <span className="font-bold text-white text-xl">AC</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-green-200 bg-clip-text text-transparent">AgroConnect</h1>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Plataforma Mobile</span>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-white leading-tight mb-4">
          Tudo para o campo na palma da sua mão.
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed mb-6">
          Experimente nossa interface mobile-first de alta performance. Desenvolvida para carregar rapidamente em WebViews de celulares Android e iOS, mesmo em conexões lentas de áreas rurais.
        </p>
        <div className="flex flex-col gap-3 text-stone-400 text-xs border-l-2 border-emerald-500/50 pl-4 py-1">
          <div>📱 Modo Responsivo WebView Ativado</div>
          <div>⚡ Estado Global e Transições Instantâneas</div>
          <div>💬 Integração Direta com WhatsApp</div>
        </div>
      </div>

      {/* Container do Dispositivo */}
      <div className="relative w-full h-screen md:w-[390px] md:h-[844px] md:rounded-[48px] bg-stone-100 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] md:border-[10px] md:border-stone-800 flex flex-col overflow-hidden z-10 transition-all duration-300">
        {/* Câmera Notch Simulada (Apenas Desktop) */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-stone-800 rounded-b-2xl z-50 items-center justify-center gap-1.5 px-3">
          {/* Lente da Câmera */}
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800/20" />
          {/* Sensor de Proximidade */}
          <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
          {/* Alto-falante */}
          <div className="w-12 h-1 bg-stone-900 rounded-full ml-auto" />
        </div>

        {/* Barra de Status do Celular Simulada */}
        <div className={`w-full px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold select-none z-40 ${
          currentScreen === 'splash' 
            ? 'bg-transparent text-emerald-950' 
            : 'bg-emerald-900 text-emerald-100 border-b border-emerald-950/20'
        } transition-colors duration-300`}>
          <span>9:41 AM</span>
          <div className="flex items-center gap-1.5">
            {/* Ícones de status: rede, wifi, bateria */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.58 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-8h2v5h-2zm0-3h2v2h-2z" />
            </svg>
            <div className="flex gap-0.5 items-end h-2.5 w-4">
              <div className="w-0.5 h-1 bg-current rounded-sm" />
              <div className="w-0.5 h-1.5 bg-current rounded-sm" />
              <div className="w-0.5 h-2 bg-current rounded-sm" />
              <div className="w-0.5 h-2.5 bg-current rounded-sm" />
            </div>
            <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-current rounded-xs" />
            </div>
          </div>
        </div>

        {/* Área de Conteúdo do Aplicativo */}
        <div className="flex-1 flex flex-col overflow-y-auto relative bg-[#F7F5F0]">
          {children}
        </div>

        {/* Linha Inferior do Dispositivo Simulando Gesto Home (Apenas Desktop) */}
        <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-800 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};
