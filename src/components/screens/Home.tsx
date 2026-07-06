"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, HOME_BANNERS, CATEGORIES } from '../../data/mockData';
import { Search, ChevronRight, MessageSquare, ShoppingCart, Percent, Award, ShieldCheck } from 'lucide-react';
import * as Icons from 'lucide-react';

// Helper para renderizar os ícones de categoria de forma estática e segura
const CategoryIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'Beef': return <Icons.Beef className={className} />;
    case 'Pill': return <Icons.Pill className={className} />;
    case 'Sprout': return <Icons.Sprout className={className} />;
    case 'Leaf': return <Icons.Leaf className={className} />;
    case 'Wrench': return <Icons.Wrench className={className} />;
    case 'Dog': return <Icons.Dog className={className} />;
    case 'Droplet': return <Icons.Droplet className={className} />;
    case 'Flower': return <Icons.Flower className={className} />;
    default: return <Icons.Grid className={className} />;
  }
};

export const Home: React.FC = () => {
  const { 
    navigateTo, 
    setSelectedCategory, 
    setSearchQuery, 
    addToCart, 
    user 
  } = useApp();

  const [activeBanner, setActiveBanner] = useState(0);
  const [localSearch, setLocalSearch] = useState('');

  // Rotatividade automática suave dos banners
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % HOME_BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setSelectedCategory('Todos');
      navigateTo('catalog');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    navigateTo('catalog');
  };

  // Filtragem de produtos para as vitrines
  // Destaques: produtos em promoção ou de marcas famosas
  const featuredProducts = PRODUCTS.filter(p => p.originalPrice !== undefined).slice(0, 4);
  // Mais vendidos: alguns produtos de alta circulação no estoque
  const topSellerProducts = PRODUCTS.filter(p => p.stock > 10 && p.originalPrice === undefined).slice(0, 4);

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300">
      {/* Bloco de Saudação Superior com Gradiente Verde */}
      <div className="bg-emerald-900 text-white px-4 pt-4 pb-8 rounded-b-[32px] shadow-md">
        <span className="text-xs text-emerald-200/90 font-medium">Bem-vindo ao AgroConnect</span>
        <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
          Olá, {user.name.split(' ')[0]}! 👋
        </h2>
        <p className="text-[10.5px] text-emerald-100/70 mt-0.5">
          Perfil: <span className="font-semibold text-amber-400">{user.clientType}</span>
        </p>

        {/* Barra de Pesquisa */}
        <form onSubmit={handleSearchSubmit} className="mt-4 relative flex items-center">
          <input
            type="text"
            placeholder="Pesquisar rações, sementes, adubos..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-emerald-100/60 rounded-2xl pl-11 pr-4 py-3 text-xs border border-white/20 focus:bg-white focus:text-stone-900 focus:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 shadow-inner"
          />
          <Search className="absolute left-4 w-4 h-4 text-emerald-100/80 pointer-events-none" />
          {localSearch && (
            <button 
              type="submit" 
              className="absolute right-3 bg-amber-500 text-emerald-950 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm"
            >
              Ir
            </button>
          )}
        </form>
      </div>

      {/* Margem negativa para o banner entrar no bloco verde */}
      <div className="px-4 -mt-5">
        {/* Banner Promocional Rotativo */}
        <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-lg bg-stone-900 border border-white/10">
          {HOME_BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 p-5 bg-gradient-to-r ${banner.colorClass} flex flex-col justify-between transition-opacity duration-700 ${
                index === activeBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="max-w-[70%]">
                <span className="bg-amber-400 text-emerald-950 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full inline-block mb-1 shadow-sm">
                  {banner.discount}
                </span>
                <h3 className="text-sm font-black leading-tight tracking-tight">{banner.title}</h3>
                <p className="text-[10px] text-white/80 line-clamp-1 mt-0.5">{banner.subtitle}</p>
              </div>

              <button
                onClick={() => {
                  if (banner.targetCategory) {
                    handleCategoryClick(banner.targetCategory);
                  } else {
                    navigateTo('promotions');
                  }
                }}
                className="self-start bg-white text-emerald-900 hover:bg-emerald-50 px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold shadow-md flex items-center gap-1 active:scale-95 transition-all"
              >
                {banner.buttonText}
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Dots Indicadores de Banner */}
          <div className="absolute bottom-3 right-4 z-20 flex gap-1">
            {HOME_BANNERS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeBanner ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categorias Rápidas */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-stone-700">Categorias</h3>
          <button 
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
              navigateTo('catalog');
            }} 
            className="text-[11px] font-bold text-emerald-700 flex items-center"
          >
            Ver tudo
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scroll Horizontal de Categorias */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 snap-center shrink-0"
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center border shadow-sm transition-all active:scale-95 active:shadow-inner`}>
                <CategoryIcon name={cat.iconName} className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-[10.5px] font-bold text-stone-600 tracking-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Seção Destaques Semanais */}
      <div className="mt-6">
        <div className="flex justify-between items-center px-4 mb-3">
          <div className="flex items-center gap-1.5">
            <Percent className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-700">Ofertas da Semana</h3>
          </div>
          <button 
            onClick={() => navigateTo('promotions')} 
            className="text-[11px] font-bold text-emerald-700 flex items-center"
          >
            Mais ofertas
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid de Destaques Horizontal */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-3 scrollbar-none snap-x">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="w-40 bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shrink-0 snap-center shadow-sm relative"
            >
              {/* Badge de Oferta */}
              <div className="absolute top-2 left-2 z-10 bg-red-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                OFERTA
              </div>

              {/* Imagem */}
              <div 
                onClick={() => navigateTo('product-detail', product.id)}
                className="w-full h-28 relative cursor-pointer overflow-hidden bg-stone-100"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Detalhes */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div onClick={() => navigateTo('product-detail', product.id)} className="cursor-pointer">
                  <span className="text-[9px] font-bold text-stone-400 block uppercase">{product.brand}</span>
                  <h4 className="text-[11px] font-bold text-stone-700 line-clamp-2 mt-0.5 h-8 leading-tight">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-2 flex flex-col">
                  {product.originalPrice && (
                    <span className="text-[9px] text-stone-400 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-black text-emerald-700">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                {/* Botão de Ação Rápida */}
                <button
                  onClick={() => addToCart(product, 1)}
                  className="mt-2 w-full bg-emerald-800 text-white text-[10px] font-extrabold py-1.5 rounded-xl shadow-sm hover:bg-emerald-950 active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Mais Vendidos */}
      <div className="mt-4">
        <div className="flex justify-between items-center px-4 mb-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-4.5 h-4.5 text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-700">Mais Procurados</h3>
          </div>
          <button 
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
              navigateTo('catalog');
            }} 
            className="text-[11px] font-bold text-emerald-700 flex items-center"
          >
            Ver catálogo
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scroll Horizontal Mais Vendidos */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-3 scrollbar-none snap-x">
          {topSellerProducts.map(product => (
            <div
              key={product.id}
              className="w-40 bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shrink-0 snap-center shadow-sm"
            >
              {/* Imagem */}
              <div 
                onClick={() => navigateTo('product-detail', product.id)}
                className="w-full h-28 relative cursor-pointer overflow-hidden bg-stone-100"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Detalhes */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div onClick={() => navigateTo('product-detail', product.id)} className="cursor-pointer">
                  <span className="text-[9px] font-bold text-stone-400 block uppercase">{product.brand}</span>
                  <h4 className="text-[11px] font-bold text-stone-700 line-clamp-2 mt-0.5 h-8 leading-tight">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-2 flex flex-col">
                  <span className="text-xs font-black text-emerald-700">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="text-[8px] font-semibold text-emerald-600 bg-emerald-50 self-start px-1.5 py-0.5 rounded-md mt-1">
                    Estoque: {product.stock} un
                  </span>
                </div>

                {/* Botão de Ação Rápida */}
                <button
                  onClick={() => addToCart(product, 1)}
                  className="mt-2.5 w-full bg-emerald-800 text-white text-[10px] font-extrabold py-1.5 rounded-xl shadow-sm hover:bg-emerald-950 active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selo de Confiança */}
      <div className="mx-4 mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
        <ShieldCheck className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-emerald-900">Compra 100% Garantida</h4>
          <p className="text-[10px] text-emerald-700/80 leading-relaxed mt-0.5">
            Solicite o orçamento do seu lote de insumos pelo aplicativo. Nossa equipe de agrônomos analisa e valida as melhores condições e envia a cotação diretamente no seu celular.
          </p>
        </div>
      </div>

      {/* Botão Flutuante do WhatsApp */}
      <button
        onClick={() => {
          const text = encodeURIComponent("Olá! Estou usando o AgroConnect Mobile e gostaria de tirar uma dúvida sobre produtos da agropecuária.");
          window.open(`https://api.whatsapp.com/send?phone=5516991234567&text=${text}`, '_blank');
        }}
        className="fixed bottom-20 right-4 md:right-auto md:left-[calc(50%+120px)] z-40 bg-green-500 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:bg-green-600 active:scale-90 transition-all flex items-center justify-center cursor-pointer border-2 border-white"
        aria-label="Fale Conosco no WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
};
export default Home;
