const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const prisma = new PrismaClient();

async function createTestUser() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Database connected successfully');

        // Hash the password
        const password = '123456789';
        const hashedPassword = await argon2.hash(password);
        console.log('Password hashed successfully');

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: 'phuctruong.310103@gmail.com' },
                    { username: 'phuctruong.310103@gmail.com' }
                ]
            }
        });

        if (existingUser) {
            console.log('User already exists, updating password...');
            await prisma.user.update({
                where: { id: existingUser.id },
                data: { password: hashedPassword }
            });
            console.log('Password updated successfully');
        } else {
            console.log('Creating new user...');
            const newUser = await prisma.user.create({
                data: {
                    username: 'phuctruong.310103@gmail.com',
                    email: 'phuctruong.310103@gmail.com',
                    password: hashedPassword,
                    fullname: 'Phuc Truong Test',
                    phoneNumber: '0123456789',
                    active: true,
                    isVerify: true,
                    isDeveloper: false,
                    role: 'User'
                }
            });
            console.log('User created successfully:', {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            });
        }

        // Test password verification
        console.log('\nTesting password verification...');
        const isValid = await argon2.verify(hashedPassword, password);
        console.log('Password verification result:', isValid);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestUser();