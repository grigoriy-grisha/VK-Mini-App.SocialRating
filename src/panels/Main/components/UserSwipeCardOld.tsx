import React, { memo, FC, useState } from 'react';
import { twJoin } from "tailwind-merge";
import { getAppBg, getRatingBackground, getRatingIcon, getRatingNumber, getUsersIcon } from "@panels/Main/utils.tsx";
import { SwipeCard } from "@/components";
import { User } from "@/entity/user.ts";
import { SetState } from "@/types/types.tsx";

interface UserSwipeCardProps {
    user: User;
    progress: number;
    setProgress: SetState<number>;

    onLike: () => void;
    onHate: () => void;
}

export const UserSwipeCard: FC<UserSwipeCardProps> = memo(({
    user,
    progress,
    setProgress,
    onLike,
    onHate
}) => {

    if(!user) return;

    return (
        <SwipeCard
            progress={progress}
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
            onTop={onLike}
            onBottom={onHate}
        >
            {(shiftPercent: number) => (
                <div
                    className={twJoin(
                        "relative select-none z-10",
                        "max-h-[450px] max-w-[360px] mx-auto",
                        "pb-[0px] pt-[10px] pl-[5px] pr-[5px]",
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

                    <div
                        className="relative flex items-center justify-between px-[23px]"
                    >
                        <span
                            className="text-adaptive-color rating flex items-center gap-1"
                            style={{ fontSize: '23px', fontWeight: 700 }}
                        >
                            {getRatingNumber(progress, user.social_rating?.total || 0)} {getRatingIcon(progress)}
                        </span>

                        <div
                            className="w-full min-h-[93px]"
                            style={{
                                fontSize  : Math.max(user.first_name?.length, user.last_name?.length) > 10 ? '28' : '36px',
                                fontWeight: 700,
                                lineHeight: '33px'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="mx-auto flex flex-wrap justify-center gap-x-2 max-w-[200px] text-adaptive-color">
                                    <h1>{user.first_name}</h1>
                                    <h2>{user.last_name}</h2>
                                </div>
                            </div>
                        </div>

                        {getUsersIcon(progress)}
                    </div>
                </div>
            )}
        </SwipeCard>
    );
});