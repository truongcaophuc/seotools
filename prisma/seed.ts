import { PrismaClient, ModelAi, CustomerFilterServiceInputType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.customFieldService.updateMany({
        data: {
            isDelete: false,
        },
    });

    // Tạo ServiceCategory mẫu
    const categories = [
        {
            title: 'Viết nội dung',
            slug: 'viet-noi-dung',
            description: 'Các dịch vụ viết nội dung AI',
            order: 1,
        },
        {
            title: 'SEO & Marketing',
            slug: 'seo-marketing',
            description: 'Các dịch vụ SEO và Marketing',
            order: 2,
        },
        {
            title: 'Phân tích & Nghiên cứu',
            slug: 'phan-tich-nghien-cuu',
            description: 'Các dịch vụ phân tích và nghiên cứu',
            order: 3,
        },
    ];

    for (const category of categories) {
        await prisma.serviceCategory.upsert({
            where: { slug: category.slug },
            update: category,
            create: category,
        });
    }

    // Lấy category đầu tiên để gán cho services
    const firstCategory = await prisma.serviceCategory.findFirst({
        where: { slug: 'viet-noi-dung' },
    });

    if (firstCategory) {
        // Tạo CustomFieldService mẫu
        const customFields = [
            {
                title: 'Chủ đề',
                field: 'topic',
                description: 'Nhập chủ đề bạn muốn viết',
                inputType: CustomerFilterServiceInputType.Input,
                active: true,
                isDelete: false,
            },
            {
                title: 'Tên sản phẩm',
                field: 'product',
                description: 'Nhập tên sản phẩm',
                inputType: CustomerFilterServiceInputType.Input,
                active: true,
                isDelete: false,
            },
            {
                title: 'Tiêu đề email',
                field: 'subject',
                description: 'Nhập tiêu đề email marketing',
                inputType: CustomerFilterServiceInputType.Input,
                active: true,
                isDelete: false,
            },
            {
                title: 'Đối tượng mục tiêu',
                field: 'target_audience',
                description: 'Mô tả đối tượng khách hàng mục tiêu',
                inputType: CustomerFilterServiceInputType.Textarea,
                active: true,
                isDelete: false,
            },
        ];

        const createdCustomFields = [];
        for (const customField of customFields) {
            const created = await prisma.customFieldService.upsert({
                where: { field: customField.field },
                update: customField,
                create: customField,
            });
            createdCustomFields.push(created);
        }

        // Tạo Service mẫu với customFieldIds
        const services = [
            {
                title: 'Viết bài blog',
                slug: 'viet-bai-blog',
                description: 'Tạo nội dung blog chất lượng cao',
                model: ModelAi.GPT,
                systemMessage: 'Bạn là một chuyên gia viết blog chuyên nghiệp.',
                leadingSentence: 'Viết một bài blog về chủ đề: {topic}',
                categoryId: firstCategory.id,
                customFieldIds: [createdCustomFields[0].id, createdCustomFields[3].id], // topic + target_audience
            },
            {
                title: 'Viết mô tả sản phẩm',
                slug: 'viet-mo-ta-san-pham',
                description: 'Tạo mô tả sản phẩm hấp dẫn',
                model: ModelAi.GPT,
                systemMessage: 'Bạn là một chuyên gia marketing sản phẩm.',
                leadingSentence: 'Viết mô tả cho sản phẩm: {product}',
                categoryId: firstCategory.id,
                customFieldIds: [createdCustomFields[1].id, createdCustomFields[3].id], // product + target_audience
            },
            {
                title: 'Viết email marketing',
                slug: 'viet-email-marketing',
                description: 'Tạo email marketing hiệu quả',
                model: ModelAi.GPT,
                systemMessage: 'Bạn là một chuyên gia email marketing.',
                leadingSentence: 'Viết email marketing về: {subject}',
                categoryId: firstCategory.id,
                customFieldIds: [createdCustomFields[2].id, createdCustomFields[3].id], // subject + target_audience
            },
        ];

        for (const service of services) {
            await prisma.service.upsert({
                where: { slug: service.slug },
                update: service,
                create: service,
            });
        }
    }

    console.log('Seed completed: Created sample services and categories');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
