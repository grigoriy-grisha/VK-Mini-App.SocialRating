import { Panel, PanelHeader, Title } from "@vkontakte/vkui";
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import React from "react";
import AppPanel from "@components/AppPanel";

import './rating.scss';

interface IProps {
    id: string
}

function Rating({id}: IProps) {
    return <AppPanel
        id={id}
        className=""
    >
        <TopSearchBar>
            <Title>
                Рейтинг
            </Title>
        </TopSearchBar>

        <div className="rating-page flex flex-1 w-full">


            <div className="animated-bg"></div>

        </div>
    </AppPanel>
}

export default Rating

