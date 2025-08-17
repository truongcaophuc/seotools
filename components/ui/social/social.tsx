import { Center, HStack, Link, Image } from '@chakra-ui/react';

export function Social() {
    return (
        <HStack spacing="4" as={Center}>
            <Link
                target="_blank"
                display="inline-block"
                href="https://zalo.me/3429772321581987256"
            >
                <Image w="30px" src="/zalo.png" />
            </Link>
            <Link
                target="_blank"
                href="https://www.facebook.com/trolysangtaonoidung/"
            >
                <Image w="30px" src="/facebook.svg" />
            </Link>
        </HStack>
    );
}
