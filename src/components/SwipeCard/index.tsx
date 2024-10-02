import { Touch } from "@vkontakte/vkui";
import React from "react";
import fastdom from "fastdom";
import { Simulate } from "react-dom/test-utils";
import progress = Simulate.progress;

interface IProps {
    children: (shiftPercent: number) => React.ReactNode;
    onTop: () => void;
    onBottom: () => void;
    progress: number;
    onProgress: (value: number) => void;
}

const getValueWithLimit = (value: number, limit: number) => {
    return Math.max(-limit, Math.min(limit, value));
};

function SwipeCard({ children, onTop, onBottom, progress, onProgress }: IProps) {
    const touchRef = React.useRef<HTMLElement | null>(null);
    const startY = React.useRef(0);

    const onMove = (e: any) => {
        const limitY = fastdom.measure(() => (touchRef.current?.offsetTop || 0))();
        if(!limitY) return;

        // Calculate truncated shiftY
        const shiftY = getValueWithLimit(startY.current + e.shiftY, limitY);

        // Tell parent about swipe progress
        const progress = shiftY / limitY;
        onProgress(progress);

        // Move card
        fastdom.mutate(() => {
            if(!touchRef.current) return;
            touchRef.current.style.transform = `translate(0px, ${shiftY}px)`;
            touchRef.current.style.cursor = `grabbing`;
        });
    };

    const onEnd = (e: any) => {
        const limitY = fastdom.measure(() => (touchRef.current?.offsetTop || 0))();

        // Move card to limit position
        if(Math.abs(progress) > 0.5) {
            if(Math.sign(progress) > 0) onBottom();
            else onTop();

            onProgress(Math.sign(progress));

            // Auto swipe to the limit position
            fastdom.mutate(() => {
                if(!touchRef.current) return
                console.log(`translate(0px, ${limitY * Math.sign(progress)}px)`)
                touchRef.current.style.transform = `translate(0px, ${(limitY - 40) * Math.sign(progress)}px)`;
                touchRef.current.style.cursor = `grabbing`;
            });
        }

        // Reset card position to default
        setTimeout(() => {
            // Tell parent about swipe progress
            onProgress(0);

            fastdom.mutate(() => {
                if(!touchRef.current) return;
                touchRef.current.style.transform = `translate(0px, ${startY.current}px)`;
                touchRef.current.style.cursor = `grab`;
            });
        }, Math.abs(progress) > 0.5 ? 1500 : 10);
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
