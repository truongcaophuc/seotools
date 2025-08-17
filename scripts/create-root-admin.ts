import { PrismaClient, Role } from '@prisma/client';
import { generalPasswordHash } from '../share/helps/password';

const prisma = new PrismaClient();

async function createRootAdmin() {
    try {
        // Kiểm tra xem đã có RootAdmin chưa
        const existingRootAdmin = await prisma.user.findFirst({
            where: {
                role: Role.RootAdmin
            }
        });

        if (existingRootAdmin) {
            console.log('RootAdmin đã tồn tại:', existingRootAdmin.email);
            return;
        }

        // Tạo password hash
        const password = 'admin123'; // Thay đổi password này
        const passwordHash = await generalPasswordHash(password);

        // Tạo RootAdmin user
        const rootAdmin = await prisma.user.create({
            data: {
                email: 'admin@example.com', // Thay đổi email này
                username: 'rootadmin',
                password: passwordHash,
                fullname: 'Root Administrator',
                role: Role.RootAdmin,
                active: true,
                isVerify: true
            }
        });

        // Tạo workspace cho RootAdmin
        const workspace = await prisma.workspace.create({
            data: {
                name: 'Admin Workspace',
                description: 'Workspace của Root Administrator',
                ownerId: rootAdmin.id,
                balance: 1000000 // Số dư lớn cho admin
            }
        });

        // Tạo team mặc định
        const team = await prisma.team.create({
            data: {
                name: 'Admin Team',
                ownerId: rootAdmin.id,
                default: true,
                memberIds: [rootAdmin.id],
                workspaceId: workspace.id
            }
        });

        // Tạo project mặc định
        const project = await prisma.project.create({
            data: {
                name: 'Admin Project',
                teamId: team.id,
                workspaceId: workspace.id,
                default: true
            }
        });

        // Cập nhật user với workspace, team và project mặc định
        await prisma.user.update({
            where: { id: rootAdmin.id },
            data: {
                workspaceId: workspace.id,
                defaultTeamId: team.id,
                defaultProjectId: project.id
            }
        });

        console.log('✅ RootAdmin đã được tạo thành công!');
        console.log('📧 Email:', rootAdmin.email);
        console.log('👤 Username:', rootAdmin.username);
        console.log('🔑 Password:', password);
        console.log('⚠️  Hãy thay đổi password sau khi đăng nhập!');

    } catch (error) {
        console.error('❌ Lỗi khi tạo RootAdmin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createRootAdmin();