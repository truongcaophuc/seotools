import { Input, Select, Textarea } from '@chakra-ui/react';
import { FormField } from '@components/ui';
import {
    CustomFieldInfoFragment,
    CustomFieldInputType,
    LanguageInfoFragment,
    StyleContentInfoFragment,
} from '@generated/graphql/query';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { inputConfig } from './form.ai';

export interface IField {
    field: string;
    value: string;
}

interface Props {
    customFields: CustomFieldInfoFragment[];
    onChange: (fields: IField[]) => void;
    languages: LanguageInfoFragment[];
    styleContents: StyleContentInfoFragment[];
}

export function CustomFieldInput({
    customFields = [],
    onChange,
    languages = [],
    styleContents = [],
}: Props) {
    const { t } = useTranslate();
    const [fields, setFields] = useState<IField[]>([]);

    useEffect(() => {
        setFields(
            customFields.map((item) => ({ field: item.field, value: '' }))
        );
    }, [customFields]);

    useEffect(() => {
        onChange(fields);
    }, [fields]);

    return (
        <>
            {customFields.map((item) => {
                const handleChange = (
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                    setFields((prev) => {
                        const newFields = prev.map((f) => {
                            if (item.field === f.field) {
                                return {
                                    ...f,
                                    value: e.target.value,
                                };
                            }
                            return f;
                        });
                        return newFields;
                    });
                };

                const field = fields.find((f) => f.field === item.field);

                const messageError = !field?.value
                    ? `${item.title} ${t(
                          'contents.create_content.form.not_empty'
                      )}`
                    : null;

                const placeholder =
                    item.description ||
                    `${t(
                        'contents.create_content.form.type'
                    )} ${item.title.toLowerCase()}`;

                function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
                    let index = e.target.options.selectedIndex;

                    let label = e.nativeEvent.target[index].text;
                    let value = e.target.value;
                    console.log({ label });

                    setFields((prev) => {
                        const newFields = prev.map((f) => {
                            if (item.field === f.field) {
                                return {
                                    ...f,
                                    // value: label,
                                    value,
                                };
                            }
                            return f;
                        });
                        return newFields;
                    });
                }

                function renderContent() {
                    if (item.inputType === CustomFieldInputType.Textarea) {
                        return (
                            <Textarea
                                {...inputConfig}
                                onChange={handleChange}
                                placeholder={placeholder}
                            />
                        );
                    }

                    if (item.inputType === CustomFieldInputType.Language) {
                        return (
                            <Select
                                bgColor="gray.50"
                                placeholder={t(
                                    'contents.create_content.form.select_language'
                                )}
                                size="sm"
                                rounded="md"
                                onChange={handleSelect}
                            >
                                {languages.map((item) => (
                                    <option key={item.id} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </Select>
                        );
                    }

                    if (item.inputType === CustomFieldInputType.StyleContent) {
                        return (
                            <Select
                                onChange={handleSelect}
                                bgColor="gray.50"
                                placeholder={t(
                                    'contents.create_content.form.select_style'
                                )}
                                size="sm"
                                rounded="md"
                            >
                                {styleContents.map((item) => (
                                    <option key={item.id} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </Select>
                        );
                    }

                    return (
                        <Input
                            {...inputConfig}
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    );
                }

                return (
                    <FormField
                        key={item.id}
                        label={item.title}
                        isRequired
                        error={messageError}
                    >
                        {renderContent()}
                    </FormField>
                );
            })}
        </>
    );
}
