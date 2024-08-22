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
            className="flex justify-center min-h-full font-vk select-none relative"
            style={{
                background: "url(/background.png)",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
        >
            <div
                className="overflow-hidden flex flex-col w-full xs:max-w-[367px]"
            >
                <div className="pb-20 flex flex-1 max-h-screen">
                    {children}
                </div>

                {/*<BottomNavigation />*/}
                <BottomNavigationBubble />
            </div>
        </div>
    );
};
