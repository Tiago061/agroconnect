"use client";

import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Search, ShoppingCart, Tag, RotateCcw, AlertTriangle, Eye } from 'lucide-react';

export const Catalog: React.FC = () => {
  const {
    navigateTo,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    addToCart
  } = useApp();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filtrar produtos com base em categoria e busca
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
  };

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300">
      {/* Cabeçalho de Busca e Filtros Fixo no Topo do Catálogo */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-20 shadow-sm">
        {/* Input de Busca */}
        <div className="relative flex items-center">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="O que você está procurando?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-100 text-stone-900 placeholder-stone-500 rounded-xl pl-10 pr-10 py-2.5 text-xs border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
          />
          <Search className="absolute left-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3.5 p-1 rounded-full text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scroll Horizontal de Filtros (Chips) */}
        <div className="flex gap-2 overflow-x-auto mt-3 pb-1 scrollbar-none snap-x">
          {/* Opção Todos */}
          <button
            onClick={() => setSelectedCategory('Todos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all snap-center border ${
              selectedCategory === 'Todos'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            Todos
          </button>
          
          {/* Outras Categorias */}
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all snap-center border ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="p-4 flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map(product => {
              const hasDiscount = product.originalPrice !== undefined;
              const isEsgotado = product.status === 'Esgotado';
              const isPoucasUnidades = product.status === 'Poucas Unidades';

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-sm relative transition-opacity duration-300 ${
                    isEsgotado ? 'opacity-70' : 'opacity-100'
                  }`}
                >
                  {/* Selos Adicionais sobre a Imagem */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                    {hasDiscount && (
                      <span className="bg-red-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-md shadow-sm">
                        OFERTA
                      </span>
                    )}
                    {isEsgotado ? (
                      <span className="bg-stone-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-md shadow-sm">
                        ESGOTADO
                      </span>
                    ) : isPoucasUnidades ? (
                      <span className="bg-amber-500 text-emerald-950 font-extrabold text-[8px] px-1.5 py-0.5 rounded-md shadow-sm animate-pulse">
                        ÚLTIMAS UNIDADES
                      </span>
                    ) : null}
                  </div>

                  {/* Imagem do Produto */}
                  <div
                    onClick={() => navigateTo('product-detail', product.id)}
                    className="w-full h-28 relative cursor-pointer overflow-hidden bg-stone-100 border-b border-stone-100"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div onClick={() => navigateTo('product-detail', product.id)} className="cursor-pointer">
                      <span className="text-[9px] font-bold text-stone-400 block uppercase">
                        {product.brand}
                      </span>
                      <h4 className="text-[11px] font-bold text-stone-700 line-clamp-2 mt-0.5 h-8 leading-tight">
                        {product.name}
                      </h4>
                    </div>

                    <div className="mt-2.5">
                      {hasDiscount && product.originalPrice && (
                        <span className="text-[9px] text-stone-400 line-through block leading-none mb-0.5">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs font-black text-emerald-800">
                        R$ {product.price.toFixed(2)}
                      </span>
                      
                      <span className="text-[8px] text-stone-400 block mt-1">
                        Cat: {product.category}
                      </span>
                    </div>

                    {/* Botões de Ação */}
                    <div className="mt-2.5 flex gap-1.5">
                      <button
                        onClick={() => navigateTo('product-detail', product.id)}
                        className="p-1.5 border border-stone-200 rounded-lg text-stone-500 hover:bg-stone-50 active:scale-95 transition-all flex items-center justify-center shrink-0"
                        title="Ver detalhes"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={() => addToCart(product, 1)}
                        disabled={isEsgotado}
                        className={`flex-1 text-[10px] font-extrabold py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 ${
                          isEsgotado
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                            : 'bg-emerald-800 text-white hover:bg-emerald-950'
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white rounded-3xl border border-stone-200 mt-4 shadow-sm animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-stone-800">Nenhum produto encontrado</h3>
            <p className="text-xs text-stone-500 max-w-xs mt-1.5 leading-relaxed">
              Não encontramos resultados para "{searchQuery}" na categoria "{selectedCategory}". Tente usar palavras-chave mais genéricas.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-950 active:scale-95 transition-all flex items-center gap-1.5"
            >
              Limpar Filtros e Busca
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Catalog;
