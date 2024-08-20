import { Panel } from "@vkontakte/vkui";
import React, { useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    getHeight?: (height: number) => void;
}

function AppPanel({ id, children, getHeight, className }: IProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if(!ref.current) return;

        setHeight(ref.current.offsetHeight);
        getHeight && getHeight(ref.current.offsetHeight);
    }, [getHeight]);

    return (
        <Panel id={id}>
            <div
                ref={ref}
                className={twMerge(
                    "",
                    className
                )}
                style={{ width: "100%", height: "100vh" }}
            >
                {children}
            </div>
        </Panel>
    );
}

export default AppPanel;
