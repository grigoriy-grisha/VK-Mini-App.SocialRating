import React, { CSSProperties, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { socialRatingService, userService } from "@/services";
import AppPanel from "@components/AppPanel";
import { SwipeCard } from "@/components";
import { Spacing, Title } from "@vkontakte/vkui";
import { twJoin } from "tailwind-merge";

import './feed.scss';
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import { getAppBg, getRatingBackground, getRatingIcon, getRatingNumber, getUsersIcon } from "@panels/Main/utils.tsx";

interface IProps {
    id: string;
}

//todo вынести стили в tailwind
function Main({ id }: IProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        userService.getAuthUser();
    }, []);

    const user = userService.user;

    if (!user) return null;

    return (
        <AppPanel
            id={id}
        >
            <TopSearchBar />

            <div
                className={twJoin(
                    "relative px-2",
                    "flex flex-1 justify-center items-center w-full",
                    "transition-all",
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

                            <div
                                className="relative flex items-center justify-between px-[20px]"
                            >
                                <span
                                    className="text-adaptive-color rating flex items-center gap-1"
                                    style={{ fontSize: '23px', fontWeight: 700 }}
                                >
                                    {getRatingNumber(progress, user?.social_rating.total)} {getRatingIcon(progress)}
                                </span>

                                <div
                                    className="w-full min-h-[83px]"
                                    style={{
                                        fontSize  : Math.max(user.first_name.length, user.last_name.length) > 10 ? '28' : '36px',
                                        fontWeight: 700,
                                        lineHeight: '33px'
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="mx-auto flex flex-wrap justify-center gap-x-2 max-w-[200px] text-adaptive-color">
                                            <h1>{user.first_name}1</h1>
                                            <h2>{user.last_name}</h2>
                                        </div>
                                    </div>
                                </div>

                                {getUsersIcon(progress)}
                            </div>
                        </div>
                    )}
                </SwipeCard>
            </div>
        </AppPanel>
    );
}

export default observer(Main);
