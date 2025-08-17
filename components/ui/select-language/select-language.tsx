import {
    Button,
    ButtonProps,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@share/store/auth.store';
import {
    COPYBOX_LANG_KEY,
    DEFAULT_LANGUAGE,
    TLanguageItem,
    useLanguageStore,
} from '@share/store/language.store';
import map from 'lodash/map';
import { useEffect } from 'react';
import { HeroIcon } from '../icon';

interface MenuLanguageItemProps {
    language: TLanguageItem;
    isActive?: boolean;
}

function MenuLanguageItem({ language, isActive }: MenuLanguageItemProps) {
    const selectLanguage = useLanguageStore((state) => state.selectLanguage);

    function handleSelectLanguage() {
        selectLanguage(language);
    }

    const bgColor = isActive ? 'gray.100' : 'white';

    return (
        <MenuItem
            fontWeight="medium"
            color="gray.500"
            bgColor={bgColor}
            fontSize="sm"
            onClick={handleSelectLanguage}
        >
            {language.label}
        </MenuItem>
    );
}

interface Props extends ButtonProps {}

export function SelectLanguage(props: Props) {
    const user = useAuthStore((state) => state.user);
    const languages = useLanguageStore((state) => state.languages);
    const language = useLanguageStore((state) => state.language);
    const selectLanguage = useLanguageStore((state) => state.selectLanguage);

    useEffect(() => {
        const languageKey =
            localStorage.getItem(COPYBOX_LANG_KEY) || DEFAULT_LANGUAGE;
        selectLanguage(languages[languageKey]);
    }, []);

    // if (!user?.isDeveloper) return <></>;

    return (
        <Menu>
            <MenuButton
                as={Button}
                cursor="pointer"
                {...props}
                color="gray.500"
                textTransform="uppercase"
                rounded="full"
                px="2"
                fontWeight="bold"
                borderWidth="1px"
            >
                <HStack spacing="1">
                    <HeroIcon boxSize="5" as={GlobeAltIcon} />
                    <Text>{language?.value}</Text>
                    <HeroIcon boxSize="2" as={ChevronDownIcon} />
                </HStack>
            </MenuButton>
            <MenuList minW="auto">
                {map(languages, (item) => (
                    <MenuLanguageItem
                        isActive={item.value === language?.value}
                        key={item.value}
                        language={item}
                    />
                ))}
            </MenuList>
        </Menu>
    );
}
