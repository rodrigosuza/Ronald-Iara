import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../types';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-8 h-8 rounded-full border transition-all
          ${currentPage === 1 
            ? 'text-stone-200 border-stone-100 cursor-not-allowed' 
            : 'text-marsala-800 border-marsala-100 hover:bg-marsala-50'}
        `}
        aria-label="Anterior"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="font-serif text-sm text-stone-600 px-2">
        <span className="text-marsala-800 font-bold">{currentPage}</span> <span className="text-stone-300">/</span> {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-8 h-8 rounded-full border transition-all
          ${currentPage === totalPages 
            ? 'text-stone-200 border-stone-100 cursor-not-allowed' 
            : 'text-marsala-800 border-marsala-100 hover:bg-marsala-50'}
        `}
        aria-label="Próxima"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};