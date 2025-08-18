const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testUsers() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Database connected successfully');

        // Get all users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                fullname: true,
                createdAt: true,
                password: true // Check if password exists
            }
        });

        console.log('Total users found:', users.length);
        
        if (users.length > 0) {
            console.log('Users in database:');
            users.forEach((user, index) => {
                console.log(`${index + 1}. ID: ${user.id}`);
                console.log(`   Username: ${user.username}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Full name: ${user.fullname}`);
                console.log(`   Has password: ${!!user.password}`);
                console.log(`   Created: ${user.createdAt}`);
                console.log('---');
            });
        } else {
            console.log('No users found in database');
        }

        // Check specifically for the email we're testing
        const testUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: 'phuctruong.310103@gmail.com' },
                    { username: 'phuctruong.310103@gmail.com' }
                ]
            }
        });

        if (testUser) {
            console.log('\nFound test user:');
            console.log('ID:', testUser.id);
            console.log('Username:', testUser.username);
            console.log('Email:', testUser.email);
            console.log('Has password:', !!testUser.password);
        } else {
            console.log('\nTest user phuctruong.310103@gmail.com not found');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testUsers();