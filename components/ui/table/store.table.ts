import { create } from 'zustand';

interface ITableStore<T> {
    isSelectAll: boolean;
    selected: Array<T>;
    onSelect: (items: Array<T>) => void;
    toggleSelectAll: () => void;
    reset: () => void;
}

const useStoreImpl = create<ITableStore<unknown>>((set) => ({
    isSelectAll: false,
    selected: [],
    reset: () =>
        set(() => ({
            isSelectAll: false,
            selected: [],
        })),
    onSelect: (items) => set(() => ({ selected: items })),
    toggleSelectAll: () =>
        set((state) => ({ isSelectAll: !state.isSelectAll })),
}));

export const useStoreTable = useStoreImpl as {
    <T>(): ITableStore<T>;
    <T, U>(selector: (s: ITableStore<T>) => U): U;
};
