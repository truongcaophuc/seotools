import { useDisclosure } from '@chakra-ui/react';
import { cloneElement, ReactElement } from 'react';
import { ContentReviewImage } from './content.review.image';

interface Props {
    children: ReactElement;
    imageId: string;
}

export function ReviewImage({ children, imageId }: Props) {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <ContentReviewImage
                isOpen={isOpen}
                onClose={onToggle}
                imageId={imageId}
            />
        </>
    );
}
