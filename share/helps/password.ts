import * as argon2 from 'argon2';

export function generalPasswordHash(password: string): Promise<string> {
    return argon2.hash(password);
}

export function checkPassword({
    password,
    passwordHash,
}: {
    password: string;
    passwordHash: string;
}): Promise<boolean> {
    return argon2.verify(passwordHash, password);
}
