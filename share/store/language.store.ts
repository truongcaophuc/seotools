import { create } from 'zustand';

export const DEFAULT_LANGUAGE: TLanguage = 'vi';
export const COPYBOX_LANG_KEY = 'copybox-lang-key';

type TLanguage = 'vi' | 'en';
export type TLanguageItem = { value: TLanguage; label: string };
type TLanguages = { [key in TLanguage]: TLanguageItem };
type TLanguageStore = {
    language?: TLanguageItem;
    languages: TLanguages;
    selectLanguage: (value: TLanguageItem) => void;
};

const languages: TLanguages = {
    vi: { value: 'vi', label: 'Việt Nam' },
    en: { value: 'en', label: 'English' },
};

export const useLanguageStore = create<TLanguageStore>((set) => ({
    isLoading: true,
    language: undefined,
    languages,
    selectLanguage: (language) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(COPYBOX_LANG_KEY, language.value);
        }

        return set({ language });
    },
}));
