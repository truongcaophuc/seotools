import { IField } from '@components/page/user/ai/form.ai/custom-field.input';
import { type IServiceCache } from './redis';

interface IGenerateLeadingSentenceData {
    service?: IServiceCache;
    language?: string;
    customFields: IField[];
    isCreateKeyword?: boolean;
    styleContent?: string;
}

export function generateLeadingSentence({
    service,
    language,
    customFields,
    isCreateKeyword = false,
    styleContent,
}: IGenerateLeadingSentenceData): {
    leadingSentence: string;
    systemMessage: string;
} {
    if (!service) {
        return { leadingSentence: '', systemMessage: '' };
    }

    const customFieldObj = customFields.reduce(
        (obj, item) => ({ ...obj, [item.field]: item.value }),
        {}
    );

    const customFieldKeys = customFields.map((item) => item.field);

    let leadingSentence = (service?.leadingSentence || '')
        .split(' ')
        .map((item) => {
            if (customFieldKeys.includes(item)) {
                return customFieldObj[item];
            }
            return item;
        })
        .join(' ');

    if (isCreateKeyword) {
        leadingSentence = `${leadingSentence} kèm những từ khoá liên quan`;
    }

    // if (language) {
    //     text = `${text} ${service?.leadingLanguage} ${language}`;
    // }
    //
    // if (styleContent) {
    //     text = `${text} ${service?.leadingStyleContent} ${styleContent}`;
    // }

    let systemMessage = (service?.systemMessage || '')
        .split(' ')
        .map((item) => {
            if (customFieldKeys.includes(item)) {
                return customFieldObj[item];
            }
            return item;
        })
        .join(' ');

    return {
        leadingSentence,
        systemMessage,
    };
}
