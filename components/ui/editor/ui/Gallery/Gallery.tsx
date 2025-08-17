import { SimpleGrid } from '@chakra-ui/react';
import { PexelsInfoFragment } from '@generated/graphql/query';
import { InsertImagePayload } from '../../plugins/ImagesPlugin';
import { ImageCard } from './ImageCard';

interface Props {
    images: PexelsInfoFragment[];
    onSelectImage: (value: InsertImagePayload) => void;
}

export function Gallery({ images, onSelectImage }: Props) {
    return (
        <SimpleGrid columns={[2, 4, 5, 7]} gap="5">
            {images.map((image) => (
                <ImageCard
                    image={image}
                    key={image.id}
                    onSelect={onSelectImage}
                />
            ))}
        </SimpleGrid>
    );
}
