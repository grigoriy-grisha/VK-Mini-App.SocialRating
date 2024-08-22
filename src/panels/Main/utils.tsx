import React, { CSSProperties } from "react";
import { UsersIconDefault, UsersIconHate, UsersIconLike } from "@panels/Main/Icons/UsersIcon.tsx";
import { RatingBottom, RatingDefault, RatingTop } from "@panels/Main/Icons";

enum SwipeAction {
    LIKE = "like",
    HATE = "hate",
    NONE = "none"
}

const getSwipeAction = (progress: number) => {
    if (progress > 0.5) return SwipeAction.HATE;
    if (progress < -0.5) return SwipeAction.LIKE;
    return SwipeAction.NONE;
}

export function getRatingIcon(progress: number) {
    const swipeAction = getSwipeAction(progress);

    if (swipeAction == SwipeAction.HATE) return <RatingBottom />;
    if (swipeAction == SwipeAction.LIKE) return <RatingTop />;

    return (
        <RatingDefault />
    );
}

export function getAppBg(progress: number) {
    const swipeAction = getSwipeAction(progress);

    if (swipeAction == SwipeAction.HATE) return "feed-hate-bg";
    if (swipeAction == SwipeAction.LIKE) return "feed-like-bg";
    return "feed-default-bg";
}

export function getRatingNumber(progress: number, rating: number) {
    const swipeAction = getSwipeAction(progress);

    if (swipeAction == SwipeAction.HATE) return rating - 1;
    if (swipeAction == SwipeAction.LIKE) return rating + 1;
    return rating;
}

export function getUsersIcon(progress: number) {
    const swipeAction = getSwipeAction(progress);

    if (swipeAction == SwipeAction.HATE) return  <UsersIconHate />;
    if (swipeAction == SwipeAction.LIKE) return  <UsersIconLike />;
    return <UsersIconDefault />;
}

export function getRatingBackground(progress: number) {
    const style: CSSProperties = {
        position  : "absolute",
        inset     : 0,
        width     : "107%",
        height    : "107%",
        objectFit : "cover",
        zIndex    : -1,
        transition: "all 0.12s easy-in-out",
    };

    // Decrease progress range
    progress = Math.max(-1, Math.min(1, progress * 1.5));

    return (
        <>
            {/* Like */}
            <img
                style={{
                    ...style,
                    transform: `translateY(-${(100 + progress * 100) / 2}%)`,
                    opacity  : -progress
                }}
                // className={isLike ? "opacity-1" : "opacity-0"}
                src="/feed/likeCardBG.png"
            />

            {/* Default */}
            <img
                style={{
                    ...style,
                    transform: `translateY(${-progress * 100}%)`,
                    opacity  : 1 - Math.abs(progress)
                }}
                // className={!isLike && !isDisLike ? "opacity-1" : "opacity-0"}
                src="/feed/defaultCardBG.png"
            />

            {/* Hate */}
            <img
                style={{
                    ...style,
                    transform: `translateY(${(100 - progress * 100) / 2}%)`,
                    opacity  : progress

                }}
                // className={isDisLike ? "opacity-1" : "opacity-0"}
                src="/feed/hateCardBG.png"
            />
        </>
    );
}

