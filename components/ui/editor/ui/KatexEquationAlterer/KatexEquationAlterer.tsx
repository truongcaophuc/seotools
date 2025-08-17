// import './KatexEquationAlterer.css';

import * as React from 'react';
import { useCallback, useState } from 'react';

import { KatexRenderer } from './KatexRenderer';
import { Button } from '../Button';

type Props = {
    initialEquation?: string;
    onConfirm: (equation: string, inline: boolean) => void;
};

export function KatexEquationAlterer({
    onConfirm,
    initialEquation = '',
}: Props): JSX.Element {
    const [equation, setEquation] = useState<string>(initialEquation);
    const [inline, setInline] = useState<boolean>(true);

    const onClick = useCallback(() => {
        onConfirm(equation, inline);
    }, [onConfirm, equation, inline]);

    const onCheckboxChange = useCallback(() => {
        setInline(!inline);
    }, [setInline, inline]);

    return (
        <>
            <div className="KatexEquationAlterer_defaultRow">
                Inline
                <input
                    type="checkbox"
                    checked={inline}
                    onChange={onCheckboxChange}
                />
            </div>
            <div className="KatexEquationAlterer_defaultRow">Equation </div>
            <div className="KatexEquationAlterer_centerRow">
                {inline ? (
                    <input
                        onChange={(event) => {
                            setEquation(event.target.value);
                        }}
                        value={equation}
                        className="KatexEquationAlterer_textArea"
                    />
                ) : (
                    <textarea
                        onChange={(event) => {
                            setEquation(event.target.value);
                        }}
                        value={equation}
                        className="KatexEquationAlterer_textArea"
                    />
                )}
            </div>
            <div className="KatexEquationAlterer_defaultRow">
                Visualization{' '}
            </div>
            <div className="KatexEquationAlterer_centerRow">
                <KatexRenderer
                    equation={equation}
                    inline={false}
                    onClick={() => null}
                />
            </div>
            <div className="KatexEquationAlterer_dialogActions">
                <Button onClick={onClick}>Confirm</Button>
            </div>
        </>
    );
}
