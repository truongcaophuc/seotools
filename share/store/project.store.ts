import { create } from 'zustand';

interface IProjectStore {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useProjectStore = create<IProjectStore>()((set) => ({
    loading: false,
    setLoading: (loading) => () => set({ loading }),
}));
