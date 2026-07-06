"use client";

import React from 'react';
import { useApp } from '../context/AppContext';
import { Frame } from './Frame';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Toast } from './Toast';

// Importação das telas individuais
import Splash from './screens/Splash';
import Home from './screens/Home';
import Catalog from './screens/Catalog';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Orders from './screens/Orders';
import Profile from './screens/Profile';
import Contact from './screens/Contact';
import Promotions from './screens/Promotions';

export const AppShell: React.FC = () => {
  const { currentScreen } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <Splash />;
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile />;
      case 'contact':
        return <Contact />;
      case 'promotions':
        return <Promotions />;
      default:
        return <Home />;
    }
  };

  return (
    <Frame>
      <Header />
      <Toast />
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        {renderActiveScreen()}
      </main>
      <BottomNav />
    </Frame>
  );
};
export default AppShell;
