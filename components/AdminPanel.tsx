import React, { useState } from 'react';
import { X, Plus, LogOut, Image as ImageIcon, ClipboardList, Package, RotateCcw } from 'lucide-react';
import { Gift } from '../types';
import { GiftCard } from './GiftCard';

interface AdminPanelProps {
    gifts: Gift[];
    onClose: () => void;
    onAddGift: (gift: Omit<Gift, 'id' | 'status'>) => void;
    onRemoveGift: (id: string) => void;
    onResetGift: (id: string) => void; // Nova função para liberar o presente
    onLogout: () => void;
    onBulkAdd: (gifts: Gift[]) => void;
}

type Tab = 'manage' | 'received';

export const AdminPanel: React.FC<AdminPanelProps> = ({
    gifts,
    onClose,
    onAddGift,
    onRemoveGift,
    onResetGift,
    onLogout
}) => {
    const [activeTab, setActiveTab] = useState<Tab>('manage');
    const [newGiftName, setNewGiftName] = useState('');
    const [newGiftImage, setNewGiftImage] = useState('');

    // Filter gifts by status
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
                {/* Header */}
                <header className="flex flex-col gap-4 mb-6 border-b border-stone-100 pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="font-serif text-2xl text-marsala-800">Painel dos Noivos</h1>
                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest mt-1">Administração</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-stone-50 text-stone-400 hover:bg-stone-100 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex bg-stone-100 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('manage')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'manage' ? 'bg-white text-marsala-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            <Package size={14} /> Gerenciar
                        </button>
                        <button
                            onClick={() => setActiveTab('received')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'received' ? 'bg-white text-marsala-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            <ClipboardList size={14} /> Recebidos ({selectedGifts.length})
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onLogout}
                            className="flex-1 py-2 px-4 rounded-lg bg-stone-800 text-white text-[10px] font-bold uppercase flex items-center justify-center gap-2 active:bg-stone-700"
                        >
                            <LogOut size={12} /> Sair do Painel
                        </button>
                    </div>
                </header>

                <div className="space-y-6">

                    {activeTab === 'manage' && (
                        <>
                            {/* Add Gift Form */}
                            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                                <h2 className="font-serif text-lg text-stone-800 mb-4">Novo Presente</h2>
                                <form onSubmit={handleAdd} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-stone-500 mb-1">Nome do Item</label>
                                        <input
                                            type="text"
                                            value={newGiftName}
                                            onChange={e => setNewGiftName(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-marsala-400 outline-none text-sm bg-white"
                                            placeholder="Ex: Jogo de Jantar"
                                        />
                                    </div>

                                    <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-stone-200 border-dashed rounded-xl bg-white relative hover:bg-stone-50 transition-colors cursor-pointer group">
                                        <div className="space-y-1 text-center w-full">
                                            {newGiftImage ? (
                                                <div className="relative">
                                                    <img src={newGiftImage} alt="Preview" className="mx-auto h-24 object-contain rounded shadow-sm" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewGiftImage('')}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                                                    >
                                                        <X size={10} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="mx-auto h-8 w-8 text-stone-300 group-hover:text-marsala-400 transition-colors">
                                                        <ImageIcon size={32} strokeWidth={1.5} />
                                                    </div>
                                                    <div className="flex text-xs text-stone-600 justify-center">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-marsala-600 hover:text-marsala-500 focus-within:outline-none">
                                                            <span>Escolher foto</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                                        </label>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!newGiftName}
                                        className="w-full bg-marsala-800 text-white py-3 rounded-xl font-bold text-xs uppercase hover:bg-marsala-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <Plus size={14} /> Salvar Presente
                                    </button>
                                    arm</form>
                            </div>

                            {/* List Section */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-serif text-lg text-stone-800">Itens na Lista</h2>
                                    <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded-full font-bold">{gifts.length} total</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {gifts.length === 0 ? (
                                        <div className="col-span-3 text-center py-10 text-stone-400 text-xs italic">
                                            Nenhum item cadastrado.
                                        </div>
                                    ) : (
                                        gifts.map(gift => (
                                            <GiftCard
                                                key={gift.id}
                                                gift={gift}
                                                onSelect={() => { }}
                                                isAdmin={true}
                                                onRemove={onRemoveGift}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'received' && (
                        <div className="animate-in slide-in-from-right-2 duration-300">
                            <div className="bg-marsala-50 p-4 rounded-2xl border border-marsala-100 mb-6">
                                <h2 className="font-serif text-lg text-marsala-900 mb-4">Presentes Recebidos</h2>
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                    <div className="bg-white/80 p-3 rounded-xl border border-marsala-200 shadow-sm">
                                        <span className="block text-2xl font-serif text-marsala-800 font-bold">{selectedGifts.length}</span>
                                        <span className="text-marsala-600 text-[10px] font-bold uppercase tracking-wide">Recebidos</span>
                                    </div>
                                    <div className="bg-white/80 p-3 rounded-xl border border-stone-200 shadow-sm">
                                        <span className="block text-2xl font-serif text-stone-600 font-bold">{availableGifts.length}</span>
                                        <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wide">Disponíveis</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {selectedGifts.length === 0 ? (
                                    <div className="text-center py-20 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                                        <p className="text-stone-400 text-sm font-serif italic">Ninguém presenteou ainda.</p>
                                    </div>
                                ) : (
                                    selectedGifts.map(gift => (
                                        <div key={gift.id} className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0">
                                                <img src={gift.imageUrl} alt={gift.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-stone-800 text-sm truncate uppercase tracking-tight">{gift.name}</h3>
                                                <div className="mt-1 space-y-0.5">
                                                    <p className="text-marsala-800 font-serif text-base">{gift.guestName || 'Anônimo'}</p>
                                                    <p className="text-stone-400 text-[10px] font-mono">{gift.guestPhone}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Deseja tornar "${gift.name}" disponível novamente? Isso apagará os dados do convidado.`)) {
                                                        onResetGift(gift.id);
                                                    }
                                                }}
                                                className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Liberar presente"
                                            >
                                                <RotateCcw size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};