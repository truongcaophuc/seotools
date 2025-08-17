import { useBreakpoint } from '@chakra-ui/react';
import { useDashboardStore } from '@components/layout/dashboard/dashboard.store';
import { useEffect, useMemo, useState } from 'react';

export function useMobile1() {
    const setIsOpen = useDashboardStore((state) => state.setIsOpen);
    const size = useBreakpoint();

    const isMobile = useMemo(
        () => ['xs', 'sm', 'md', 'base'].includes(size),
        [size]
    );

    useEffect(() => {
        if (isMobile) {
            setIsOpen(true);
        }
    }, [isMobile]);

    return isMobile;
}

export function useMobile() {
    const setIsOpen = useDashboardStore((state) => state.setIsOpen);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const { innerWidth } = window;
        setIsMobile(innerWidth < 768);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsOpen(true);
        }
    }, [isMobile]);

    return isMobile;
}
