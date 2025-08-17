import {
    PexelsPhotosInputType,
    usePexelsPhotosQuery,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';

export function usePexelsPhotos(input: PexelsPhotosInputType) {
    return usePexelsPhotosQuery(
        client,
        { input },
        { enabled: !!input.search && input.search.length > 0 }
    );
}
