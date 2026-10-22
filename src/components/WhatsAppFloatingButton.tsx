import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      <a
        href="https://wa.me/8801700000000?text=Hello%20Food%20Index%20BD,%20I%20want%20to%20inquire%20about%20organic%20honey/ghee."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-emerald-400"
        title="Quick Order on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Order via WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </div>
  );
};
