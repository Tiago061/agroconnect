"use client";

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, Navigation, Instagram, Facebook, Share2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useApp();

  const handleOpenGps = () => {
    // Abre a rota no Google Maps para um endereço mockado
    const address = "Rua do Agronegócio, 1500 - Distrito Industrial, Mogi Mirim - SP";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    showToast('Abrindo GPS para traçar rota...', 'info');
  };

  const handleCall = () => {
    showToast('Ligando para a AgroConnect: (16) 3383-1000', 'success');
    window.open('tel:1633831000', '_blank');
  };

  const handleEmail = () => {
    showToast('Abrindo aplicativo de e-mail...', 'success');
    window.open('mailto:contato@agroconnect.com.br', '_blank');
  };

  return (
    <div className="flex-1 flex flex-col pb-20 select-none animate-in fade-in duration-300 bg-stone-50">
      
      {/* Detalhes de Contatos Rápidos */}
      <div className="p-4 flex flex-col gap-4">
        
        {/* Banner do WhatsApp Principal */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-2xl p-5 shadow-md flex justify-between items-center relative overflow-hidden">
          <div className="max-w-[70%] z-10">
            <h3 className="text-sm font-black leading-tight">Atendimento no WhatsApp</h3>
            <p className="text-[10px] text-emerald-100/90 leading-relaxed mt-1">
              Fale diretamente com nossos agrônomos e consultores técnicos para tirar dúvidas.
            </p>
            <button
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5516991234567', '_blank')}
              className="mt-3.5 bg-white text-emerald-900 font-extrabold text-[10px] px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" /> Conversar Agora
            </button>
          </div>
          
          <MessageSquare className="w-24 h-24 text-white/5 absolute -bottom-4 -right-2 transform rotate-12" />
        </div>

        {/* Canais de Contato */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col gap-3.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-1">Canais Rápidos</h4>

          <div 
            onClick={handleCall}
            className="flex items-center gap-3.5 cursor-pointer hover:bg-stone-50 p-2 rounded-xl transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Phone className="w-4.5 h-4.5 text-emerald-800" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Telefone Comercial</span>
              <span className="text-xs font-bold text-stone-700">(16) 3383-1000</span>
            </div>
          </div>

          <div 
            onClick={handleEmail}
            className="flex items-center gap-3.5 cursor-pointer hover:bg-stone-50 p-2 rounded-xl transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Mail className="w-4.5 h-4.5 text-emerald-800" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">E-mail Corporativo</span>
              <span className="text-xs font-bold text-stone-700">contato@agroconnect.com.br</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Clock className="w-4.5 h-4.5 text-emerald-800" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Horário de Funcionamento</span>
              <span className="text-xs font-bold text-stone-700 block">Segunda a Sexta: 07:00 às 18:00</span>
              <span className="text-xs font-bold text-stone-700 block mt-0.5">Sábado: 07:00 às 12:00</span>
            </div>
          </div>
        </div>

        {/* Localização e Mapa Incorporado Estilizado */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-3">Nossa Sede</h4>
          
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-stone-700 leading-normal block">
                Rodovia Governador Dr. Adhemar Pereira de Barros, Km 158
              </span>
              <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">
                Mogi Mirim/SP - CEP 13800-000
              </span>
            </div>
          </div>

          {/* Mapa em SVG Vetorial Premium */}
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-stone-200 relative bg-[#F1EFE9] mb-4">
            <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
              {/* Rios */}
              <path d="M-10,40 Q100,50 200,90 T410,100" fill="none" stroke="#A9D3E6" strokeWidth="8" />
              {/* Estradas Secundárias */}
              <line x1="50" y1="-10" x2="180" y2="210" stroke="#FFFFFF" strokeWidth="4" />
              <line x1="280" y1="-10" x2="100" y2="210" stroke="#FFFFFF" strokeWidth="4" />
              <path d="M-10,150 Q150,130 410,170" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="4 2" />
              {/* Rodovia Principal (SP-340) */}
              <path d="M-10,100 C150,100 250,70 410,60" fill="none" stroke="#E5C158" strokeWidth="8" />
              <path d="M-10,100 C150,100 250,70 410,60" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 4" />
              {/* Árvores de decoração */}
              <circle cx="60" cy="50" r="10" fill="#ADC993" opacity="0.6" />
              <circle cx="75" cy="55" r="8" fill="#ADC993" opacity="0.6" />
              <circle cx="340" cy="130" r="12" fill="#ADC993" opacity="0.6" />
              {/* Símbolo de Mogi Mirim / Cidade */}
              <circle cx="120" cy="180" r="15" fill="#E6E3DB" />
              <text x="120" y="184" fontSize="8" fill="#8C887A" fontWeight="bold" textAnchor="middle">CITY</text>
              {/* Marcador AgroConnect */}
              <g transform="translate(220, 85)" className="cursor-pointer">
                {/* Efeito de pulso de sinal */}
                <circle cx="0" cy="-15" r="14" fill="#10B981" opacity="0.25">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Pino Vermelho */}
                <path d="M0,0 C-8,-10 -8,-22 0,-30 C8,-22 8,-10 0,0 Z" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="0" cy="-20" r="3.5" fill="#FFFFFF" />
                <rect x="-35" y="-42" width="70" height="10" rx="3" fill="#133B2C" />
                <text x="0" y="-35" fontSize="6.5" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">AGROCONNECT</text>
              </g>
              {/* Placa de Identificação da Rodovia */}
              <g transform="translate(45, 95)">
                <rect x="0" y="0" width="30" height="12" rx="2" fill="#1B5E20" stroke="#FFFFFF" strokeWidth="0.5" />
                <text x="15" y="9" fontSize="6" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">SP-340</text>
              </g>
            </svg>
            <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-[8px] font-bold px-2 py-0.5 rounded-md pointer-events-none">
              Mapa Vetorial Offline
            </div>
          </div>

          {/* Botão de Rotas GPS */}
          <button
            onClick={handleOpenGps}
            className="w-full bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          >
            <Navigation className="w-4 h-4 fill-current" />
            Traçar Rota no GPS
          </button>
        </div>

        {/* Redes Sociais */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col gap-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-500">Nossas Redes</h4>
          
          <div className="flex gap-2.5">
            <button
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="flex-1 py-3 border border-stone-200 rounded-xl bg-stone-50 flex items-center justify-center gap-1.5 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors"
            >
              <Instagram className="w-4 h-4 text-rose-600" /> Instagram
            </button>

            <button
              onClick={() => window.open('https://facebook.com', '_blank')}
              className="flex-1 py-3 border border-stone-200 rounded-xl bg-stone-50 flex items-center justify-center gap-1.5 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-600 fill-current" /> Facebook
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Contact;
