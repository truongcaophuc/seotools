import {
    RequestHistoriesInputType,
    useRequestHistoriesQuery,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';

export function useRequestHistories(input: RequestHistoriesInputType) {
    return useRequestHistoriesQuery(client, { input });
}
