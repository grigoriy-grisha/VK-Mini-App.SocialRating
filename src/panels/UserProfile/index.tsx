import { Panel, PanelHeader, Title } from "@vkontakte/vkui";
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import React from "react";

interface IProps {
    id: string
}

function UserProfile({id}: IProps) {
    return <Panel id={id}>

        <TopSearchBar>
            <Title>
                Профиль
            </Title>
        </TopSearchBar>
    </Panel>
}

export default UserProfile
