import React, { FC, memo, useCallback } from 'react';
import { twJoin } from "tailwind-merge";

import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { OutMode } from "tsparticles-engine";

interface HateEffectProps {
    show: boolean;
}

const ParticlesEffect = () => {

    const particlesInit = useCallback(async (engine: any) => {
        // console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any) => {
        // Можно использовать этот callback, если нужно что-то сделать, когда частицы загрузятся
        // console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            className="absolute -top-16 -inset-64 z-0"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: { enable: false },
                smooth    : true,
                duration  : 500,
                particles : {
                    number: {
                        value  : 50, // Particles count
                    },
                    //  Image is a particle
                    shape  : {
                        type : "image",
                        image: {
                            src: "/feed/dislikeIcon.png",
                        }
                    },
                    size   : {
                        value: 25, // Particles size
                        anim : {
                            enable  : true,
                            speed   : 5,
                            size_min: 5,
                        },
                    },
                    move   : {
                        enable   : true,
                        speed    : 16, // Move speed
                        vibrate  : true,
                        direction: "outside", // Move direction
                        out_mode : "out",

                        // collisions: true,

                        // Particles generation position
                        center: {
                            x: 60,
                            y: 35
                        }
                    },
                    opacity: {
                        value: 1,
                        anim : {
                            enable     : true,
                            speed      : 2,
                            opacity_min: 0.6,
                            startValue : "min",
                            sync       : false,
                            mode       : "decrease"
                        },
                    },
                    rotate : {
                        value    : 10, // Start angle
                        random   : {
                            enable      : true,
                            minimumValue: -5,   // Minimum angle value
                        },
                        animation: {
                            enable: true,
                            speed : 3,
                        },
                        direction: "random",
                    },
                },

                autoPlay     : true,
                retina_detect: true,
            }}
        />
    );
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
                    "mr-6 mt-16 ml-auto relative z-20",
                    "transition-transform duration-500 ease-in-out will-change-transform",
                    show ? "translate-y-0 translate-x-0" : "-translate-y-full" // Additional animation
                )}
            >
                <div className="hate-rating-text whitespace-nowrap ">
                    -1 Рейтинг
                </div>
            </div>

            {/* Don't render particles when there's no need */}
            {show && <ParticlesEffect />}
        </div>
    );
});
