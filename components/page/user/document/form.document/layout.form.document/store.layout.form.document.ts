import { create } from 'zustand';

type TLayoutFormDocument = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const useLayoutFormDocumentStore = create<TLayoutFormDocument>()(
    (set) => ({
        isOpen: false,
        onClose: () => set({ isOpen: false }),
        onOpen: () => set({ isOpen: true }),
    })
);
