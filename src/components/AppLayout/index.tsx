import React from "react";

import { BottomNavigation } from "@/components";
import { BottomNavigationBubble } from "@components/BottomNavigationBubble";

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
                style={{ maxWidth: 400, width: "100%" }}
                className="overflow-hidden flex flex-col"
            >
                <div className="pb-[5.05rem] flex flex-1">
                    {children}
                </div>

                <BottomNavigation />
                {/*<BottomNavigationBubble />*/}
            </div>
        </div>
    );
};
