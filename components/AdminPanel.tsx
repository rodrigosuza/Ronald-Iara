import React, { useState } from 'react';
import { X, Plus, LogOut, Image as ImageIcon } from 'lucide-react';
import { Gift } from '../types';
import { GiftCard } from './GiftCard';

interface AdminPanelProps {
  gifts: Gift[];
  onClose: () => void;
  onAddGift: (gift: Omit<Gift, 'id' | 'status'>) => void;
  onRemoveGift: (id: string) => void;
  onLogout: () => void;
  onBulkAdd: (gifts: Gift[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  gifts, 
  onClose, 
  onAddGift, 
  onRemoveGift, 
  onLogout
}) => {
  const [newGiftName, setNewGiftName] = useState('');
  const [newGiftImage, setNewGiftImage] = useState('');

  // Filter only selected gifts for the report
  const selectedGifts = gifts.filter(g => g.status === 'selected');
  const availableGifts = gifts.filter(g => g.status === 'available');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGiftName) return;
    
    onAddGift({
      name: newGiftName,
      imageUrl: newGiftImage || `https://picsum.photos/400/400?random=${Date.now()}`
    });
    setNewGiftName('');
    setNewGiftImage('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGiftImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in">
        <div className="max-w-md mx-auto p-4 pb-20">
            {/* Compact Mobile Header */}
            <header className="flex flex-col gap-4 mb-8 border-b border-stone-200 pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="font-serif text-2xl text-marsala-800">Painel dos Noivos</h1>
                        <p className="text-xs text-stone-500 mt-1">Gerencie sua lista de presentes</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full bg-stone-100 text-stone-600"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 rounded-lg border border-stone-300 text-xs font-bold uppercase text-stone-600 active:bg-stone-100"
                    >
                        Voltar ao Site
                    </button>
                    <button 
                        onClick={onLogout}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-stone-800 text-white text-xs font-bold uppercase flex items-center justify-center gap-2 active:bg-stone-700"
                    >
                        <LogOut size={14} /> Sair
                    </button>
                </div>
            </header>

            <div className="space-y-8">
                {/* Add Gift Form */}
                <div className="bg-stone-50 p-5 rounded-xl border border-stone-100">
                    <h2 className="font-serif text-xl text-stone-800 mb-4">Adicionar Presente</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Nome do Item</label>
                            <input 
                                type="text" 
                                value={newGiftName}
                                onChange={e => setNewGiftName(e.target.value)}
                                className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-marsala-400 outline-none text-sm bg-white"
                                placeholder="Ex: Faqueiro de Prata"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Foto do Presente</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-lg bg-white relative hover:bg-stone-50 transition-colors cursor-pointer group">
                                <div className="space-y-1 text-center w-full">
                                    {newGiftImage ? (
                                        <div className="relative">
                                            <img src={newGiftImage} alt="Preview" className="mx-auto h-32 object-contain rounded shadow-sm" />
                                            <button 
                                                type="button"
                                                onClick={() => setNewGiftImage('')}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mx-auto h-10 w-10 text-stone-300 group-hover:text-marsala-400 transition-colors">
                                                <ImageIcon size={40} strokeWidth={1} />
                                            </div>
                                            <div className="flex text-sm text-stone-600 justify-center mt-2">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-marsala-600 hover:text-marsala-500 focus-within:outline-none">
                                                    <span>Toque para escolher</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                                </label>
                                            </div>
                                            <p className="text-xs text-stone-400 mt-1">Galeria ou Câmera</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={!newGiftName}
                            className="w-full bg-marsala-800 text-white py-3.5 rounded-lg font-bold text-sm uppercase hover:bg-marsala-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Plus size={16} /> Adicionar à Lista
                        </button>
                    </form>
                </div>

                {/* Report Section */}
                <div className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm">
                    <h2 className="font-serif text-xl text-stone-800 mb-4">Relatório</h2>
                    <div className="flex gap-3 mb-4">
                         <div className="flex-1 bg-green-50 p-3 rounded-lg border border-green-100">
                            <span className="block text-2xl font-serif text-green-800 font-bold leading-none mb-1">{selectedGifts.length}</span>
                            <span className="text-green-700 text-[10px] font-bold uppercase tracking-wide">Recebidos</span>
                         </div>
                         <div className="flex-1 bg-stone-50 p-3 rounded-lg border border-stone-100">
                             <span className="block text-2xl font-serif text-stone-600 font-bold leading-none mb-1">{availableGifts.length}</span>
                             <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wide">Disponíveis</span>
                         </div>
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                        {selectedGifts.length === 0 ? (
                            <div className="text-center py-6 border-2 border-dashed border-stone-100 rounded-lg">
                                <p className="text-stone-400 italic text-xs">Nenhum presente recebido ainda.</p>
                            </div>
                        ) : (
                            selectedGifts.map(gift => (
                                <div key={gift.id} className="p-3 bg-white rounded-lg border border-stone-100 shadow-sm text-xs flex flex-col gap-1">
                                    <div className="font-bold text-stone-800 truncate w-full">{gift.name}</div>
                                    <div className="flex justify-between items-center w-full">
                                        <span className="text-stone-600 font-serif italic">{gift.guestName || 'Anônimo'}</span>
                                        <span className="text-stone-500 bg-stone-100 px-2 py-0.5 rounded text-[10px] font-mono">
                                            {gift.guestPhone}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Manage List Section */}
                <div>
                    <h2 className="font-serif text-xl text-stone-800 mb-4">Gerenciar Itens</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {gifts.map(gift => (
                            <GiftCard 
                                key={gift.id}
                                gift={gift}
                                onSelect={() => {}}
                                isAdmin={true}
                                onRemove={onRemoveGift}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};