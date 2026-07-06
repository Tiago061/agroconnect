"use client";

import React from 'react';
import { useApp, ScreenType } from '../context/AppContext';
import { Home, BookOpen, ShoppingCart, ClipboardList, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo, cart } = useApp();

  if (currentScreen === 'splash') return null;

  const navItems = [
    { screen: 'home' as ScreenType, label: 'Início', icon: Home },
    { screen: 'catalog' as ScreenType, label: 'Catálogo', icon: BookOpen },
    { screen: 'cart' as ScreenType, label: 'Carrinho', icon: ShoppingCart, badge: true },
    { screen: 'orders' as ScreenType, label: 'Pedidos', icon: ClipboardList },
    { screen: 'profile' as ScreenType, label: 'Perfil', icon: User },
  ];

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="w-full bg-white border-t border-stone-200 px-2 py-1 pb-2 flex justify-around items-center sticky bottom-0 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] select-none">
      {navItems.map(item => {
        const Icon = item.icon;
        // Considerar a tela de detalhes de produto e promoções/contato na aba correspondente
        const isActive = 
          currentScreen === item.screen || 
          (item.screen === 'catalog' && currentScreen === 'product-detail') ||
          (item.screen === 'home' && (currentScreen === 'promotions' || currentScreen === 'contact'));

        return (
          <button
            key={item.screen}
            onClick={() => navigateTo(item.screen)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 active:scale-95 flex-1 relative ${
              isActive 
                ? 'text-emerald-800 font-bold bg-emerald-50/50' 
                : 'text-stone-500 font-medium hover:text-emerald-700'
            }`}
          >
            {/* Ícone */}
            <div className="relative">
              <Icon className={`w-5.5 h-5.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              
              {/* Badge de quantidade no Carrinho */}
              {item.badge && cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-emerald-950 font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartItemsCount}
                </span>
              )}
            </div>
            
            {/* Texto do menu */}
            <span className="text-[10px] mt-1 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
