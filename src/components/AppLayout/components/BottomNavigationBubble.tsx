import { FC, memo, useEffect, useMemo, useState } from "react";
import { twJoin } from "tailwind-merge";
import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import {
    Icon28CheckCircleOutline,
    Icon28ListOutline,
    Icon28UserCircleOutline,
} from "@vkontakte/icons";
import { DEFAULT_VIEW_PANELS, DEFAULT_VIEW_URLS } from "@/routes.ts";

import './bottomNavigation.scss';

import circleImg from '../assets/circle.png';
import circle1Img from '../assets/circle_1.png';
import circle2Img from '../assets/circle_2.png';
import circle3Img from '../assets/circle_3.png';

import leaderboardIcon from '../assets/leaderboardIcon.svg';
import profileIcon from '../assets/profileIcon.svg';
import emojiIcon from '../assets/emojiIcon.png';

export const Bubble: FC<{ offsetClass: string }> = memo(({ offsetClass }) => {
    const [isBubblePositionChanging, setIsBubblePositionChanging] = useState(false);

    // When offsetClass changes, bubble animation executes for 500ms
    // Disable siri-bubble effect for this time
    useEffect(() => {
        setIsBubblePositionChanging(true);
        setTimeout(() => {
            setIsBubblePositionChanging(false);
        }, 500);
    }, [offsetClass]);

    return (
        <div
            className={twJoin(
                "",
                "bg-[#373576] border-4 border-app",
                "h-16 w-16 absolute -top-6",
                "duration-500 rounded-full will-change-transform",
                offsetClass
            )}
        >
            <div className={twJoin(
                "siri-bubble",
                "transition-opacity duration-500 ease-in-out",
                isBubblePositionChanging ? "opacity-0" : "opacity-100"
            )}>
                <img
                    src={circle1Img}
                    alt=""
                />

                <img
                    src={circle2Img}
                    alt=""
                />

                <img
                    src={circle3Img}
                    alt=""
                />

                <img
                    src={circleImg}
                    alt=""
                />
            </div>

            {/* Rounded corner shadows */}
            <span
                className={twJoin(
                    "shadow-mobile-bottom-menu-1 shadow-app bg-transparent",
                    "w-3.5 h-3.5 absolute top-5 -left-[18px] rounded-tr-[11px]",
                )}
            />

            {/* Rounded corner shadows */}
            <span
                className={twJoin(
                    "shadow-mobile-bottom-menu-2 shadow-app bg-transparent",
                    "w-3.5 h-3.5 absolute top-5 -right-[18px] rounded-tl-[11px]",
                )}
            />
        </div>
    );
});

export const BottomNavigationBubble = () => {
    const { panel } = useActiveVkuiLocation();
    const routeNavigator = useRouteNavigator();

    const navigation = useMemo(() => ([
        {
            title : "Топ",
            panel : DEFAULT_VIEW_PANELS.rating,
            Icon  : leaderboardIcon,
            offset: "translate-x-0",
        },
        {
            title : "Лента",
            panel : DEFAULT_VIEW_PANELS.main,
            Icon  : emojiIcon,
            offset: "translate-x-[6.5rem]",
        },
        {
            title : "Профиль",
            panel : DEFAULT_VIEW_PANELS.userProfile,
            Icon  : profileIcon,
            offset: "translate-x-52",
        },
        // { title: "Настройки", link: '/settings', Icon: BsGear, offset: "translate-x-48" },
        // { title: "Профиль", link: '/profile1', Icon: BsPerson, offset: "translate-x-64" },
    ]), []);

    const [active, setActive] = useState<null | number>(null);

    useEffect(() => {
        const index = navigation.findIndex((item) => item.panel == panel);
        setActive(index !== -1 ? index : null);
    }, [panel, navigation]);

    return (
        <div className="relative">

            {/* Menu bg */}
            <div
                className="absolute left-0 right-0 bottom-0 h-[5.5rem] bg-app w-full mx-auto"
                style={{
                    boxShadow: "0px -0px 10px #1c1b47, 0px -0px 10px #1c1b47",
                }}
            />

            <div
                className={twJoin(
                    "h-20 rounded-t-[36px] flex justify-center",
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-full",
                    "bottom-navigation-bg shadow-md shadow-app",
                )}
            >
                <ul className="flex relative gap-10">
                    {/* Bubble */}
                    <Bubble offsetClass={active !== null ? navigation[active].offset : "hidden"} />

                    {navigation.map((item, i) => (
                        <li
                            key={i}
                            className="w-16 cursor-pointer"
                        >
                            <div
                                onClick={() =>
                                    routeNavigator.push(DEFAULT_VIEW_URLS[item.panel])
                                }
                                className="flex flex-col justify-center items-center text-center pt-5"
                            >
                                
                                <span
                                    className={twJoin(
                                        "mb-1 duration-500 pointer-events-none select-none z-[1]",
                                        i === active && "-mt-[1.9rem] text-white",
                                    )}
                                >
                                    <img
                                        className="h-9 w-9"
                                        src={item.Icon}
                                        alt=""
                                    />
                                </span>

                                <span
                                    className={twJoin(
                                        "text-xs will-change-transform pointer-events-none select-none",
                                        active === i
                                            ? "translate-y-5 duration-700 opacity-100"
                                            : "opacity-0 translate-y-10",
                                    )}
                                >
                                    {item.title}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
