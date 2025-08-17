import { TViewType } from '@components/ui';
import { useState } from 'react';

export function useViewType(defaultValue?: TViewType) {
    const [viewType, setViewType] = useState<TViewType>(defaultValue || 'grid');

    return {
        viewType,
        setViewType,
    };
}
