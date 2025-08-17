import { create } from 'zustand';

interface ICustomerStore {
    page: number;
    perPage: number;
    search?: string;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
}

export const useCustomerStore = create<ICustomerStore>()((set) => ({
    page: 1,
    perPage: 15,
    search: undefined,
    setPage: (page) => set(() => ({ page })),
    setPerPage: (perPage) => set(() => ({ perPage })),
    setSearch: (search) => set(() => ({ search })),
}));
