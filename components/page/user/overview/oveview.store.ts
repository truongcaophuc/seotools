import { create } from 'zustand';

interface IUserOverviewStore {
    categorySelectId?: string;
    selectCategory: (id?: string) => void;
}

export const useUserOverviewStore = create<IUserOverviewStore>()((set) => ({
    categorySelectId: undefined,
    selectCategory: (id) => set(() => ({ categorySelectId: id })),
}));
