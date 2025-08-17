import prisma from '@lib/prisma';
import { clientRedis } from '@lib/redis';
import { ModelAi, Service } from '@prisma/client';
import pick from 'lodash/fp/pick';

const KEY_SERVICES = 'services';

export interface IServiceCache {
    id: string;
    title: string;
    leadingSentence: string;
    leadingLanguage: string;
    leadingStyleContent: string;
    systemMessage: string;
    model: ModelAi;
}

async function getAllService() {
    const result = await clientRedis.lrange(KEY_SERVICES, 0, -1);

    if (result.length === 0) {
        const response = await prisma.service.findMany({
            where: { isDelete: false },
        });

        const data = response.map((item) =>
            pick(
                [
                    'id',
                    'title',
                    'leadingSentence',
                    'leadingLanguage',
                    'leadingStyleContent',
                    'systemMessage',
                    'model',
                ],
                item
            )
        );

        setServices(data);

        return data;
    }

    return result.map((item) => JSON.parse(item) as IServiceCache);
}

async function addService(service: Service) {
    const pickService = pick(
        [
            'id',
            'title',
            'leadingSentence',
            'leadingLanguage',
            'leadingStyleContent',
            'systemMessage',
            'model',
        ],
        service
    );

    await clientRedis.lpush(KEY_SERVICES, JSON.stringify(pickService));
}

async function updateService(service: Service) {
    let services = await getAllService();

    services = services.map((item) => {
        if (item.id === service.id) {
            const pickService = pick(
                [
                    'id',
                    'title',
                    'leadingSentence',
                    'leadingLanguage',
                    'leadingStyleContent',
                    'systemMessage',
                    'model',
                ],
                service
            );
            return pickService;
        }
        return item;
    });

    await clientRedis.del(KEY_SERVICES);

    for (let i = 0; i < services.length; i++) {
        const service = services[i];
        const pickService = pick(
            [
                'id',
                'title',
                'leadingSentence',
                'leadingLanguage',
                'leadingStyleContent',
                'systemMessage',
                'model',
            ],
            service
        );
        clientRedis.lpush(KEY_SERVICES, JSON.stringify(pickService));
    }
}

async function deleteService(serviceId: string) {
    let services = await getAllService();

    services = services.filter((item) => {
        return item.id !== serviceId;
    });

    await clientRedis.del(KEY_SERVICES);

    for (let i = 0; i < services.length; i++) {
        const service = services[i];
        const pickService = pick(
            [
                'id',
                'title',
                'leadingSentence',
                'leadingLanguage',
                'leadingStyleContent',
                'systemMessage',
                'model',
            ],
            service
        );
        clientRedis.lpush(KEY_SERVICES, JSON.stringify(pickService));
    }
}

async function setServices(services: IServiceCache[]) {
    await clientRedis.del(KEY_SERVICES);

    for (let i = 0; i < services.length; i++) {
        const service = services[i];
        const pickService = pick(
            [
                'id',
                'title',
                'leadingSentence',
                'leadingLanguage',
                'leadingStyleContent',
                'systemMessage',
                'model',
            ],
            service
        );
        clientRedis.lpush(KEY_SERVICES, JSON.stringify(pickService));
    }
}

export const serviceRedis = {
    getAllService,
    setServices,
    addService,
    updateService,
    deleteService,
};
