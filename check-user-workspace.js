const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUserWorkspace() {
    try {
        console.log('Checking user workspace...');
        
        const user = await prisma.user.findUnique({
            where: {
                email: 'phuctruong.310103@gmail.com'
            }
        });
        
        console.log('User data:', JSON.stringify(user, null, 2));
        
        if (!user.workspaceId) {
            console.log('\nUser has no workspace! Creating default workspace...');
            
            // Create a default workspace for the user
            const workspace = await prisma.workspace.create({
                data: {
                    name: 'Default Workspace',
                    ownerId: user.id,
                    balance: 0,
                    isTrial: true,
                    expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
                }
            });
            
            console.log('Created workspace:', workspace);
            
            // Update user with workspace
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    workspaceId: workspace.id
                }
            });
            
            console.log('Updated user with workspace:', updatedUser);
        } else {
            console.log('User already has workspace:', user.workspaceId);
        }
        
    } catch (error) {
        console.error('Error checking user workspace:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUserWorkspace();