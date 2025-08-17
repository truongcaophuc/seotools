import Mail from 'nodemailer/lib/mailer';
import { getTransport } from './transposter';

type TSendEmailData = {
    toAddresses: string[];
    type: 'text' | 'html';
    content: string;
    subject: string;
};

export const SENDER_EMAILADDRESS = 'no-reply@copybox.app';

export async function sendEmail({
    toAddresses,
    type,
    content,
    subject,
}: TSendEmailData) {
    const transporter = getTransport();

    let mailOptions: Mail.Options = {
        from: SENDER_EMAILADDRESS,
        to: toAddresses,
        subject,
    };

    if (type === 'text') {
        mailOptions.text = content;
    } else {
        mailOptions.html = content;
    }

    return transporter.sendMail(mailOptions);
}
