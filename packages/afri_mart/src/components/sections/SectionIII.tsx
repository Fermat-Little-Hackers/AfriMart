// components/HeroSection.js

import { Container } from "../Container";
import { ButtonLink } from "../atomic/Button";
import clsx from 'clsx';
import { GrainnyBackground } from "../atomic/GrainnyBackground";
import { FadeIn } from "../animations/FadeIn";

export const SectionIII = () => {
    return (
        
        <div className={clsx('p-4 ',
        " bg-[var(--rouge)] text-center w-full "
        )}
        >
            <div className={clsx(" ")}>
                {/* <GrainnyBackground /> */}
            <FadeIn>
                <h1 className="font-serif mx-auto text-4xl max-w-xl text-[var(--sand)]">READY FOR US TO CREATE
                    SOME WHOLESOME MAGIC
                    TOGETHER? CREATE A STORE!</h1>
            </FadeIn>
                <FadeIn>

                    <button className="py-4 px-8 border-dashed mt-4  border-2 rounded-2xl ">
                        Create a Shop
                    </button>
                </FadeIn>
            </div>

        </div>
    );
};
