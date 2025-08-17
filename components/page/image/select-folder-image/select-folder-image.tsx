import { IOptionSelect, Select } from '@components/ui';
import { TypeFile } from '@generated/graphql/query';
import { useFolderImages } from '@share/hooks/image.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useState } from 'react';

interface Props {
    type?: TypeFile;
    onSelect: (folderId: string) => void;
}

export function SelectFolderImage({ type, onSelect }: Props) {
    const { t } = useTranslate();
    const [search, setSearch] = useState<string>();
    const [folder, setFolder] = useState<IOptionSelect | null>(null);
    const { data, isLoading } = useFolderImages({ type, search });

    function handleSelect(value: IOptionSelect | null) {
        setFolder(value);
        onSelect(value?.id);
    }

    const folders = (data?.folderImages?.data || []).map((item) => ({
        id: item.id,
        name: item.name,
    }));
    const total = data?.folderImages?.pagination?.total;

    return (
        <Select
            onSearch={setSearch}
            containerProps={{ w: '210px' }}
            isLoading={isLoading}
            placeholder={t('upload.commons.all_folder')}
            value={folder}
            data={folders}
            onSelect={handleSelect}
            total={total}
        />
    );
}
