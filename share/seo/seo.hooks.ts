import {
    getScoreContent,
    getTextFromContent,
} from '@share/helps/formatContent';
import { TFunction, useTranslate } from '@share/hooks/translate.hooks';

interface ICheckItem {
    valid: boolean;
    label: string;
    point?: () => number;
}

export interface IValidateItem {
    id: number;
    label: string;
    point: number;
    list?: Array<ICheckItem>;
}

function checkBasicSeo({
    content,
    title,
    keywords = '',
    description = '',
    t,
}: {
    content: string;
    title: string;
    keywords: string;
    description: string;
    t: TFunction;
}): Array<ICheckItem> {
    const validKeywordInTitle =
        keywords?.length > 0 && title.includes(keywords);

    return [
        {
            valid: validKeywordInTitle,
            label: t('posts.detail.seo.main_keyword_in_title'),
            point: function () {
                if (validKeywordInTitle) return 5;
                return 0;
            },
        },
        {
            valid:
                keywords?.length > 0 &&
                !!description &&
                description.includes(keywords),
            label: t('posts.detail.seo.main_keyword_in_meta'),
            point: function () {
                if (this.valid) return 5;
                return 0;
            },
        },
        {
            valid: (function () {
                return (
                    keywords?.length > 0 &&
                    !!description &&
                    description.includes(keywords)
                );
            })(),
            label: t('posts.detail.seo.main_keyword_in_url'),
            point: function () {
                if (this.valid) return 10;
                return 0;
            },
        },

        {
            valid: (function () {
                return checkContentBeginWithKeyword({
                    content,
                    keyword: keywords,
                });
            })(),
            label: '',
            point: function () {
                if (this.valid) return 5;
                return 0;
            },
        },
        {
            valid:
                keywords?.length > 0 && !!content && content.includes(keywords),
            label: t('posts.detail.seo.main_keyword_in_start_content'),
            point: function () {
                if (this.valid) return 10;
                return 0;
            },
        },
        {
            valid: (function () {
                const texts = getTextFromContent(content);
                const numberWord = texts.split(' ').length;
                console.log(numberWord);
                return numberWord >= 600 && numberWord <= 2500;
            })(),
            label: t('posts.detail.seo.length_content'),
            point: () => getScoreContent(content),
        },
    ];
}

function checkAdditional({
    title,
    content,
    keywords,
    description,
    url,
    t,
}: {
    title: string;
    content: string;
    keywords: string;
    description: string;
    url: string;
    t: TFunction;
}): Array<ICheckItem> {
    return [
        {
            valid: false,
            label: t('posts.detail.seo.main_keyword_in_sub_title'),
            point: function () {
                if (this.valid) return 6;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.main_keyword_in_alt'),
            point: function () {
                if (this.valid) return 6;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.density_main_keyword'),
            point: function () {
                if (this.valid) return 7;
                return 0;
            },
        },
        {
            valid: url.length <= 50 && url.length > 0,
            label: t('posts.detail.seo.url_length'),
            point: function () {
                if (this.valid) return 6;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.connect_outside'),
            point: function () {
                if (this.valid) return 2;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.connect_internal'),
            point: function () {
                if (this.valid) return 6;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.main_keyword_only'),
            point: function () {
                if (this.valid) return 2;
                return 0;
            },
        },
    ];
}

function stringHasNumber(text: string) {
    return !!text.split(' ').find((item) => /\d/.test(item));
}

function checkBeginWithKeyword({
    keyword = '',
    content = '',
}: {
    keyword?: string;
    content?: string;
}) {
    if (keyword.length === 0 || content.length === 0) {
        return false;
    }

    const keywordsLength = keyword.trim().split(' ').length;
    const contentFormat = content
        .split(' ')
        .filter((_i, index) => index < keywordsLength)
        .join(' ')
        .trim();

    return keyword.trim() === contentFormat;
}

function checkContentBeginWithKeyword({
    content = '',
    keyword = '',
}: {
    content?: string;
    keyword: string;
}) {
    if (!content || !keyword) return false;

    const contextString = getTextFromContent(content);

    return checkBeginWithKeyword({
        content: contextString,
        keyword,
    });
}

function checkTitleReadability({
    title = '',
    keywords,
    t,
}: {
    title: string;
    keywords: string;
    t: TFunction;
}): Array<ICheckItem> {
    return [
        {
            valid: checkBeginWithKeyword({ content: title, keyword: keywords }),
            label: t('posts.detail.seo.title_concentrate'),
            point: function () {
                if (this.valid) return 2;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.title_emotion'),
            point: function () {
                if (this.valid) return 1;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.title_strong'),
            point: function () {
                if (this.valid) return 1;
                return 0;
            },
        },
        {
            valid: stringHasNumber(title),
            label: t('posts.detail.seo.title_has_number'),
            point: function () {
                if (this.valid) return 1;
                return 0;
            },
        },
    ];
}

function checkUseMediaInContent(htmlContent: string) {
    return htmlContent.includes('<img src');
}

function checkContentReadability({
    content,
    html,
    t,
}: {
    content: string;
    html: string;
    t: TFunction;
}): Array<ICheckItem> {
    return [
        {
            valid: false,
            label: t('posts.detail.seo.table_content'),
            point: function () {
                if (this.valid) return 1;
                return 0;
            },
        },
        {
            valid: false,
            label: t('posts.detail.seo.short_content'),
            point: function () {
                if (this.valid) return 7;
                return 0;
            },
        },
        {
            valid: (function () {
                return checkUseMediaInContent(html);
            })(),
            label: t('posts.detail.seo.media_content'),
            point: function () {
                if (this.valid) return 2;
                return 0;
            },
        },
    ];
}

function getScoreSeo(data: Array<IValidateItem>): number {
    return data.reduce((total, item) => {
        const subTotal = item.list.reduce((_total, i) => {
            return _total + i.point();
        }, 0);

        return total + subTotal;
    }, 0);
}

export function useSeoCheck({
    title,
    content,
    description,
    keywords = '',
    url,
    html = '',
}: {
    title: string;
    content: string;
    description: string;
    keywords?: string;
    url: string;
    html?: string;
}) {
    const { t } = useTranslate();
    const listBasicSeo = checkBasicSeo({
        title,
        content,
        description,
        keywords,
        t,
    });

    const data: Array<IValidateItem> = [
        {
            id: 1,
            label: 'Basic SEO',
            point: 50,
            list: listBasicSeo,
        },
        {
            id: 2,
            label: 'Additional',
            point: 35,
            list: checkAdditional({
                content,
                description,
                keywords,
                title,
                url,
                t,
            }),
        },
        {
            id: 3,
            label: 'Title Readability',
            point: 5,
            list: checkTitleReadability({ title, keywords, t }),
        },
        {
            id: 4,
            point: 10,
            label: 'Content Readability',
            list: checkContentReadability({ content, html, t }),
        },
    ];

    const score = getScoreSeo(data);

    return { data, score };
}
