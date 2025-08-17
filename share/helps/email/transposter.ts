import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
    SMTP_ENDPOINT,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USERNAME,
} from '@constants/aws';

let transport: Transporter<SMTPTransport.SentMessageInfo> | null = null;

const transportOptions = {
    host: SMTP_ENDPOINT,
    port: +SMTP_PORT,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
} as SMTPTransport.Options;

export function getTransport() {
    if (transport) return transport;

    transport = createTransport(transportOptions);

    return transport;
}
