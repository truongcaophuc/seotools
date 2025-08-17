const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const lengthCode = 6;

export function generateCode(): string {
    let code = [];

    for (let i = 0; i < lengthCode; i++) {
        let index = Math.floor(Math.random() * arrNumbers.length);
        code.push(arrNumbers[index]);
    }

    return code.join('');
}
