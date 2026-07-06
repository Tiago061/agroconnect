"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, Product } from '../../data/mockData';
import { ShoppingCart, MessageSquare, ShieldAlert, BadgeInfo, Check, Plus, Minus, ArrowLeft, ArrowUpRight } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { selectedProductId, navigateTo, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  // Garantir que a quantidade volte a ser 1 ao trocar de produto
  useEffect(() => {
    setQuantity(1);
  }, [selectedProductId]);

  const product = PRODUCTS.find(p => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-base font-bold text-stone-800">Produto não encontrado</h3>
        <p className="text-xs text-stone-500 mt-2 max-w-xs leading-relaxed">
          O produto que você tentou acessar não foi localizado ou não está mais disponível no catálogo.
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-6 bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm"
        >
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  const isEsgotado = product.status === 'Esgotado';
  const isPoucasUnidades = product.status === 'Poucas Unidades';
  const hasDiscount = product.originalPrice !== undefined;

  // Filtrar 3 produtos relacionados da mesma categoria (excluindo o atual)
  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const incrementQty = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleWhatsAppSingleRequest = () => {
    const text = `*Orçamento de Produto - AgroConnect*\n\nGostaria de solicitar orçamento para o produto:\n• *${product.name}*\nMarca: ${product.brand}\nQuantidade: ${quantity} unidade(s)\nPreço Unitário: R$ ${product.price.toFixed(2)}\nTotal Estimado: R$ ${(product.price * quantity).toFixed(2)}\n\nPor favor, confirmem a disponibilidade para entrega/retirada.`;
    const formattedPhone = '5516991234567';
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300">
      {/* Botão Voltar Flutuante/Fixo */}
      <div className="bg-white px-4 py-2 border-b border-stone-200 flex items-center gap-2">
        <button 
          onClick={() => navigateTo('catalog')}
          className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-emerald-700 py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </button>
      </div>

      {/* Imagem do Produto */}
      <div className="w-full h-64 bg-stone-100 relative border-b border-stone-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges de Destaque na Imagem */}
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          {hasDiscount && (
            <span className="bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow-md">
              OFERTA
            </span>
          )}
          {isEsgotado ? (
            <span className="bg-stone-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-md">
              SEM ESTOQUE
            </span>
          ) : isPoucasUnidades ? (
            <span className="bg-amber-500 text-emerald-950 font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow-md animate-pulse">
              ÚLTIMAS {product.stock} UNIDADES
            </span>
          ) : (
            <span className="bg-emerald-700 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> EM ESTOQUE
            </span>
          )}
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="p-4 bg-white flex-1">
        {/* Categoria e Marca */}
        <div className="flex justify-between items-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">
          <span>Categoria: {product.category}</span>
          <span>Marca: {product.brand}</span>
        </div>

        {/* Nome do Produto */}
        <h2 className="text-base font-extrabold text-stone-800 mt-1 leading-snug">
          {product.name}
        </h2>

        {/* Bloco de Preços */}
        <div className="mt-3 flex items-baseline gap-2">
          {hasDiscount && product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-black text-emerald-800">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-[10px] text-stone-400 font-medium ml-1">
            / embalagem
          </span>
        </div>

        {/* Divisor */}
        <hr className="my-4 border-stone-150" />

        {/* Quantidade a Adicionar */}
        {!isEsgotado && (
          <div className="flex items-center justify-between bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-stone-700">Quantidade</span>
              <span className="text-[9px] text-stone-400 mt-0.5">Estoque máximo: {product.stock} un</span>
            </div>

            <div className="flex items-center gap-3.5">
              <button
                onClick={decrementQty}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-all disabled:opacity-40"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>
              
              <span className="text-sm font-black text-stone-800 w-6 text-center">
                {quantity}
              </span>

              <button
                onClick={incrementQty}
                disabled={quantity >= product.stock}
                className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-all disabled:opacity-40"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

        {/* Botões de Ação Principal */}
        <div className="mt-4 flex flex-col gap-2.5">
          <button
            onClick={() => addToCart(product, quantity)}
            disabled={isEsgotado}
            className={`w-full text-xs font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
              isEsgotado
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none border border-stone-300'
                : 'bg-emerald-800 text-white hover:bg-emerald-950 shadow-emerald-900/10'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isEsgotado ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
          </button>

          <button
            onClick={handleWhatsAppSingleRequest}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-green-900/10 border border-green-500/20 transition-all active:scale-98"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Solicitar via WhatsApp
          </button>
        </div>

        {/* Informações de Ficha Técnica */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="bg-[#FAF9F5] border border-stone-200 p-4 rounded-2xl">
            <div className="flex items-center gap-1.5 mb-1.5">
              <BadgeInfo className="w-4.5 h-4.5 text-emerald-700" />
              <h3 className="text-xs font-bold text-emerald-900">Descrição do Produto</h3>
            </div>
            <p className="text-[11.5px] text-stone-600 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="bg-[#FAF9F5] border border-stone-200 p-4 rounded-2xl">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Check className="w-4.5 h-4.5 text-emerald-700 stroke-[2.5]" />
              <h3 className="text-xs font-bold text-emerald-900">Indicação de Uso</h3>
            </div>
            <p className="text-[11.5px] text-stone-600 leading-relaxed font-medium">
              {product.usage}
            </p>
          </div>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-700 mb-4">
              Produtos Relacionados
            </h3>
            
            <div className="grid grid-cols-3 gap-2.5">
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('product-detail', p.id)}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-2 cursor-pointer flex flex-col items-center text-center transition-all hover:bg-stone-100 active:scale-95"
                >
                  <div className="w-full h-16 rounded-lg overflow-hidden bg-stone-200 mb-2">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[9px] font-bold text-stone-700 line-clamp-2 h-6 leading-tight mb-1">
                    {p.name}
                  </h4>
                  <span className="text-[9.5px] font-black text-emerald-800">
                    R$ {p.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetail;
