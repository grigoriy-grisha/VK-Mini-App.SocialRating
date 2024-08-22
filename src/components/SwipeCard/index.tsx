import { Touch } from "@vkontakte/vkui";
import React from "react";
import fastdom from "fastdom";
import { Simulate } from "react-dom/test-utils";
import progress = Simulate.progress;

interface IProps {
    children: (shiftPercent: number) => React.ReactNode;
    onTop: () => void;
    onBottom: () => void;
    onProgress: (value: number) => void;
}

const getValueWithLimit = (value: number, limit: number) => {
    return Math.max(-limit, Math.min(limit, value));
};

function SwipeCard({ children, onTop, onBottom, onProgress }: IProps) {
    const touchRef = React.useRef<HTMLElement | null>(null);
    const startY = React.useRef(0);

    const onMove = (e: any) => {
        const limitY = fastdom.measure(() => (touchRef.current?.offsetTop || 0) - 20 )();
        if(!limitY) return;

        // Calculate truncated shiftY
        const shiftY = getValueWithLimit(startY.current + e.shiftY, limitY);

        // Tell parent about swipe progress
        onProgress(shiftY / limitY);

        // Move card
        fastdom.mutate(() => {
            if(!touchRef.current) return;
            touchRef.current.style.transform = `translate(0px, ${shiftY}px)`;
            touchRef.current.style.cursor = `grabbing`;
        });
    };

    const onEnd = (e: any) => {
        const limitY = fastdom.measure(() => (touchRef.current?.offsetTop || 0) + 20)();
        const shiftY = startY.current + e.shiftY;

        if(!limitY) return;

        // Detect the direction of the swipe
        if (shiftY < -limitY) onTop();
        if (shiftY > limitY) onBottom();

        const progress = shiftY / limitY;
        console.log(progress)

        // Reset card position to default
        setTimeout(() => {
            // Tell parent about swipe progress
            onProgress(0);

            fastdom.mutate(() => {
                if(!touchRef.current) return;
                touchRef.current.style.transform = `translate(0px, ${startY.current}px)`;
                touchRef.current.style.cursor = `grab`;
            });
        }, Math.abs(progress) > 1 ? 1500 : 10);
    };

    return (
        <Touch
            style={{
                cursor    : "grab",
                width     : "100%",
                maxWidth  : "360px",
                willChange: "transform",
                transition: "transform 100ms",
                zIndex: 2
            }}
            getRootRef={touchRef}
            onMove={onMove}
            onEnd={onEnd}
        >
            {children(100)}
        </Touch>
    );
}

export default SwipeCard;
