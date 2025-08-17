import { create } from 'zustand';

export type TSubOutlineItem = {
    id: number;
    text: string;
};

export type TTreeOutlineItem = {
    id: number;
    title: string;
    items: Array<TSubOutlineItem>;
};

interface IOutlineStore {
    outline: Array<TTreeOutlineItem>;
    addOutline: (text: string) => void;
    removeOutline: (outlineId: number) => void;
    removeSubOutline: ({
        outlineId,
        idx,
    }: {
        outlineId: number;
        idx: number;
    }) => void;
    addSubOutline: ({
        outlineId,
        text,
    }: {
        outlineId: number;
        text: string;
    }) => void;
    setOutline: (outline: Array<TTreeOutlineItem>) => void;
}

export const useOutlineStore = create<IOutlineStore>()((set) => ({
    outline: [],
    addOutline: (text) =>
        set((state) => ({
            outline: [
                ...state.outline,
                { id: state.outline.length, title: text, items: [] },
            ],
        })),
    removeOutline: (itemId) =>
        set((state) => ({
            outline: state.outline.filter((item) => item.id !== itemId),
        })),
    addSubOutline: ({ outlineId, text }) =>
        set((state) => ({
            outline: state.outline.map((item) => {
                if (item.id === outlineId) {
                    return {
                        ...item,
                        items: [...item.items, { id: item.items.length, text }],
                    };
                }
                return item;
            }),
        })),
    removeSubOutline: ({ outlineId, idx }) =>
        set((state) => ({
            outline: state.outline.map((item) => {
                if (item.id === outlineId) {
                    return {
                        ...item,
                        items: item.items.filter((_, index) => idx !== index),
                    };
                }
                return item;
            }),
        })),
    setOutline: (outline = []) => set(() => ({ outline })),
}));
