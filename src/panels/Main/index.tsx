import React, { CSSProperties, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { socialRatingService, userService } from "@/services";
import AppPanel from "@components/AppPanel";
import { ErrorMessage, SwipeCard } from "@/components";
import { Spacing, Title } from "@vkontakte/vkui";
import { twJoin } from "tailwind-merge";

import './feed.scss';
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import { getAppBg, getRatingBackground, getRatingIcon, getRatingNumber, getUsersIcon } from "@panels/Main/utils.tsx";
import { UserSwipeCard } from "@panels/Main/components/UserSwipeCard.tsx";
import { HateEffect } from "@panels/Main/components/HateEffect.tsx";

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

    const [showHateEffect, setShowHateEffect] = useState(false);

    const onHate = () => {
        console.log('I hate this nigga');

        setShowHateEffect(true);

        setTimeout(() => {
            setShowHateEffect(false);
        }, 1510);
    }

    const onLike = () => {
        console.log('God damn, I like this dude!');
    }

    return (
        <AppPanel
            id={id}
        >
            <TopSearchBar />

            <div
                className={twJoin(
                    "relative px-2",
                    "flex flex-col flex-1 justify-center items-center w-full",
                    "transition-all",
                    getAppBg(progress)
                )}
            >

                <HateEffect show={showHateEffect} />

                {
                    user
                        ? <UserSwipeCard
                            user={user}
                            progress={progress}
                            setProgress={setProgress}
                            onLike={onLike}
                            onHate={onHate}
                        />
                        : <ErrorMessage>Не удалось загрузить пользователя</ErrorMessage>
                }

            </div>

        </AppPanel>
    );
}

export default observer(Main);
