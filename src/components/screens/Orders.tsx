"use client";

import React, { useState } from 'react';
import { useApp, OrderStatus, Order } from '../../context/AppContext';
import { ClipboardList, ChevronDown, ChevronUp, Clock, Package, CheckCircle, Truck, DollarSign, Eye, EyeOff, Play } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders, updateOrderStatus, navigateTo } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>('ORD-9842');

  const toggleExpand = (id: string) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  // Cores de badge conforme status
  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case 'Solicitado': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Em análise': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Aguardando pagamento': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Separando': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Pronto para retirada': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Saiu para entrega': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Concluído': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Cancelado': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  // Ordem lógica para renderizar a timeline
  const getTimelineSteps = (deliveryType: 'retirada' | 'entrega'): OrderStatus[] => {
    return [
      'Solicitado',
      'Em análise',
      'Aguardando pagamento',
      'Separando',
      deliveryType === 'entrega' ? 'Saiu para entrega' : 'Pronto para retirada',
      'Concluído'
    ];
  };

  if (orders.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 shadow-inner">
          <ClipboardList className="w-9 h-9 text-emerald-800" />
        </div>
        <h3 className="text-base font-bold text-stone-800">Nenhum orçamento solicitado</h3>
        <p className="text-xs text-stone-500 mt-2 max-w-xs leading-relaxed">
          Você ainda não realizou solicitações de orçamento. Vá ao catálogo, monte seu carrinho e envie para nossa equipe!
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-6 bg-emerald-800 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-md"
        >
          Ir para o Catálogo
        </button>
      </div>
    );
  }

  // Lista ordenada de todos os status para simulação
  const statusOptions: OrderStatus[] = [
    'Solicitado',
    'Em análise',
    'Aguardando pagamento',
    'Separando',
    'Pronto para retirada',
    'Saiu para entrega',
    'Concluído',
    'Cancelado'
  ];

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300 bg-stone-50">
      
      <div className="p-4 flex-1 flex flex-col gap-3.5">
        
        {/* Aviso de Simulação */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3 flex items-start gap-2.5 shadow-xs">
          <Clock className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[10px] leading-relaxed">
            <span className="font-bold">Painel de Demonstração:</span> Você pode simular a mudança de status do orçamento usando o botão de engrenagem em cada pedido para ver o fluxo e a linha do tempo atualizando instantaneamente!
          </div>
        </div>

        <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-1">
          Solicitações Ativas ({orders.length})
        </h3>

        {orders.map(order => {
          const isExpanded = expandedOrderId === order.id;
          const steps = getTimelineSteps(order.deliveryType);
          const currentStepIndex = steps.indexOf(order.status);
          const isCancelled = order.status === 'Cancelado';

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col transition-all duration-300"
            >
              {/* Cabeçalho do Pedido */}
              <div
                onClick={() => toggleExpand(order.id)}
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-stone-50/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-stone-800">{order.id}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-semibold mt-1">
                    Solicitado em: {order.date} • {order.deliveryType === 'entrega' ? 'Entrega' : 'Retirada'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-emerald-800">
                    R$ {order.subtotal.toFixed(2)}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4.5 h-4.5 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5 text-stone-400" />
                  )}
                </div>
              </div>

              {/* Detalhes Colapsáveis */}
              {isExpanded && (
                <div className="border-t border-stone-150 p-4 bg-stone-50/40">
                  
                  {/* Simulador Secreto do Status */}
                  <div className="mb-4 bg-stone-100 rounded-xl p-3 border border-stone-200">
                    <div className="text-[9.5px] font-bold text-stone-600 mb-2 uppercase tracking-wide flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 text-emerald-800 fill-current" />
                      Simular Próxima Etapa
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {statusOptions.map(st => {
                        const isCurrent = order.status === st;
                        return (
                          <button
                            key={st}
                            onClick={() => updateOrderStatus(order.id, st)}
                            className={`px-2 py-1 rounded-md text-[8.5px] font-bold transition-all border ${
                              isCurrent
                                ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Itens do Pedido */}
                  <div className="mb-4 bg-white rounded-xl border border-stone-150 p-3">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-2">Itens Solicitados</span>
                    <div className="flex flex-col gap-2">
                      {order.items.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center text-[11px] font-semibold text-stone-700">
                          <span className="line-clamp-1 pr-4">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-bold text-stone-900 shrink-0">
                            R$ {(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {order.observation.trim() && (
                      <div className="mt-3 pt-3 border-t border-stone-100 text-[10px] leading-relaxed text-stone-500 italic">
                        <span className="font-bold text-stone-700 block not-italic mb-0.5">Obs do produtor:</span>
                        "{order.observation}"
                      </div>
                    )}
                  </div>

                  {/* Linha do Tempo (Timeline) do Status */}
                  <div className="bg-white rounded-xl border border-stone-150 p-4">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-4">Acompanhamento de Status</span>
                    
                    {isCancelled ? (
                      /* Exibição se Cancelado */
                      <div className="flex items-start gap-3 text-red-700 p-2 bg-red-50 rounded-lg border border-red-100">
                        <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-[11px] font-bold">Solicitação Cancelada</h4>
                          <p className="text-[10px] text-red-600 leading-normal mt-0.5">
                            Este orçamento foi cancelado. Se necessário, envie uma nova solicitação ou entre em contato via WhatsApp de suporte.
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Timeline Padrão */
                      <div className="flex flex-col relative pl-6 border-l border-stone-200 ml-2.5 gap-5 pb-1">
                        {steps.map((step, idx) => {
                          const isDone = idx < currentStepIndex;
                          const isCurrent = idx === currentStepIndex;
                          const isPending = idx > currentStepIndex;
                          
                          // Encontrar a data na história correspondente a este status
                          const historyEntry = order.statusHistory.find(h => h.status === step);

                          return (
                            <div key={step} className="relative">
                              {/* Bolinha do status */}
                              <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                                isDone 
                                  ? 'bg-emerald-700 border-emerald-700 text-white' 
                                  : isCurrent 
                                    ? 'bg-amber-500 border-amber-500 text-emerald-950 animate-pulse' 
                                    : 'bg-white border-stone-200'
                              }`}>
                                {isDone && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                {isCurrent && <div className="w-1.5 h-1.5 bg-emerald-950 rounded-full" />}
                              </div>

                              {/* Conteúdo */}
                              <div className="flex flex-col">
                                <span className={`text-[11.5px] font-bold leading-none ${
                                  isDone 
                                    ? 'text-emerald-900 font-semibold' 
                                    : isCurrent 
                                      ? 'text-amber-600 font-extrabold' 
                                      : 'text-stone-400 font-medium'
                                }`}>
                                  {step}
                                </span>
                                
                                {historyEntry ? (
                                  <span className="text-[8.5px] text-stone-400 font-semibold mt-1">
                                    {historyEntry.date}
                                  </span>
                                ) : (
                                  isCurrent && (
                                    <span className="text-[8.5px] text-amber-500 font-semibold mt-1">
                                      Em andamento...
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Orders;
