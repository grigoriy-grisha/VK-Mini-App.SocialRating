import React, { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

export
const ParticleEffect = ({
    particleImage,
    particlePosition,
    className
}: {
    particleImage: string,
    particlePosition: {x: number, y: number},
    className: string,
}) => {

    const particlesInit = useCallback(async (engine: any) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any) => {
        // Можно использовать этот callback, если нужно что-то сделать, когда частицы загрузятся
        // console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            className={className}
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: { enable: false },
                smooth    : true,
                duration  : 500,
                particles : {
                    number: {
                        value  : 30, // Particles count
                    },
                    //  Image is a particle
                    shape  : {
                        type : "image",
                        image: {
                            src: particleImage,
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
                        speed    : 8, // Move speed
                        vibrate  : true,
                        direction: "outside", // Move direction
                        out_mode : "out",

                        collisions: true,

                        // Particles generation position
                        center: particlePosition
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