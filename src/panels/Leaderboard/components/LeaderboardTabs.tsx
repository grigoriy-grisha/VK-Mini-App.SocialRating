import React, {memo, FC} from 'react';
import { LeaderboardTabsEnum } from "@panels/Leaderboard";
import { twJoin } from "tailwind-merge";

interface TopToggleTabsProps {
    currentTab: LeaderboardTabsEnum;
    setCurrentTab: (tab: LeaderboardTabsEnum) => void;
}

export const LeaderboardTabs: FC<TopToggleTabsProps> = memo(({
    currentTab,
    setCurrentTab
}) => {


    return (
        <div className="relative w-full text-sm text-white">
            <div className="flex mx-auto divide-x divide-white/40 rounded-[11px] h-[37px] w-10/12 whitespace-nowrap overflow-hidden shadow backdrop-blur-sm">
                <button
                    className={twJoin(
                        "rounded-[11px] rounded-r-none",
                        "h-full w-1/2 px-3 flex items-center justify-center",
                        currentTab === LeaderboardTabsEnum.TOP_100 ? "bg-white/30 shadow-inner" : "bg-white/20",
                        "hover:bg-white/30"
                    )}
                    onClick={() => setCurrentTab(LeaderboardTabsEnum.TOP_100)}
                >
                    Топ-100
                </button>

                <button
                    className={twJoin(
                        "rounded-[11px] rounded-l-none",
                        "h-full w-1/2 px-3 flex items-center justify-center",
                        currentTab === LeaderboardTabsEnum.HALL_OF_FAME ? "bg-white/30 shadow-inner" : "bg-white/20",
                        "hover:bg-white/30"
                    )}
                    onClick={() => setCurrentTab(LeaderboardTabsEnum.HALL_OF_FAME)}
                >
                    Зал славы
                </button>
            </div>
        </div>
    );
});