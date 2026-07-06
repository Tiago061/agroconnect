"use client";

import React, { useState } from 'react';
import { useApp, ClientType } from '../../context/AppContext';
import { User, Phone, Mail, MapPin, Edit3, ClipboardList, LogOut, Check, Save } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateUser, orders, navigateTo } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editWhatsapp, setEditWhatsapp] = useState(user.whatsapp);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAddress, setEditAddress] = useState(user.address);
  const [editClientType, setEditClientType] = useState<ClientType>(user.clientType);

  const clientTypes: ClientType[] = [
    'Produtor rural',
    'Fazenda',
    'Cliente urbano',
    'Cliente pet',
    'Empresa',
    'Revendedor'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editName,
      phone: editPhone,
      whatsapp: editWhatsapp,
      email: editEmail,
      address: editAddress,
      clientType: editClientType
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditPhone(user.phone);
    setEditWhatsapp(user.whatsapp);
    setEditEmail(user.email);
    setEditAddress(user.address);
    setEditClientType(user.clientType);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Retorna para a splash screen simulando logout
    navigateTo('splash');
  };

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300 bg-stone-50">
      
      {/* Topo do Perfil com Avatar */}
      <div className="bg-emerald-900 text-white p-6 rounded-b-[32px] flex flex-col items-center text-center shadow-md">
        <div className="w-20 h-20 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center mb-3.5 shadow-inner">
          <User className="w-10 h-10 text-emerald-100" />
        </div>
        <h2 className="text-base font-extrabold tracking-tight">{user.name}</h2>
        <span className="bg-amber-400 text-emerald-950 font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full mt-1.5 shadow-sm">
          {user.clientType}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        
        {isEditing ? (
          /* Formulário de Edição */
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-emerald-800" /> Editar Cadastro
            </h3>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Nome Completo</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                required
                className="w-full bg-stone-50 text-xs font-semibold text-stone-800 border border-stone-200 rounded-lg p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Telefone Fixo</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full bg-stone-50 text-xs font-semibold text-stone-800 border border-stone-200 rounded-lg p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={editWhatsapp}
                  onChange={e => setEditWhatsapp(e.target.value)}
                  required
                  className="w-full bg-stone-50 text-xs font-semibold text-stone-800 border border-stone-200 rounded-lg p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">E-mail de Contato</label>
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                required
                className="w-full bg-stone-50 text-xs font-semibold text-stone-800 border border-stone-200 rounded-lg p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Endereço de Faturamento / Entrega</label>
              <textarea
                value={editAddress}
                onChange={e => setEditAddress(e.target.value)}
                rows={2}
                required
                className="w-full bg-stone-50 text-xs font-semibold text-stone-800 border border-stone-200 rounded-lg p-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1.5">Segmento de Atuação</label>
              <div className="grid grid-cols-2 gap-1.5">
                {clientTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEditClientType(type)}
                    className={`py-2 px-2 border rounded-lg text-[10px] font-bold text-center transition-all ${
                      editClientType === type
                        ? 'bg-emerald-800 border-emerald-950 text-white shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-stone-100 border border-stone-200 text-stone-600 font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all text-center"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="flex-1 bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Salvar
              </button>
            </div>
          </form>
        ) : (
          /* Visualização de Perfil */
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">Informações Cadastrais</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" /> Editar
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Telefone</span>
                  <span className="text-xs font-semibold text-stone-700">{user.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">WhatsApp</span>
                  <span className="text-xs font-semibold text-stone-700">{user.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">E-mail</span>
                  <span className="text-xs font-semibold text-stone-700">{user.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Endereço de Entrega</span>
                  <span className="text-xs font-semibold text-stone-700 leading-normal block mt-0.5">{user.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Resumo do Histórico */}
        <div 
          onClick={() => navigateTo('orders')}
          className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex justify-between items-center cursor-pointer hover:bg-stone-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-800">Histórico de Pedidos</h4>
              <p className="text-[10px] text-stone-400 mt-0.5 font-semibold">
                Você possui <span className="text-emerald-700 font-bold">{orders.length}</span> solicitações ativas
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700">Ver todos</span>
        </div>

        {/* Botão Sair / Reset da Sessão */}
        <button
          onClick={handleLogout}
          className="bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-700 font-bold p-3.5 rounded-2xl text-xs active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
        >
          <LogOut className="w-4.5 h-4.5" />
          Sair da Conta (Simular Reset)
        </button>

      </div>
    </div>
  );
};
export default Profile;
