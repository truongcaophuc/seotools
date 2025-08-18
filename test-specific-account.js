const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const prisma = new PrismaClient();

async function testSpecificAccount() {
    try {
        console.log('🔍 Kiểm tra tài khoản: 21521300@gm.uit.edu.vn');
        console.log('=' .repeat(60));
        
        // Bước 1: Kiểm tra tài khoản có tồn tại trong database không
        console.log('\n📝 Bước 1: Kiểm tra tài khoản trong database');
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: '21521300@gm.uit.edu.vn' },
                    { username: '21521300@gm.uit.edu.vn' }
                ]
            }
        });
        
        if (!user) {
            console.log('❌ Tài khoản không tồn tại trong database');
            console.log('\n🔍 Tìm kiếm các tài khoản tương tự:');
            
            const similarUsers = await prisma.user.findMany({
                where: {
                    OR: [
                        { email: { contains: '21521300' } },
                        { username: { contains: '21521300' } },
                        { email: { contains: 'gm.uit.edu.vn' } },
                        { username: { contains: 'gm.uit.edu.vn' } }
                    ]
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    fullname: true
                }
            });
            
            if (similarUsers.length > 0) {
                console.log('📋 Các tài khoản tương tự tìm thấy:');
                similarUsers.forEach(u => {
                    console.log(`   - ID: ${u.id}, Username: ${u.username}, Email: ${u.email}, Name: ${u.fullname}`);
                });
            } else {
                console.log('❌ Không tìm thấy tài khoản tương tự');
            }
            
            return;
        }
        
        console.log('✅ Tài khoản tồn tại:');
        console.log(`   - ID: ${user.id}`);
        console.log(`   - Username: ${user.username}`);
        console.log(`   - Email: ${user.email}`);
        console.log(`   - Full Name: ${user.fullname}`);
        console.log(`   - Active: ${user.isActive}`);
        console.log(`   - Workspace ID: ${user.workspaceId}`);
        
        // Bước 2: Kiểm tra mật khẩu
        console.log('\n📝 Bước 2: Kiểm tra mật khẩu');
        const testPassword = 'cp31012003';
        const isPasswordValid = await argon2.verify(user.password, testPassword);
        
        console.log(`   - Mật khẩu test: ${testPassword}`);
        console.log(`   - Hash trong DB: ${user.password.substring(0, 20)}...`);
        console.log(`   - Mật khẩu đúng: ${isPasswordValid ? '✅ Có' : '❌ Không'}`);
        
        if (!isPasswordValid) {
            console.log('\n🔍 Thử các mật khẩu phổ biến khác:');
            const commonPasswords = ['123456', '123456789', 'password', 'cp31012003', '31012003'];
            
            for (const pwd of commonPasswords) {
                const isValid = await argon2.verify(user.password, pwd);
                console.log(`   - ${pwd}: ${isValid ? '✅ Đúng' : '❌ Sai'}`);
                if (isValid) break;
            }
        }
        
        // Bước 3: Kiểm tra workspace
        console.log('\n📝 Bước 3: Kiểm tra workspace');
        if (user.workspaceId) {
            const workspace = await prisma.workspace.findUnique({
                where: { id: user.workspaceId }
            });
            
            if (workspace) {
                console.log('✅ Workspace tồn tại:');
                console.log(`   - ID: ${workspace.id}`);
                console.log(`   - Name: ${workspace.name}`);
                console.log(`   - Owner ID: ${workspace.ownerId}`);
            } else {
                console.log('❌ Workspace không tồn tại, cần tạo mới');
                
                // Tạo workspace mặc định
                const newWorkspace = await prisma.workspace.create({
                    data: {
                        name: 'Default Workspace',
                        ownerId: user.id,
                        balance: 0,
                        isTrial: true
                    }
                });
                
                // Cập nhật user với workspace mới
                await prisma.user.update({
                    where: { id: user.id },
                    data: { workspaceId: newWorkspace.id }
                });
                
                console.log('✅ Đã tạo workspace mặc định');
            }
        } else {
            console.log('❌ User không có workspace, đang tạo...');
            
            const newWorkspace = await prisma.workspace.create({
                data: {
                    name: 'Default Workspace',
                    ownerId: user.id,
                    balance: 0,
                    isTrial: true
                }
            });
            
            await prisma.user.update({
                where: { id: user.id },
                data: { workspaceId: newWorkspace.id }
            });
            
            console.log('✅ Đã tạo workspace mặc định');
        }
        
        // Bước 4: Test đăng nhập API
        console.log('\n📝 Bước 4: Test đăng nhập qua API');
        try {
            const apiResponse = await axios.post('http://localhost:3001/api/test-login', {
                username: '21521300@gm.uit.edu.vn',
                password: 'cp31012003',
                testMode: true
            }, {
                headers: { 'Content-Type': 'application/json' },
                validateStatus: () => true
            });
            
            console.log(`   - Status: ${apiResponse.status}`);
            console.log(`   - Success: ${apiResponse.data.success}`);
            console.log(`   - Message: ${apiResponse.data.message || 'N/A'}`);
            
            if (apiResponse.data.error) {
                console.log(`   - Error: ${apiResponse.data.error}`);
            }
        } catch (error) {
            console.log(`   - API Error: ${error.message}`);
        }
        
        // Bước 5: Test đăng nhập GraphQL
        console.log('\n📝 Bước 5: Test đăng nhập qua GraphQL');
        try {
            const loginQuery = `
                mutation Login($input: LoginInputType!) {
                    login(input: $input) {
                        id
                        username
                        email
                        fullname
                    }
                }
            `;
            
            const graphqlResponse = await axios.post('http://localhost:3001/api', {
                query: loginQuery,
                variables: {
                    input: {
                        username: '21521300@gm.uit.edu.vn',
                        password: 'cp31012003'
                    }
                }
            }, {
                headers: { 'Content-Type': 'application/json' },
                validateStatus: () => true
            });
            
            console.log(`   - Status: ${graphqlResponse.status}`);
            
            if (graphqlResponse.data.errors) {
                console.log(`   - GraphQL Errors:`);
                graphqlResponse.data.errors.forEach(err => {
                    console.log(`     * ${err.message}`);
                });
            }
            
            if (graphqlResponse.data.data && graphqlResponse.data.data.login) {
                console.log(`   - Login Success: ✅`);
                console.log(`   - User: ${graphqlResponse.data.data.login.email}`);
            } else {
                console.log(`   - Login Failed: ❌`);
            }
        } catch (error) {
            console.log(`   - GraphQL Error: ${error.message}`);
        }
        
        console.log('\n' + '=' .repeat(60));
        console.log('📊 KẾT LUẬN KIỂM TRA');
        console.log('=' .repeat(60));
        
    } catch (error) {
        console.error('❌ Lỗi khi kiểm tra:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testSpecificAccount();