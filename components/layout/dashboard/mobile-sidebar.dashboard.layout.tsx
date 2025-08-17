import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { cloneElement, ReactElement } from 'react';
import { TType } from './dashboard.layout';
import { SidebarDashboardLayout } from './sidebar.dashboard.layout';

interface Props {
    children: ReactElement;
    type: TType;
}

export function MobileSidebarDashboardLayout({ children, type }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {cloneElement(children, { onClick: onOpen })}

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent maxW="240px">
                    <DrawerBody bgColor="blue.900" p="0" zIndex="-1" flex="1">
                        <SidebarDashboardLayout
                            showCloseBtn={false}
                            type={type}
                        />
                    </DrawerBody>
                    <DrawerCloseButton
                        zIndex="1"
                        color="gray.200"
                        pos="absolute"
                    />
                </DrawerContent>
            </Drawer>
        </>
    );
}
