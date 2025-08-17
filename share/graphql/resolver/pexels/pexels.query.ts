import { pexelsClient } from '@lib/pexel';
import { pick } from 'lodash';
import { arg, inputObjectType, list, objectType, queryField } from 'nexus';
import { PhotosWithTotalResults } from 'pexels';

const PexelsPhotosResponseData = objectType({
    name: 'PexelsPhotosResponseData',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Pexels'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const PexelsPhotosInputType = inputObjectType({
    name: 'PexelsPhotosInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.string('search');
    },
});

export const PexelsPhotosQuery = queryField('pexelsPhotos', {
    type: PexelsPhotosResponseData,
    args: { input: arg({ type: PexelsPhotosInputType }) },
    async resolve(_root, { input: { page = 1, perPage = 15, search } }) {
        try {
            const response = (await pexelsClient.photos.search({
                query: search,
                page,
                per_page: perPage,
            })) as PhotosWithTotalResults;

            const data = response.photos.map((item) => {
                return {
                    ...pick(item, ['id', 'alt', 'avg_color']),
                    src: item.src.large,
                };
            });

            return {
                data,
                pagination: {
                    perPage,
                    page,
                    total: response.total_results,
                },
            };
        } catch (error) {
            return {
                data: [],
                pagination: { page, perPage, total: 0 },
            };
        }
    },
});
