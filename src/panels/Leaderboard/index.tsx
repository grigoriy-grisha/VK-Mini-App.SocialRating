import { Panel, PanelHeader, Spacing, Title } from "@vkontakte/vkui";
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import React, { useEffect, useState } from "react";
import AppPanel from "@components/AppPanel";

import './rating.scss';
import { VideoBg } from "@panels/Leaderboard/components/VideoBG.tsx";
import { UserList } from "@panels/Leaderboard/components/UserList.tsx";
import { User } from "@/entity/user.ts";
import { LeaderboardTabs } from "@panels/Leaderboard/components/LeaderboardTabs.tsx";
import { leaderboardService } from "@/services";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";

interface IProps {
    id: string
}

export enum LeaderboardTabsEnum {
    HALL_OF_FAME = 'Зал славы',
    TOP_100 = 'Топ-100',
    TOP_10 = 'Топ-10',
}

function Leaderboard({ id }: IProps) {

    const [currentTab, setCurrentTab] = useState<LeaderboardTabsEnum>(LeaderboardTabsEnum.TOP_100);

    useEffect(() => {
        if(currentTab === LeaderboardTabsEnum.TOP_100)
            leaderboardService.getTopUsers(100);

        if(currentTab === LeaderboardTabsEnum.TOP_10)
            leaderboardService.getTopUsers(10);

        if(currentTab === LeaderboardTabsEnum.HALL_OF_FAME)
            leaderboardService.getHallOfFameUsers();
    }, [currentTab]);

    const users: User[] = leaderboardService.users; // Top 100 or top 10

    return <AppPanel
        id={id}
        className="flex flex-col"
    >
        <div className="rating-page flex flex-col items-center flex-1 w-full">

            <TopSearchBar>
                Рейтинг
            </TopSearchBar>

            <Spacing size={83}/>

            <VideoBg />

            <LeaderboardTabs
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />

            <Spacing size={10} />

            <UserList users={users} />

        </div>

    </AppPanel>
}

export default observer(Leaderboard)

