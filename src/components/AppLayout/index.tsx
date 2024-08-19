import React from "react";

import { BottomNavigation } from "@/components";

interface IProps {
    children: React.ReactElement;
}

export const AppLayout = ({ children }: IProps) => {
    return (
        <div className="bg-app-gradient flex justify-center">
            <div style={{ maxWidth: 360 }}>
                {children}
                <BottomNavigation />
            </div>
        </div>
    );
};
