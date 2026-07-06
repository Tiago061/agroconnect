"use client";

import React from 'react';
import { useApp, ScreenType } from '../context/AppContext';
import { ChevronLeft, ShoppingCart, MessageSquare, Bell } from 'lucide-react';
import Image from 'next/image';

export const Header: React.FC = () => {
  const { currentScreen, navigateTo, cart } = useApp();

  if (currentScreen === 'splash') return null;

  const getScreenTitle = (screen: ScreenType): string => {
    switch (screen) {
      case 'home':
        return 'AgroConnect';
      case 'catalog':
        return 'Catálogo de Produtos';
      case 'product-detail':
        return 'Detalhes do Produto';
      case 'cart':
        return 'Carrinho';
      case 'orders':
        return 'Meus Pedidos';
      case 'profile':
        return 'Perfil';
      case 'contact':
        return 'Fale Conosco';
      case 'promotions':
        return 'Ofertas Especiais';
      default:
        return '';
    }
  };

  const handleBack = () => {
    if (currentScreen === 'product-detail') {
      navigateTo('catalog');
    } else if (currentScreen === 'promotions') {
      navigateTo('home');
    } else if (currentScreen === 'contact') {
      navigateTo('home');
    } else {
      navigateTo('home');
    }
  };

  const isSubScreen = ['product-detail', 'promotions', 'contact'].includes(currentScreen);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 w-full bg-emerald-900 text-white px-4 py-3 flex justify-between items-center shadow-md select-none">
      <div className="flex items-center gap-2">
        {isSubScreen ? (
          <button 
            onClick={handleBack}
            className="p-1 rounded-full hover:bg-emerald-800 transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          currentScreen === 'home' && (
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
              <Image 
                src="/logo.jpg" 
                alt="AgroConnect Logo" 
                fill 
                sizes="32px"
                className="object-cover"
              />
            </div>
          )
        )}
        
        <h1 className="font-bold text-lg tracking-tight">
          {getScreenTitle(currentScreen)}
        </h1>
      </div>

      {/* Botões de Ação Direta no Topo */}
      <div className="flex items-center gap-2">
        {currentScreen !== 'contact' && (
          <button 
            onClick={() => navigateTo('contact')}
            className="p-2 rounded-full hover:bg-emerald-800 transition-colors relative"
            aria-label="Contato"
          >
            <MessageSquare className="w-5 h-5 text-emerald-100" />
          </button>
        )}
        
        {currentScreen !== 'cart' && (
          <button 
            onClick={() => navigateTo('cart')}
            className="p-2 rounded-full hover:bg-emerald-800 transition-colors relative"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-5 h-5 text-emerald-100" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-emerald-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-900 animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
