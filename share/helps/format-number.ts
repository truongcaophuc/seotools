import { flow, toString, round } from 'lodash/fp';

function format(value: string) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const formatNumber = flow([round, toString, format]);

export function formatMoney(value: number, suffix?: string): string {
    const numberValue = formatNumber(value);
    return `${numberValue} ${typeof suffix === 'string' ? suffix : 'đ'}`;
}
