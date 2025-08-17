import { CSSProperties, ReactNode } from 'react';
import { joinClasses } from '../../utils/join-classes';

interface Props {
    'data-test-id'?: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick: () => void;
    small?: boolean;
    title?: string;
    style?: CSSProperties;
}

export function Button({
    'data-test-id': dataTestId,
    children,
    className,
    onClick,
    disabled,
    small,
    title,
    style = {},
}: Props): JSX.Element {
    return (
        <button
            disabled={disabled}
            className={joinClasses(
                'Button__root',
                disabled && 'Button__disabled',
                small && 'Button__small',
                className
            )}
            onClick={onClick}
            title={title}
            aria-label={title}
            {...(dataTestId && { 'data-test-id': dataTestId })}
            style={style}
        >
            {children}
        </button>
    );
}
