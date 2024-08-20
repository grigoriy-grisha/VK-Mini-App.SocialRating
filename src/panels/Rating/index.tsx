import { Panel, PanelHeader, Spacing, Title } from "@vkontakte/vkui";
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import React from "react";
import AppPanel from "@components/AppPanel";

import './rating.scss';
import { VideoBg } from "@panels/Rating/components/VideoBG.tsx";
import { TopUsers } from "@panels/Rating/components/TopUsers.tsx";
import { User } from "@/entity/user.ts";
import { TopToggleTabs } from "@panels/Rating/components/TopToggleTabs.tsx";

interface IProps {
    id: string
}

function Rating({ id }: IProps) {
    const users: User[] = []; // Top 100 or top 10

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

            <TopToggleTabs />

            <TopUsers users={users} />

        </div>

    </AppPanel>
}

export default Rating

