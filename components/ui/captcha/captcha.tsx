import { Box, HStack, IconButton } from '@chakra-ui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HeroIcon } from '../icon';

interface Props {
    onChangeCaptcha: (captcha: string) => void;
}

const charsArray =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*';

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

const WIDTH = 150;
const HEIGHT = 40;
const lengthCapt = 6;

export function Captcha({ onChangeCaptcha }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const ref = useRef<HTMLCanvasElement>(null);
    const [captcha, setCaptcha] = useState<string>();

    const renderCaptcha = useCallback(() => {
        if (ref.current && !isLoading) {
            let ctx = ref.current.getContext('2d');
            ctx.font = 'bold 23px Georgia';

            for (let i = 0; i < lengthCapt; i++) {
                let sDeg = (Math.random() * 30 * Math.PI) / 180;
                let cTxt = captcha[i];

                let x = 10 + i * 20;
                let y = 20 + Math.random() * 8;
                ctx.translate(x, y);
                ctx.rotate(sDeg);

                ctx.fillStyle = randomColor();
                ctx.fillText(cTxt, 0, 0);

                ctx.rotate(-sDeg);
                ctx.translate(-x, -y);
            }

            for (let i = 0; i < 30; i++) {
                ctx.strokeStyle = randomColor();
                ctx.beginPath();
                let x = Math.random() * WIDTH;
                let y = Math.random() * HEIGHT;
                ctx.moveTo(x, y);
                ctx.lineTo(x + 1, y + 1);
                ctx.stroke();
            }

            for (let i = 0; i <= 5; i++) {
                ctx.strokeStyle = randomColor();
                ctx.beginPath();
                ctx.moveTo(Math.random() * WIDTH, Math.random() * HEIGHT);
                ctx.lineTo(Math.random() * WIDTH, Math.random() * HEIGHT);
                ctx.stroke();
            }
        }
    }, [captcha, isLoading, ref]);

    const handleReloadCaptcha = useCallback(() => {
        setIsLoading(true);
        setCaptcha('');
        let captchaArr = [];

        for (let i = 0; i < lengthCapt; i++) {
            let index = Math.floor(Math.random() * charsArray.length);
            const txt = charsArray[index];

            if (captchaArr.includes(txt)) {
                i--;
            } else {
                captchaArr.push(charsArray[index]);
            }
        }

        const captchaString = captchaArr.join('');

        setCaptcha(captchaString);
        onChangeCaptcha(captchaString);

        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    }, []);

    useEffect(() => {
        handleReloadCaptcha();
    }, [handleReloadCaptcha]);

    useEffect(() => {
        renderCaptcha();
    }, [renderCaptcha]);

    return (
        <HStack py="2">
            <Box
                overflow="hidden"
                w={`${WIDTH}px`}
                h={`${HEIGHT}px`}
                rounded="md"
                bgColor="gray.100"
                borderWidth="1px"
            >
                {isLoading ? null : (
                    <canvas width="150" height="40" ref={ref} />
                )}
            </Box>
            <IconButton
                aria-label="Reload"
                variant="ghost"
                onClick={handleReloadCaptcha}
                icon={<HeroIcon color="gray.500" as={ArrowPathIcon} />}
            />
        </HStack>
    );
}
