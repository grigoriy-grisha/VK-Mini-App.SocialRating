import React, { FC, memo, useCallback } from 'react';
import { twJoin } from "tailwind-merge";

import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { OutMode } from "tsparticles-engine";
import { ParticleEffect } from "@panels/Main/components/ParticleEffect.tsx";

interface HateEffectProps {
    show: boolean;
}


export const HateEffect: FC<HateEffectProps> = memo(({ show }) => {

    return (
        <div
            className={twJoin(
                "hate-effect",
                "absolute right-0 left-0 z-[1]",
                'flex transition-all duration-300 will-change-auto',
                show ? "top-0" : "-top-full" // Show the effect when show is true
            )}
        >
            {/* Hate cat */}
            <img
                className={twJoin(
                    "w-72 h-auto absolute -top-10 -left-16 rotate-[151deg] blur-[0.7px] z-10",
                    "transition-transform duration-500 ease-out will-change-transform",
                    show ? "translate-y-0 translate-x-0" : "-translate-y-full -translate-x-full" // Additional animation
                )}
                src="/feed/hateCat.png"
                alt=""
            />

            {/* Text */}
            <div
                className={twJoin(
                    "relative z-20",
                    "mr-6 mt-16 ml-auto",
                    "transition-transform duration-500 ease-in-out will-change-transform",
                    show ? "translate-y-0 translate-x-0" : "-translate-y-full" // Additional animation
                )}
            >
                <div className="hate-rating-text whitespace-nowrap ">
                    -1 Рейтинг
                </div>
            </div>

            {/* Don't render particles when there's no need */}
            {show && <ParticleEffect
                className="absolute -top-16 -inset-64 z-0"
                particleImage="/feed/dislikeIcon.png"
                particlePosition={{
                    x: 60,
                    y: 35
                }}
            />}
        </div>
    );
});
