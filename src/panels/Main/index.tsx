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
import { VideoBg } from "@components/VideoBG/VideoBG.tsx";
import { useBlink } from "@hooks/useBlink.ts";
import { VotesCount } from "@components/VotesCount";
import { LikeEffect } from "@panels/Main/components/LikeEffect.tsx";

interface IProps {
    id: string;
}

//todo вынести стили в tailwind
function Main({ id }: IProps) {
    const [progress, setProgress] = useState(0);
    const [infoMessage, setInfoMessage, blinkInfoMessage] = useBlink<string>('');

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
    const authUserVotesCount = authUser?.votes || 0;

    const [showHateEffect, setShowHateEffect] = useState(false);
    const [showLikeEffect, setShowLikeEffect] = useState(false);

    const onHate = async () => {
        setShowHateEffect(true);

        setTimeout(async () => {
            setShowHateEffect(false);

            // return;
            if(!targetUser) return;

            // Send request to rate the user
            const response = (await socialRatingService.hate(targetUser.uid));

            if(response.result) setTargetUser(response.data); // We get the next user
            else {
                loadNextUser(); // If we get an error, load the next user.
                blinkInfoMessage(response.error || 'Произошла какая-то ошибка');
            }
        }, 1510);
    }

    const onLike = async () => {

        setShowLikeEffect(true);

        setTimeout(async () => {
            setShowLikeEffect(false);

            // return;
            if(!targetUser) return;

            // Send request to rate the user
            const response = (await socialRatingService.like(targetUser.uid));

            if(response.result) setTargetUser(response.data); // We get the next user
            else {
                loadNextUser(); // If we get an error, load the next user.
                blinkInfoMessage(response.error || 'Произошла какая-то ошибка');
            }
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

                <VideoBg />

                {infoMessage && <div className="absolute bottom-20 w-full">
                    <ErrorMessage>
                        <div className="w-10/12 mx-auto p-1 rounded-2xl bg-indigo-400/20 backdrop-blur-sm text-xsm text-balance">
                            <span className="holo-font">{infoMessage}</span>
                        </div>
                    </ErrorMessage>
                </div>}

                <HateEffect show={showHateEffect} />
                {/*<HateEffect show={true} />*/}

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

                {/*<LikeEffect show={true} />*/}
                <LikeEffect show={showLikeEffect} />


                {/* Display votes count (and hide when swipe) */}
                <div className={twJoin(
                    "absolute bottom-10 transition-opacity duration-200",
                    progress != 0 ? "opacity-0" : "opacity-100",
                )}>
                    <VotesCount votesCount={authUserVotesCount}/>
                </div>

            </div>

        </AppPanel>
    );
}

export default observer(Main);
