export type GiftStatus = 'available' | 'selected';

export interface Gift {
  id: string;
  name: string;
  imageUrl: string;
  status: GiftStatus;
  guestPhone?: string;
  guestName?: string;
  category?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}