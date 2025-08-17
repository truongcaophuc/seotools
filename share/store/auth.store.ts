import { UserInfoFragment } from '@generated/graphql/query';
import { create } from 'zustand';

type TUserAuthStore = UserInfoFragment | null;

type TAuthStore = {
    isLoading: boolean;
    user?: TUserAuthStore;
    setUserStore: (user: TUserAuthStore) => void;
    setIsLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<TAuthStore>((set) => ({
    isLoading: false,
    user: null,
    setUserStore: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));
