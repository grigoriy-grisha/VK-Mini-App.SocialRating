import React from "react";

import { BottomNavigation } from "@/components";

interface IProps {
    children: React.ReactElement;
}

export const AppLayout = ({ children }: IProps) => {

    return (
        <div
            // activeStory={}
            className="h-full w-full bg-app"
        >
            <div>
                {children}
                <BottomNavigation />
            </div>
        </div>
    );
}
