"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/mockData';

export type ScreenType = 
  | 'splash' 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'cart' 
  | 'orders' 
  | 'profile' 
  | 'contact' 
  | 'promotions';

export type ClientType = 
  | 'Produtor rural' 
  | 'Fazenda' 
  | 'Cliente urbano' 
  | 'Cliente pet' 
  | 'Empresa' 
  | 'Revendedor';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 
  | 'Solicitado' 
  | 'Em análise' 
  | 'Aguardando pagamento' 
  | 'Separando' 
  | 'Pronto para retirada' 
  | 'Saiu para entrega' 
  | 'Concluído' 
  | 'Cancelado';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  observation: string;
  deliveryType: 'retirada' | 'entrega';
  status: OrderStatus;
  statusHistory: { status: OrderStatus; date: string }[];
}

export interface UserProfile {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  clientType: ClientType;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType, productId?: string | null) => void;
  selectedProductId: string | null;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (deliveryType: 'retirada' | 'entrega', observation: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  user: UserProfile;
  updateUser: (user: Partial<UserProfile>) => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  
  const [user, setUser] = useState<UserProfile>({
    name: 'Tiago Henrique',
    phone: '(16) 99123-4567',
    whatsapp: '(16) 99123-4567',
    email: 'tiago.agro@connect.com.br',
    address: 'Fazenda Bela Vista, Rodovia SP-340, Km 140, Setor Rural - Mogi Mirim/SP',
    clientType: 'Produtor rural',
  });

  // Carregar dados de pedidos padrão para começar com algo na lista
  useEffect(() => {
    const initialOrders: Order[] = [
      {
        id: 'ORD-9842',
        date: '04/07/2026',
        items: [
          {
            product: PRODUCTS.find(p => p.id === 'rac-01') || PRODUCTS[0],
            quantity: 5
          },
          {
            product: PRODUCTS.find(p => p.id === 'fer-01') || PRODUCTS[7],
            quantity: 2
          }
        ],
        subtotal: 744.50,
        observation: 'Entregar perto do galpão de ordenha, estrada de terra à direita.',
        deliveryType: 'entrega',
        status: 'Separando',
        statusHistory: [
          { status: 'Solicitado', date: '04/07/2026 08:30' },
          { status: 'Em análise', date: '04/07/2026 09:15' },
          { status: 'Aguardando pagamento', date: '04/07/2026 10:00' },
          { status: 'Separando', date: '04/07/2026 13:40' }
        ]
      },
      {
        id: 'ORD-9610',
        date: '30/06/2026',
        items: [
          {
            product: PRODUCTS.find(p => p.id === 'tool-02') || PRODUCTS[10],
            quantity: 1
          }
        ],
        subtotal: 79.90,
        observation: 'Vou retirar na loja no sábado de manhã.',
        deliveryType: 'retirada',
        status: 'Concluído',
        statusHistory: [
          { status: 'Solicitado', date: '30/06/2026 14:20' },
          { status: 'Em análise', date: '30/06/2026 14:35' },
          { status: 'Pronto para retirada', date: '30/06/2026 16:10' },
          { status: 'Concluído', date: '01/07/2026 09:30' }
        ]
      }
    ];
    setOrders(initialOrders);
  }, []);

  const navigateTo = (screen: ScreenType, productId?: string | null) => {
    setCurrentScreen(screen);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    // Ao navegar para catálogo, resetar busca e filtros se vier da nav
    if (screen === 'catalog' && productId === undefined) {
      // Não resetar se já estiver no catálogo para manter filtros horizontais
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.status === 'Esgotado') {
      showToast('Este produto está temporariamente sem estoque.', 'error');
      return;
    }

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingItemIndex].quantity + quantity;
        
        if (newQty > product.stock) {
          showToast(`Estoque máximo disponível (${product.stock}) atingido!`, 'error');
          return prevCart;
        }
        
        newCart[existingItemIndex].quantity = newQty;
        showToast(`${product.name} atualizado no carrinho!`, 'success');
        return newCart;
      } else {
        if (quantity > product.stock) {
          showToast(`Estoque máximo disponível (${product.stock}) atingido!`, 'error');
          return prevCart;
        }
        showToast(`${product.name} adicionado ao carrinho!`, 'success');
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const removedItem = prevCart.find(item => item.product.id === productId);
      if (removedItem) {
        showToast(`${removedItem.product.name} removido do carrinho.`, 'info');
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          if (quantity > item.product.stock) {
            showToast(`Desculpe, estoque máximo é de ${item.product.stock} unidades.`, 'error');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (deliveryType: 'retirada' | 'entrega', observation: string) => {
    if (cart.length === 0) {
      showToast('O carrinho está vazio!', 'error');
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const dateTimeStr = `${dateStr} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: Order = {
      id: orderId,
      date: dateStr,
      items: [...cart],
      subtotal,
      observation,
      deliveryType,
      status: 'Solicitado',
      statusHistory: [
        { status: 'Solicitado', date: dateTimeStr }
      ]
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // Geração de mensagem estruturada para o WhatsApp
    const message = generateWhatsAppMessage(newOrder);
    sendWhatsAppRedirect(message);

    clearCart();
    showToast(`Orçamento ${orderId} solicitado com sucesso!`, 'success');
    navigateTo('orders');
  };

  const generateWhatsAppMessage = (order: Order): string => {
    let text = `*Solicitação de Orçamento - AgroConnect*\n`;
    text += `*Pedido:* ${order.id}\n`;
    text += `*Cliente:* ${user.name} (${user.clientType})\n`;
    text += `*Data:* ${order.date}\n`;
    text += `-----------------------------------\n`;
    
    order.items.forEach(item => {
      text += `• ${item.quantity}x ${item.product.name} (${item.product.brand})\n`;
      text += `  Preço Unitário: R$ ${item.product.price.toFixed(2)}\n`;
    });
    
    text += `-----------------------------------\n`;
    text += `*Subtotal:* R$ ${order.subtotal.toFixed(2)}\n`;
    text += `*Entrega:* ${order.deliveryType === 'entrega' ? 'Entrega no Campo' : 'Retirada na Loja'}\n`;
    
    if (order.observation.trim()) {
      text += `*Observação:* ${order.observation}\n`;
    }
    
    if (order.deliveryType === 'entrega') {
      text += `*Endereço:* ${user.address}\n`;
    }

    text += `\n_Enviado via AgroConnect Mobile App._`;
    return text;
  };

  const sendWhatsAppRedirect = (message: string) => {
    const formattedPhone = '5516991234567'; // Número simulado da agropecuária
    const encodedText = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`;
    
    // Como estamos na web/WebView, abrimos em nova aba ou redirecionamos
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const now = new Date();
    const dateTimeStr = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          // Verifica se o status já existe na timeline para não duplicar se rodar novamente
          const alreadyExists = order.statusHistory.some(history => history.status === status);
          const newHistory = alreadyExists 
            ? order.statusHistory 
            : [...order.statusHistory, { status, date: dateTimeStr }];
            
          return {
            ...order,
            status,
            statusHistory: newHistory
          };
        }
        return order;
      });
    });
    showToast(`Pedido ${orderId} atualizado para: ${status}`, 'info');
  };

  const updateUser = (updatedFields: Partial<UserProfile>) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedFields };
      showToast('Perfil atualizado com sucesso!', 'success');
      return newUser;
    });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Auto-esconder toast após 3 segundos
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
        user,
        updateUser,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
