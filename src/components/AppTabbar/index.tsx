import React from "react";

import { Epic, Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { DEFAULT_VIEW_PANELS, DEFAULT_VIEW_URLS } from "@/routes.ts";
import {
    Icon28CheckCircleOutline,
    Icon28ListOutline,
    Icon28UserCircleOutline,
} from "@vkontakte/icons";

interface IProps {
    children: React.ReactElement;
}

function AppTabbar({ children }: IProps) {
    const { panel } = useActiveVkuiLocation();
    const routeNavigator = useRouteNavigator();

    return (
        <Epic
            activeStory=""

            tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={() => routeNavigator.push(DEFAULT_VIEW_URLS.main)}
                        selected={panel === DEFAULT_VIEW_PANELS.main}
                        data-story="vote"
                        text="Голосовать"
                    >
                        <Icon28CheckCircleOutline />
                    </TabbarItem>
                    <TabbarItem
                        onClick={() => {
                            console.log("123");
                            routeNavigator.push(DEFAULT_VIEW_URLS.userProfile);
                        }}
                        selected={panel === DEFAULT_VIEW_PANELS.userProfile}
                        data-story="profile"
                        text="Профиль"
                    >
                        <Icon28UserCircleOutline />
                    </TabbarItem>
                    <TabbarItem
                        onClick={() => routeNavigator.push(DEFAULT_VIEW_URLS.rating)}
                        selected={panel === DEFAULT_VIEW_PANELS.rating}
                        data-story="rating"
                        text="Рейтинг"
                    >
                        <Icon28ListOutline />
                    </TabbarItem>
                </Tabbar>
            }
        >
            {children}
        </Epic>
    );
}

export default AppTabbar;
