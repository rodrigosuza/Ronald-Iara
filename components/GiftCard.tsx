import React from 'react';
import { Gift } from '../types';
import { Gift as GiftIcon, Check, Trash2 } from 'lucide-react';

interface GiftCardProps {
  gift: Gift;
  onSelect: (gift: Gift) => void;
  isAdmin?: boolean;
  onRemove?: (id: string) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, onSelect, isAdmin, onRemove }) => {
  const isSelected = gift.status === 'selected';

  return (
    <div
      className={`
        relative group overflow-hidden rounded-lg bg-white shadow-sm border border-stone-100
        flex flex-col
        ${isSelected ? 'opacity-60 grayscale' : ''}
      `}
    >
      {/* Image - Aspect Ratio Square */}
      <div className="aspect-square overflow-hidden relative bg-stone-100">
        <img
          src={gift.imageUrl}
          alt={gift.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
            <div className="bg-stone-800 text-white p-1 rounded-full">
              <Check size={14} />
            </div>
          </div>
        )}
      </div>

      {/* Content - Compact for Mobile 3-Col */}
      <div className="p-2 text-center flex-1 flex flex-col justify-between">
        <h3 className="font-serif text-[13px] md:text-sm font-semibold text-stone-800 mb-2 line-clamp-2 min-h-[40px] leading-tight flex items-center justify-center">
          {gift.name}
        </h3>

        {isAdmin ? (
          <div className="space-y-1">
            <div className="text-[10px] text-stone-500 font-sans leading-none mb-1">
              {isSelected ? (
                <span className="text-green-600 font-bold block truncate">{gift.guestName || gift.guestPhone}</span>
              ) : (
                <span className="text-stone-300">Disp.</span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (onRemove) onRemove(gift.id);
              }}
              className="w-full py-2 rounded bg-red-50 text-red-700 font-sans text-[10px] uppercase border border-red-100 flex items-center justify-center gap-1 active:bg-red-100 hover:bg-red-100 transition-colors"
            >
              <Trash2 size={10} /> Excluir
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => !isSelected && onSelect(gift)}
            disabled={isSelected}
            className={`
                w-full py-1.5 px-1 rounded-md font-sans text-[10px] uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-1
                ${isSelected
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                : 'bg-marsala-800 text-white hover:bg-marsala-700 shadow-sm'}
            `}
          >
            {isSelected ? (
              <span className="leading-tight scale-90 block">Presente já<br />selecionado</span>
            ) : (
              <>Presentear</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};