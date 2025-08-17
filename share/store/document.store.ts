import {
    DocumentInfoFragment,
    KeywordInfoFragment,
} from '@generated/graphql/query';
import { create } from 'zustand';

interface IDocumentStore {
    document?: DocumentInfoFragment;
    setDocument: (document?: DocumentInfoFragment) => void;
    changeContentDocument: (content: string) => void;
    changeTitleDocument: (title: string) => void;
    changeDescriptionDocument: (description: string) => void;
    changeUrlDocument: (url: string) => void;
    changeSlugDocument: (slug: string) => void;
    changeOutlineDocument: (outline: string) => void;
    selectKeywordDocument: (keyword: KeywordInfoFragment) => void;
}

export const useDocumentStore = create<IDocumentStore>()((set) => ({
    document: undefined,
    setDocument: (document) => set(() => ({ document })),
    changeTitleDocument: (title) =>
        set((state) => ({ document: { ...state.document, title } })),
    changeDescriptionDocument: (description) =>
        set((state) => ({ document: { ...state.document, description } })),
    changeUrlDocument: (url) =>
        set((state) => ({ document: { ...state.document, url } })),
    changeSlugDocument: (slug) =>
        set((state) => ({ document: { ...state.document, slug } })),
    changeContentDocument: (content) =>
        set((state) => ({ document: { ...state.document, content } })),
    changeOutlineDocument: (outline) =>
        set((state) => ({ document: { ...state.document, outline } })),
    selectKeywordDocument: (keyword) =>
        set((state) => ({
            document: { ...state.document, keyword, keywordId: keyword.id },
        })),
}));
