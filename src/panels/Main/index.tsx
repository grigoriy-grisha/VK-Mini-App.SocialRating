import React, { CSSProperties, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { socialRatingService, userService } from "@/services";
import AppPanel from "@components/AppPanel";
import { SwipeCard } from "@/components";
import { Spacing, Title } from "@vkontakte/vkui";
import { RatingBottom, RatingTop, UsersIcon } from "@components/Icons";
import { twJoin } from "tailwind-merge";

import './feed.css';

interface IProps {
    id: string;
}

function getRatingIcon(progress: number) {
    if (progress > 0.5) return <RatingBottom />;
    if (progress < -0.5) return <RatingTop />;
    return (
        <div className="opacity-0">
            <RatingBottom />
        </div>
    );
}

function getAppBg(progress: number) {
    if (progress > 0.5) return "feed-like-bg";
    if (progress < -0.5) return "feed-hate-bg";
    return "feed-default-bg";
}

function getRatingBackground(progress: number) {
    const isLike = progress < -0.5;
    const isDisLike = progress > 0.5;

    const style: CSSProperties = {
        position  : "absolute",
        inset     : 0,
        zIndex    : -1,
        transition: "all 0.12s easy-in-out",
    };

    // Decrease progress range
    progress = Math.max(-1, Math.min(1, progress * 1.5));

    console.log(1 - Math.abs(progress))

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

function getRatingNumber(progress: number, rating: number) {
    if (progress > 0.5) return rating - 1;
    if (progress < -0.5) return rating + 1;
    return rating;
}

//todo вынести стили в tailwind
function Main({ id }: IProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        userService.getAuthUser();
    }, []);

    const user = userService.user;
    console.log(user);

    if (!user) return null;

    return (
        <AppPanel
            id={id}

            className=" flex flex-col flex-1"
        >

            <div
                className={twJoin(
                    "relative  px-2",
                    "flex flex-1 justify-center items-center w-full",
                    "transition-all feed-bg",
                    getAppBg(progress)
                )}
            >

                <SwipeCard
                    onProgress={(progress) => {
                        setProgress(progress);

                        // if (progress > 0.5)
                        //     return document.documentElement.classList.add("dislike-theme");
                        // if (progress < -0.5)
                        //     return document.documentElement.classList.add("like-theme");
                        //
                        // document.documentElement.classList.remove("like-theme");
                        // document.documentElement.classList.remove("dislike-theme");
                    }}
                    onTop={() => {
                        console.log("top");
                    }}
                    onBottom={() => {
                        console.log("bottom");
                    }}
                    // heightContainer={heightContainer}
                >
                    {(shiftPercent: number) => (
                        <div
                            className={twJoin(
                                "relative select-none h-full w-full z-10",
                                "pb-[20px] pt-[10px] pl-[10px] pr-[10px]",
                                "overflow-hidden rounded-t-[17px] rounded-b-[41.5px]",
                            )}
                        >
                            {getRatingBackground(progress)}

                            <img
                                style={{
                                    borderRadius: 28,
                                    width       : "100%",
                                    boxShadow   : "0px 4px 4px 0px rgba(0, 0, 0, 0.35)",
                                }}
                                src={user.photo_max_orig}
                                alt={user.first_name}
                            />

                            <Spacing size={10} />

                            <div className="flex items-center pl-[26px] pr-[26px]">
                                <Title
                                    className="flex items-center gap-1"
                                    level="2"
                                >
                                    {getRatingNumber(progress, 834)} {getRatingIcon(progress)}
                                </Title>
                                <div className="pl-[26px] pr-[44px]">
                                    <Title>{user.first_name}</Title>
                                    <Title>{user.last_name}</Title>
                                </div>
                                <UsersIcon />
                            </div>
                        </div>
                    )}
                </SwipeCard>

            </div>

        </AppPanel>
    );
}

export default observer(Main);
