import {
    Box,
    Grid,
    GridItem,
    Image,
    ModalProps,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { formatUrlImage } from '@share/helps/format-url-image';
import { useImage } from '@share/hooks/image.hooks';
import { FormReviewImage } from './form.review.image';

interface Props extends Omit<ModalProps, 'children'> {
    imageId: string;
}

export function ContentReviewImage({ imageId, ...props }: Props) {
    const { isLoading, data } = useImage(imageId);

    const image = data?.image;

    const title = image?.name || image?.url;

    return (
        <Modal {...props} title={title} size="2xl">
            <Grid templateColumns="repeat(5, 1fr)" gap={8}>
                <GridItem colSpan={2}>
                    <Skeleton isLoaded={!isLoading}>
                        <Box borderWidth="1px">
                            <Image
                                display="block"
                                maxH={300}
                                src={formatUrlImage(data?.image?.url)}
                            />
                        </Box>
                    </Skeleton>
                </GridItem>

                <GridItem colSpan={3}>
                    {isLoading ? (
                        <Skeleton isLoaded={!isLoading}>
                            <Box />
                        </Skeleton>
                    ) : (
                        <FormReviewImage image={image} />
                    )}
                </GridItem>
            </Grid>
        </Modal>
    );
}
