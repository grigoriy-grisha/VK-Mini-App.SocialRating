import React, { memo, FC, useState } from 'react';
import { twJoin } from "tailwind-merge";
import { getAppBg, getRatingBackground, getRatingIcon, getRatingNumber, getUsersIcon } from "@panels/Main/utils.tsx";
import { SwipeCard } from "@/components";
import { User } from "@/entity/user.ts";
import { SetState } from "@/types/types.tsx";
import { UsersIconDefault } from "@panels/Main/Icons";

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

    if(!user) return null;

    console.log(user)

    return (
        <SwipeCard
            progress={progress}
            onProgress={(progress) => {
                setProgress(progress);
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
                        "overflow-hidden",
                    )}
                    style={{
                        boxShadow: "5px 4px 10px 0px #00000040, 1px 1px 0px 0px #FFFFFF40 inset",
                        border: "1px solid #FFFFFF52",
                        background: "#48319D52",
                        borderRadius: '30px'
                    }}
                >
                    {/*{getRatingBackground(progress)}*/}

                    <img
                        style={{
                            borderRadius: 28,
                            width       : "100%",
                            boxShadow   : "0px 4px 4px 0px rgba(0, 0, 0, 0.35)",
                        }}
                        src={user.photo_base}
                        alt={user.first_name}
                    />

                    <div
                        className="relative flex items-center justify-between px-[23px]"
                    >
                        {/* .text-adaptive-color */}
                        <span
                            className="holo-font rating flex items-center gap-1"
                            style={{ fontSize: '23px', fontWeight: 700 }}
                        >
                            {getRatingNumber(progress, user.social_rating?.total || 0)} {getRatingIcon(progress)}
                        </span>

                        <div
                            className="w-full min-h-[93px]"
                            style={{
                                fontSize  : Math.max(user.first_name.length, user.last_name.length) > 10 ? '28' : '36px',
                                fontWeight: 700,
                                lineHeight: '33px'
                            }}
                        >
                            <div className="absolute inset-0 flex items-center overflow-visible">
                                <div className="mx-auto flex flex-wrap justify-center gap-x-2 max-w-[200px] holo-font">
                                    <h1 className="py-[3px]">{user.first_name}</h1>
                                    <h2 className="py-[3px]">{user.last_name}</h2>
                                </div>
                            </div>
                        </div>

                        <UsersIconDefault />
                    </div>
                </div>
            )}
        </SwipeCard>
    );
});