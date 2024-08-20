import React, { memo, FC, ReactNode } from 'react';

import backIcon from '../assets/back.svg';
import searchIcon from '../assets/search.svg';
import { twJoin } from "tailwind-merge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Title } from "@vkontakte/vkui";

interface TopSearchBarProps {
    children?: ReactNode;
}

export const TopSearchBar: FC<TopSearchBarProps> = memo(({ children }) => {
    const routeNavigator = useRouteNavigator();

    return (
        <div
            className={twJoin(
                "absolute top-0 flex justify-between items-center w-full z-20",
                "py-5 px-3"
            )}
        >
            {/* Back */}
            <button
                onClick={() => routeNavigator.back()}
                className="p-5 hover:scale-110 origin-center transition-transform will-change-transform"
            >
                <img
                    src={backIcon}
                    alt="Назад"
                />
            </button>

            {/* Title */}
            {
                children && <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <Title
                        style={{ fontSize: '25px', fontWeight: 700 }}
                    >
                        {children}
                    </Title>
                </div>
            }

            {/*  Search  */}
            <button
                className="p-5"
            >
                <img
                    src={searchIcon}
                    alt="Поиск"
                />
            </button>
        </div>
    );
});