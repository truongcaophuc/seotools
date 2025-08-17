import { useState } from 'react';

export function usePagination() {
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(15);

    return {
        page,
        perPage,
        setPage,
        setPerPage,
    };
}
