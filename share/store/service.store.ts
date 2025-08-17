import { Service } from '@generated/graphql/query';
import { create } from 'zustand';

interface IServiceStore {
    services: Service[];
    setServices: (services: Service[]) => void;
}

export const useServiceStore = create<IServiceStore>()((set) => ({
    services: [],
    setServices: (services) => set(() => ({ services })),
}));
