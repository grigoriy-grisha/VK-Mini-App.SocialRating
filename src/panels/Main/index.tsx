import React, { CSSProperties, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { feedService, socialRatingService, userService } from "@/services";
import AppPanel from "@components/AppPanel";
import { ErrorMessage, SwipeCard } from "@/components";
import { Spacing, Title } from "@vkontakte/vkui";
import { twJoin } from "tailwind-merge";

import './feed.scss';
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import { getAppBg, getRatingBackground, getRatingIcon, getRatingNumber, getUsersIcon } from "@panels/Main/utils.tsx";
import { UserSwipeCard } from "@panels/Main/components/UserSwipeCard.tsx";
import { HateEffect } from "@panels/Main/components/HateEffect.tsx";
import { User } from "@/entity/user.ts";

interface IProps {
    id: string;
}

//todo вынести стили в tailwind
function Main({ id }: IProps) {
    const [progress, setProgress] = useState(0);
    console.log(progress)


    const [targetUser, setTargetUser] = useState<User | null>(null);
    const loadNextUser = async () => {
        const nextUser = (await feedService.getNextUser()).data;
        setTargetUser(nextUser)
    };

    useEffect(() => {
        userService.getAuthUser();

        loadNextUser();
    }, []);

    const authUser = userService.user;

    const [showHateEffect, setShowHateEffect] = useState(false);
    const [showLikeEffect, setShowLikeEffect] = useState(false);

    const onHate = async () => {
        console.log('I hate this nigga');

        setShowHateEffect(true);

        setTimeout(async () => {
            setShowHateEffect(false);

            return;
            if(!targetUser) return;

            // Send request to rate the user
            const result = (await socialRatingService.hate(targetUser.uid));

            if(result.status) setTargetUser(result.data); // We get the next user
            else loadNextUser(); // If we get an error, load the next user.
        }, 1510);
    }

    const onLike = async () => {

        setShowLikeEffect(true);

        setTimeout(async () => {
            setShowLikeEffect(false);

            return;
            if(!targetUser) return;

            // Send request to rate the user
            const result = (await socialRatingService.like(targetUser.uid));

            if(result.status) setTargetUser(result.data); // We get the next user
            else loadNextUser(); // If we get an error, load the next user.
        }, 1510);
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
                    targetUser
                        ? <UserSwipeCard
                            user={targetUser}
                            progress={progress}
                            setProgress={setProgress}
                            onLike={onLike}
                            onHate={onHate}
                        />
                        : <ErrorMessage>
                            <div className="w-full h-16 p-5 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                Вы оценили всех пользователей😊
                            </div>
                        </ErrorMessage>
                }

            </div>

        </AppPanel>
    );
}

export default observer(Main);
