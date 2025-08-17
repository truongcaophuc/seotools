import { flow } from 'lodash/fp';
import { removeAccent } from './remove-accent';

const formatString = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const slugify = (str: string) =>
    flow([removeAccent, formatString])(str || '');
