import { useCodeQuery } from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';

export function useCode(code: string) {
    return useCodeQuery(client, { code });
}
