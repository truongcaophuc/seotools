import { Icon, MenuItem, useDisclosure } from '@chakra-ui/react';
import { MenuAction, Modal } from '@components/ui';
import { ProjectInfoFragment } from '@generated/graphql/query';
import {
    ArrowTopRightOnSquareIcon,
    DocumentCheckIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { useMe } from '@share/hooks/auth.hooks';
import {
    useChangeDefaultProjectUser,
    useDeleteProject,
} from '@share/hooks/project.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useRouter } from 'next/router';
import { FormProject } from '../../project/form.project';

type TKeyMenu = 'edit' | 'detail' | 'default' | 'delete';

interface IMenu {
    key: TKeyMenu;
    label: string;
    icon: any;
}

interface Props {
    project: ProjectInfoFragment;
}

export function ProjectAction({ project }: Props) {
    const { data } = useMe();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const router = useRouter();
    const mutationDelete = useDeleteProject();
    const mutationDefault = useChangeDefaultProjectUser();

    const { t } = useTranslate();

    const menus: Array<IMenu> = [
        {
            icon: ArrowTopRightOnSquareIcon,
            label: t('commons.detail'),
            key: 'detail',
        },
        {
            key: 'default',
            icon: DocumentCheckIcon,
            label: t('commons.select_default'),
        },
        {
            key: 'edit',
            icon: PencilSquareIcon,
            label: t('commons.edit'),
        },
        {
            key: 'delete',
            icon: TrashIcon,
            label: t('commons.delete'),
        },
    ];

    const isDefault = data?.me?.defaultProjectId === project.id;

    function handleClick(key: TKeyMenu) {
        switch (key) {
            case 'delete':
                mutationDelete.mutate({ id: project.id });
                break;

            case 'edit':
                onOpen();
                break;

            case 'detail':
                router.push(`/user/project/${project.id}`);
                break;

            case 'default':
                mutationDefault.mutate({
                    projectId: project?.id,
                });
                break;

            default:
                break;
        }
    }

    return (
        <>
            <MenuAction>
                <>
                    {menus.map(function (menu) {
                        return (
                            <MenuItem
                                onClick={() => handleClick(menu.key)}
                                key={menu.key}
                                icon={
                                    <Icon mt="1" boxSize="5" as={menu.icon} />
                                }
                                isDisabled={menu.key === 'delete' && isDefault}
                            >
                                {menu.label}
                            </MenuItem>
                        );
                    })}
                </>
            </MenuAction>
            <Modal isOpen={isOpen} title={t('commons.edit')} onClose={onClose}>
                <FormProject project={project} callback={onClose} />
            </Modal>
        </>
    );
}
