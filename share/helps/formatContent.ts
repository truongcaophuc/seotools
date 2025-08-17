import get from 'lodash/get';

function arrToString(data: string[]) {
    return data.join(' ').trim();
}

export function getTextFromContent(content?: string): string {
    if (!content || content.length === 0) {
        return '';
    }

    // const contentParse = JSON.parse(content);
    // const contentArr = get(contentParse, 'content', []);
    //
    // return arrToString(
    //     contentArr.map((item: any) =>
    //         arrToString(
    //             get(item, 'content', []).map((i: any) => get(i, 'text', ''))
    //         )
    //     )
    // );
    //

    return content
        .split(`\n`)
        .filter((item) => item.length > 0)
        .join(' ');
}

const TOTAL_CONTENT_SCORE = 15;

export function getScoreContent(content: string) {
    // const texts = getTextFromContent(content);
    // const contentLength = texts.length;
    const contentLength = content.length;

    if (contentLength > 2500) {
        return TOTAL_CONTENT_SCORE;
    }

    if (contentLength >= 2000 && contentLength <= 2500) {
        return TOTAL_CONTENT_SCORE * 0.7;
    }

    if (contentLength >= 1500 && contentLength < 2000) {
        return TOTAL_CONTENT_SCORE * 0.6;
    }

    if (contentLength >= 1000 && contentLength < 1500) {
        return TOTAL_CONTENT_SCORE * 0.4;
    }

    if (contentLength >= 600 && contentLength < 1000) {
        return TOTAL_CONTENT_SCORE * 0.4;
    }

    return 0;
}
