import { create } from 'zustand';

type TStoreFormAi = {
    isEdit: boolean;
    setIsEdit: (value: boolean) => void;
};

export const useStoreFormAi = create<TStoreFormAi>()((set) => ({
    isEdit: false,
    setIsEdit: (isEdit) => set({ isEdit }),
}));
