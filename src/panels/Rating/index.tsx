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
            Рейтинг
        </TopSearchBar>

        <div className="rating-page flex flex-1 w-full">


            <video
                className="video-background object-cover object-center w-full h-full blur-md opacity-60"
                autoPlay
                loop
                muted
                onPlay={(e) => e.currentTarget.playbackRate = 0.37}
            >
                <div className="animated-bg" />

                <source
                    src="/rating/background_3.mp4"
                    type="video/mp4"
                >
                </source>
            </video>

        </div>
    </AppPanel>
}

export default Rating

