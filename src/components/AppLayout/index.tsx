import React from "react";
import { BottomNavigationBubble } from "@components/AppLayout/components/BottomNavigationBubble.tsx";
import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import { Title } from "@vkontakte/vkui";


interface IProps {
    children: React.ReactElement;
}

export const AppLayout = ({ children }: IProps) => {
    return (
        <div
            className="flex justify-center min-h-full"
            style={{
                background: "url(/background.png)",
                backgroundSize: "cover"
            }}
        >
            <div
                className="overflow-hidden flex flex-col w-full sm:max-w-[400px]"
            >
                <div className="pb-[5.05rem] flex flex-1">
                    {children}
                </div>

                {/*<BottomNavigation />*/}
                <BottomNavigationBubble />
            </div>
        </div>
    );
};
