import React, {memo, FC} from 'react';

interface VideoBgProps {

}

export const VideoBg: FC<VideoBgProps> = memo(() => {


    return (
        <div className="absolute inset-0">
            <video
                className="video-background object-cover object-center w-full h-full blur-md opacity-60"
                autoPlay
                loop
                muted
                poster="/rating/background_3_poster.png"
                onPlay={(e) => e.currentTarget.playbackRate = 0.37}
            >
                <div className="animated-bg" />

                <source
                    src="/rating/background_3.mp4"
                    type="video/mp4"
                >
                </source>
            </video>
        </div>
    );
});