export const SECRET_KEY = <string>process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error('Missing SECRET_KEY');
}
