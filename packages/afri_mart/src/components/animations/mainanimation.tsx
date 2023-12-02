import clsx from "clsx";
import { Variant, useAnimation, motion } from 'framer-motion';
import { useRef } from "react";

type AnimatedTextProps = {
    text: string | string[];
    el?: keyof JSX.IntrinsicElements;
    className?: string;
    once?: boolean;
    repeatDelay?: number;
    animation?: {
        hidden: Variant;
        visible: Variant;
    };
};

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
};

export const MainAnimation = ({
    text,
    el: Wrapper = "p",
    className,
    once,
    repeatDelay,
    animation = defaultAnimations,
}: AnimatedTextProps) => {
    const controls = useAnimation();
    const textArray = Array.isArray(text) ? text : [text];
    const ref = useRef(null);

    return (
        <Wrapper className={clsx(className, "overflow-hidden lg:h-32 h-12 z-40")}>
            <span className="sr-only">{text}</span>
            <motion.span
                ref={ref}
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1, repeat: Infinity } },
                    hidden: {},
                }}
                aria-hidden
            >
                {textArray.map((line, lineIndex) => (
                    <span className="block" key={`${line}-${lineIndex}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <span className="inline-block" key={`${word}-${wordIndex}`}>
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${char}-${charIndex}`}
                                        className="inline-block"
                                        variants={
                                            {
                                                hidden: {
                                                    y: 0,
                                                },
                                                visible: {
                                                    y: -120,
                                                    transition: {
                                                        duration: 0.2,
                                                        repeatType: 'mirror',
                                                        repeatDelay: 2,
                                                        repeat: Infinity
                                                    },
                                                },
                                            }
                                        }
                                    >
                                        {char}
                                        <br />
                                        <span className="text-white">
                                            {char}
                                        </span>
                                    </motion.span>
                                ))}
                                <span className="inline-block">&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
};