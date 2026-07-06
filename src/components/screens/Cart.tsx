"use client";

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Trash2, Plus, Minus, Store, Truck, MessageSquare, MapPin } from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    createOrder,
    user,
    navigateTo
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('entrega');
  const [observation, setObservation] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 shadow-inner">
          <ShoppingBag className="w-9 h-9 text-emerald-800" />
        </div>
        <h3 className="text-base font-bold text-stone-800">Seu carrinho está vazio</h3>
        <p className="text-xs text-stone-500 mt-2 max-w-xs leading-relaxed">
          Navegue pelo nosso catálogo de produtos, adicione rações, fertilizantes ou ferramentas e solicite o seu orçamento por aqui.
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-6 bg-emerald-800 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-md hover:bg-emerald-950 active:scale-95 transition-all"
        >
          Explorar Catálogo
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    createOrder(deliveryType, observation);
  };

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300 bg-stone-50">
      
      {/* Lista de Itens */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-1">
          Itens no Carrinho ({cart.length})
        </h3>
        
        {cart.map(item => (
          <div
            key={item.product.id}
            className="bg-white rounded-2xl border border-stone-200 p-3 flex gap-3 shadow-xs relative"
          >
            {/* Imagem do Produto */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-150 shrink-0 border border-stone-100">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detalhes e Controle */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <h4 className="text-xs font-bold text-stone-800 line-clamp-1 pr-6">
                  {item.product.name}
                </h4>
                <span className="text-[9px] font-bold text-stone-400 uppercase">
                  Marca: {item.product.brand}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-black text-emerald-800">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
                
                {/* Controles de Quantidade */}
                <div className="flex items-center gap-2.5 bg-stone-50 border border-stone-200 rounded-lg p-0.5">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md bg-white border border-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-all"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <span className="text-xs font-black text-stone-800 w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md bg-white border border-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-100 active:scale-90 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Botão Remover Lateral */}
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="absolute top-3 right-3 text-stone-400 hover:text-red-600 p-1 rounded-full transition-colors"
              aria-label="Remover item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Escolha do Método de Entrega */}
        <div className="mt-4 bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <h4 className="text-xs font-bold text-stone-800 mb-3">Opção de Retirada ou Entrega</h4>
          
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setDeliveryType('entrega')}
              className={`py-3 px-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                deliveryType === 'entrega'
                  ? 'bg-emerald-550 border-emerald-700 text-white bg-emerald-800 shadow-sm'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span className="text-[10px] font-bold">Entrega no Campo</span>
            </button>

            <button
              onClick={() => setDeliveryType('retirada')}
              className={`py-3 px-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                deliveryType === 'retirada'
                  ? 'bg-emerald-550 border-emerald-700 text-white bg-emerald-800 shadow-sm'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Store className="w-5 h-5" />
              <span className="text-[10px] font-bold">Retirada na Loja</span>
            </button>
          </div>

          {/* Endereço Condicional */}
          {deliveryType === 'entrega' && (
            <div className="mt-3.5 p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Endereço Cadastrado</span>
                <p className="text-[10px] font-semibold text-stone-600 leading-normal mt-0.5">{user.address}</p>
                <button
                  onClick={() => navigateTo('profile')}
                  className="text-[9px] font-bold text-emerald-700 hover:underline mt-1 block"
                >
                  Alterar endereço no perfil
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Campo de Observação */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <label htmlFor="obs" className="text-xs font-bold text-stone-800 block mb-2">
            Observações do Pedido
          </label>
          <textarea
            id="obs"
            rows={2}
            placeholder="Ex: Instruções de entrega, referências da estrada, ponto de referência no sítio..."
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="w-full bg-stone-50 text-stone-800 placeholder-stone-400 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all resize-none"
          />
        </div>

        {/* Resumo de Valores */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs mt-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-500 mb-2">
            <span>Subtotal de itens</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-semibold text-stone-500 mb-3">
            <span>Frete / Serviço</span>
            <span className="text-emerald-700 font-bold">Grátis (A Combinar)</span>
          </div>
          <hr className="border-stone-150 mb-3" />
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-stone-800">Total Estimado</span>
            <span className="text-base font-black text-emerald-800">
              R$ {subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Botão de Finalização */}
        <div className="mt-3">
          <button
            onClick={handleCheckout}
            className="w-full bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/10 active:scale-98 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Finalizar e Enviar via WhatsApp
          </button>
          <span className="text-[9px] text-stone-400 font-medium text-center block mt-2">
            Você será redirecionado para o WhatsApp com a mensagem pronta.
          </span>
        </div>
      </div>
    </div>
  );
};
export default Cart;
