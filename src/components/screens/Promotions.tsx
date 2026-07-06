"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/mockData';
import { Percent, ShoppingCart, Calendar, Flame, AlertCircle } from 'lucide-react';

export const Promotions: React.FC = () => {
  const { navigateTo, addToCart } = useApp();
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 5 });

  // Cronômetro regressivo simulado para urgência
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reinicia para demonstração
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filtrar apenas produtos que possuem preço original (estão em promoção)
  const promotionalProducts = PRODUCTS.filter(p => p.originalPrice !== undefined);

  // Formatar número com dois dígitos
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300 bg-stone-50">
      
      {/* Banner de Campanha Especial */}
      <div className="bg-gradient-to-r from-red-700 via-amber-600 to-orange-600 text-white p-5 rounded-b-[28px] shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="max-w-[75%] z-10">
          <span className="bg-white/20 text-white font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-sm">
            Festa do Campo
          </span>
          <h2 className="text-base font-black leading-snug uppercase tracking-tight">Super Saldão AgroConnect</h2>
          <p className="text-[10px] text-red-50/90 leading-relaxed mt-1">
            As melhores ofertas em rações, medicamentos e insumos agrícolas da região. Estoque limitado!
          </p>
        </div>

        {/* Timer de Urgência */}
        <div className="mt-4 flex items-center gap-2 bg-black/25 self-start rounded-xl px-3 py-1.5 border border-white/10 z-10">
          <Flame className="w-4 h-4 text-amber-300 fill-current animate-bounce" />
          <span className="text-[9.5px] font-bold text-amber-200">
            Ofertas expiram em:
          </span>
          <span className="text-xs font-black text-white tracking-widest">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </span>
        </div>

        <Percent className="w-32 h-32 text-white/5 absolute -bottom-10 -right-5 transform rotate-45" />
      </div>

      {/* Grid de Ofertas */}
      <div className="p-4 flex-1 flex flex-col gap-4">
        
        <div className="flex items-center gap-1.5">
          <Flame className="w-5 h-5 text-red-600 fill-red-100" />
          <h3 className="text-xs font-black uppercase tracking-wider text-stone-600">Destaques com Desconto</h3>
        </div>

        <div className="flex flex-col gap-3.5">
          {promotionalProducts.map(product => {
            const hasDiscount = product.originalPrice !== undefined;
            const original = product.originalPrice || product.price;
            const discountPct = Math.round(((original - product.price) / original) * 100);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col relative"
              >
                {/* Selo de Desconto Lateral */}
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded-lg shadow-sm">
                  -{discountPct}% OFF
                </div>

                <div className="flex gap-3.5 p-3">
                  {/* Imagem do Produto */}
                  <div
                    onClick={() => navigateTo('product-detail', product.id)}
                    className="w-24 h-24 rounded-xl overflow-hidden bg-stone-150 shrink-0 border border-stone-100 cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div onClick={() => navigateTo('product-detail', product.id)} className="cursor-pointer">
                      <span className="text-[9px] font-bold text-stone-400 block uppercase">
                        {product.brand}
                      </span>
                      <h4 className="text-[11.5px] font-bold text-stone-750 line-clamp-2 mt-0.5 leading-snug">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <span className="text-[9.5px] text-stone-400 line-through block leading-none mb-0.5">
                          R$ {original.toFixed(2)}
                        </span>
                        <span className="text-xs font-black text-red-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Botão de Adicionar rápido */}
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-red-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm hover:bg-red-750 active:scale-95 transition-all flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Adicionar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rodapé do Card com Data de Validade */}
                {product.promotionValidUntil && (
                  <div className="bg-red-50/50 border-t border-stone-100 px-3 py-2 flex items-center gap-1.5 text-[9px] font-bold text-red-800">
                    <Calendar className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Oferta válida até {product.promotionValidUntil} ou enquanto durar o estoque.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner Informativo sobre luz solar e uso no campo */}
        <div className="bg-[#FAF9F5] border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 mt-2 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-stone-700">Aviso para compras no campo</h4>
            <p className="text-[10px] text-stone-500 leading-normal mt-0.5">
              Nossa interface foi otimizada para uso sob luz forte de sol. Aumente o brilho do seu celular se estiver visualizando o catálogo ao ar livre!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Promotions;
