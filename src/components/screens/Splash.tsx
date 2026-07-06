"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import Image from 'next/image';

export const Splash: React.FC = () => {
  const { navigateTo } = useApp();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Inicia a animação de pulso e depois navega para a home
    setAnimating(true);
    const timer = setTimeout(() => {
      navigateTo('home');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between py-16 px-6 bg-gradient-to-b from-[#EAE7DC] via-white to-[#D2E8D4] select-none overflow-hidden">
      {/* Detalhe estético no topo */}
      <div className="w-24 h-1 bg-emerald-800/10 rounded-full" />

      {/* Bloco Central da Logo */}
      <div className={`flex flex-col items-center text-center transition-all duration-1000 transform ${
        animating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
      }`}>
        {/* Logo Container com Sombra Suave e Borda de Vidro */}
        <div className="relative w-36 h-36 rounded-[36px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(19,59,44,0.15)] border-4 border-white mb-6 animate-pulse">
          <Image
            src="/logo.jpg"
            alt="AgroConnect Logo"
            fill
            sizes="144px"
            className="object-cover"
            priority
          />
        </div>

        {/* Nome */}
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-950">
          Agro<span className="text-emerald-700">Connect</span>
        </h1>
        <span className="text-xs uppercase font-bold tracking-widest text-stone-500 mt-1">
          Mobile App
        </span>
      </div>

      {/* Frase sugerida e Carregador */}
      <div className="flex flex-col items-center max-w-xs text-center">
        <p className="text-stone-600 text-sm font-medium italic mb-8 leading-relaxed">
          “Tudo para o campo na palma da sua mão.”
        </p>

        {/* Indicador de Carregamento Estilizado */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full overflow-hidden relative">
          <div className="h-full bg-emerald-700 rounded-full absolute top-0 left-0 w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>
      </div>

      {/* Estilo embutido para animação de barra de progresso */}
      <style jsx>{`
        @keyframes loading {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};
export default Splash;
