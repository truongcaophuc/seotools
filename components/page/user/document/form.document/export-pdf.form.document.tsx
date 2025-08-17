import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { useParseContentDocument } from '@share/hooks/document.hooks';
import html2pdf from 'html2pdf.js';
import { cloneElement, ReactElement, useState } from 'react';

interface Props {
    children: ReactElement;
}

const DIV_ID = 'export-pdf';

export function ExportPdfFormDocument({ children }: Props) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { editorStateHtml } = useParseContentDocument();

    function handleClick() {
        setLoading(true);
        const element =
            typeof document !== 'undefined'
                ? document.getElementById(DIV_ID)
                : null;
        if (element) {
            const opt = {
                margin: 1,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait',
                },
            };

            html2pdf().set(opt).from(element).save();
            onClose();
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                title="dad"
                footer={
                    <HStack>
                        <Button isDisabled={isLoading} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Button
                            onClick={handleClick}
                            isLoading={isLoading}
                            colorScheme="green"
                        >
                            Tải xuống
                        </Button>
                    </HStack>
                }
                isOpen={isOpen}
                onClose={onClose}
                size="full"
            >
                <div
                    id={DIV_ID}
                    dangerouslySetInnerHTML={{ __html: editorStateHtml }}
                />
            </Modal>
            {cloneElement(children, { onClick: onOpen })}
        </>
    );
}

export default ExportPdfFormDocument;
