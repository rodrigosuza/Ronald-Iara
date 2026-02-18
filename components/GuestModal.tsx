import React, { useState } from 'react';
import { X, Gift as GiftIcon, HeartHandshake } from 'lucide-react';
import { Gift } from '../types';

interface GuestModalProps {
  gift: Gift | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, phoneNumber: string) => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({ gift, isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !gift) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
        setError('Por favor, informe seu nome para que os noivos saibam quem presenteou.');
        return;
    }
    if (!phone.trim() || phone.length < 8) {
      setError('Por favor, insira um número de WhatsApp válido.');
      return;
    }
    onConfirm(name, phone);
    setPhone('');
    setName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        
        {/* Header Image */}
        <div className="h-48 w-full relative">
            <img 
                src={gift.imageUrl} 
                alt={gift.name} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h2 className="text-white font-serif text-2xl drop-shadow-md">{gift.name}</h2>
            </div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        <div className="p-8">
            <div className="flex items-center gap-3 text-marsala-800 mb-6 bg-marsala-50 p-4 rounded-lg">
                <HeartHandshake className="shrink-0" />
                <p className="font-serif text-lg leading-tight">
                    Você está prestes a presentear os noivos com este item especial.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-sans font-bold text-stone-600 uppercase tracking-wider mb-2">
                        Seu Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        placeholder="Digite seu nome completo"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-marsala-400 focus:border-marsala-400 outline-none transition-all bg-stone-50"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-sans font-bold text-stone-600 uppercase tracking-wider mb-2">
                        Seu WhatsApp
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setError('');
                        }}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-marsala-400 focus:border-marsala-400 outline-none transition-all bg-stone-50"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-marsala-800 text-white font-sans font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-marsala-700 transition-colors shadow-lg hover:shadow-marsala-200 flex items-center justify-center gap-2 mt-2"
                >
                    <GiftIcon size={18} /> Confirmar Presente
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};