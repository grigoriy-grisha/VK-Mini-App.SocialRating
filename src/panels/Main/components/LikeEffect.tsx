import React, { FC, memo, useCallback } from 'react';
import { twJoin } from "tailwind-merge";

import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { OutMode } from "tsparticles-engine";
import { ParticleEffect } from "@panels/Main/components/ParticleEffect.tsx";

interface LikeEffectProps {
    show: boolean;
}


export const LikeEffect: FC<LikeEffectProps> = memo(({ show }) => {

    return (
        <div
            className={twJoin(
                "like-effect bg--primary",
                "absolute right-0 left-0 z-[1]",
                'flex transition-all duration-300 will-change-auto',
                show ? "bottom-2" : "-bottom-full" // Show the effect when show is true
            )}
        >
            {/* Like cat */}
            <img
                className={twJoin(
                    "w-52 h-auto absolute -bottom-16 rotate-[-15deg] -right-10 blur-[0.7px] z-10",
                    "transition-transform duration-500 ease-out will-change-transform",
                    show ? "translate-y-0 translate-x-0" : "translate-y-full translate-x-full" // Additional animation
                )}
                src="/feed/likeCat.png"
                alt=""
            />

            {/* Text */}
            <div
                className={twJoin(
                    "relative z-20",
                    "transition-transform duration-500 ease-in-out will-change-transform",
                    show ? "translate-y-0 translate-x-0" : "-translate-y-full" // Additional animation
                )}
            >
                <div className="like-rating-text whitespace-nowrap mb-16 ml-5">
                    +1 Рейтинг
                </div>
            </div>

            {/* Don't render particles when there's no need */}
            {show && <ParticleEffect
                className="absolute -bottom-16 -inset-64 z-0"
                particleImage="/feed/likeIcon.png"
                particlePosition={{
                    x: 40,
                    y: 66
                }}
            />}
        </div>
    );
});
