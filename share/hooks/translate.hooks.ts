import {
    DEFAULT_LANGUAGE,
    useLanguageStore,
} from '@share/store/language.store';
import get from 'lodash/get';
import { i18n } from '../../languages';

export type TFunction = (key: string) => string | any;

export function useTranslate(): { t: TFunction } {
    const language = useLanguageStore((state) => state.language);

    function t(key: string) {
        const languageKey = language?.value || DEFAULT_LANGUAGE;
        const pathString = `${key}.${languageKey}`;
        return get(i18n, pathString) || key;
    }

    return {
        t,
    };
}
