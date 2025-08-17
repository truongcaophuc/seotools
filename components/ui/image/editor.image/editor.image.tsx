import { base64ToFile } from '@share/helps/format-image';
import FilerobotImageEditor, {
    TABS,
    TOOLS,
} from 'react-filerobot-image-editor';

interface Props {
    source?: string;
    upload?: (file: File) => void;
    onClose?: () => void;
}

// source = "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg",
export function EditorImage({ source, upload, onClose }: Props) {
    function handleClose() {
        if (onClose) onClose();
    }

    return (
        <div style={{ height: '700px' }}>
            <FilerobotImageEditor
                source={source}
                onSave={async (editedImageObject, designState) => {
                    const file = await base64ToFile(
                        editedImageObject.imageBase64,
                        editedImageObject.fullName
                    );
                    upload(file);
                }}
                onClose={handleClose}
                annotationsCommon={{
                    fill: '#000',
                }}
                Text={{ text: 'Nội dung...' }}
                Rotate={{ angle: 90, componentType: 'slider' }}
                tabsIds={[
                    TABS.ADJUST,
                    TABS.RESIZE,
                    TABS.FILTERS,
                    TABS.FINETUNE,
                    TABS.ANNOTATE,
                    TABS.WATERMARK,
                ]} // or {['Adjust', 'Annotate', 'Watermark']}
                defaultTabId={TABS.ANNOTATE} // or 'Annotate'
                defaultToolId={TOOLS.TEXT} // or 'Text'
                savingPixelRatio={4}
                previewPixelRatio={window?.devicePixelRatio}
                observePluginContainerSize
            />
        </div>
    );
}

export default EditorImage;
