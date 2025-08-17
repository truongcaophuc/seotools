import { create } from 'zustand';

interface IDashboardStore {
    isOpen: boolean;
    isShowWarning: boolean;
    setIsShowWarning: (isShowWarning: boolean) => void;
    onToggle: () => void;
    setIsOpen: (value: boolean) => void;
}

export const useDashboardStore = create<IDashboardStore>()((set) => ({
    isOpen: true,
    isShowWarning: false,
    setIsShowWarning: (isShowWarning) => set(() => ({ isShowWarning })),
    onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setIsOpen: (isOpen) => set({ isOpen }),
}));
