// components/HeroSection.js

import { Container } from "../Container";
import { ButtonLink } from "../atomic/Button";
import clsx from 'clsx';
import { GrainnyBackground } from "../atomic/GrainnyBackground";

export const SectionIII = () => {
    return (
        <div className={clsx(' px-4 sm:px-6 lg:px-8',
        " bg-[var(--rouge)] p-24 m-0 lg:p-0 lg:m-0 text-center w-full h-80"
        )}
        >
            <div className={clsx("flex h-64 p-24")}>
                {/* <GrainnyBackground /> */}
                <h1 className="font-serif mx-auto text-4xl max-w-xl text-[var(--sand)]">READY FOR US TO CREATE
                    SOME WHOLESOME MAGIC
                    TOGETHER? LET&apos;S TALK!</h1>
            </div>

        </div>
    );
};
