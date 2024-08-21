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

interface IProps {
    id: string;
}

//todo вынести стили в tailwind
function Main({ id }: IProps) {

    useEffect(() => {
        userService.getAuthUser();
    }, []);

    const user = userService.user;

    return (
        <AppPanel
            id={id}
        >
            <TopSearchBar />

            {
                user
                    ? <UserSwipeCard user={user} />
                    : <ErrorMessage>Не удалось загрузить пользователя</ErrorMessage>
            }

        </AppPanel>
    );
}

export default observer(Main);
