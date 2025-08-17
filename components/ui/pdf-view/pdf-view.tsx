export function PDFViewer({ url }: { url: string }) {
    return (
        <embed
            style={{
                width: '100%',
                height: '100%',
            }}
            type="application/pdf"
            src={url}
        />
    );
}

export default PDFViewer;
