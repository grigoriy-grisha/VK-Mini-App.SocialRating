import { useEffect, useState } from "react";
import { Div } from "@vkontakte/vkui";
import { twJoin } from "tailwind-merge";
import { useActiveVkuiLocation, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon28CheckCircleOutline, Icon28ListOutline, Icon28UserCircleOutline } from "@vkontakte/icons";
import { DEFAULT_VIEW_PANELS, DEFAULT_VIEW_URLS } from "@/routes.ts";

export const BottomNavigation = () => {
    const { panel } = useActiveVkuiLocation();
    const routeNavigator = useRouteNavigator();

    const navigation = [
        { title: "Топ", panel: DEFAULT_VIEW_PANELS.main, Icon: Icon28ListOutline, offset: "translate-x-0" },
        { title: "Лента", panel: DEFAULT_VIEW_PANELS.rating, Icon: Icon28CheckCircleOutline, offset: "translate-x-16" },
        { title: "Профиль", panel: DEFAULT_VIEW_PANELS.userProfile, Icon: Icon28UserCircleOutline, offset: "translate-x-32" },
        // { title: "Настройки", link: '/settings', Icon: BsGear, offset: "translate-x-48" },
        // { title: "Профиль", link: '/profile1', Icon: BsPerson, offset: "translate-x-64" },
    ];

    const [active, setActive] = useState<null | number>(null);

    useEffect(() => {
        const index = navigation.findIndex((item) => item.panel == panel);
        setActive(index !== -1 ? index : null);
    }, [panel, navigation]);

    return (
        <Div className="">
            <div className="fixed left-0 right-0 bottom-0 h-[5.05rem] bg-app w-screen mx-auto"></div>
            <div
                className={twJoin(
                    "max-h-[4.4rem] rounded-xl flex justify-center",
                    "fixed bottom-[5px] left-1/2 -translate-x-1/2 xs:w-[calc(100vw-10px)] w-screen",
                    "bg-app-dark shadow-md shadow-app",
                )}
            >
                <ul className="flex relative">
                    {/* Bubble */}
                    <span
                        className={twJoin(
                            "bg-indigo-600 border-4 border-app",
                            "h-16 w-16 absolute -top-6",
                            "duration-500 rounded-full will-change-transform",
                            active !== null ? navigation[active].offset : 'hidden'
                        )}
                    >

                        {/* Rounded corner shadows */}
                        <span
                            className={twJoin(
                                "shadow-mobile-bottom-menu-1 shadow-app bg-transparent",
                                "w-3.5 h-3.5 absolute top-5 -left-[19px] rounded-tr-[11px]",
                            )}
                        />

                        {/* Rounded corner shadows */}
                        <span
                            className={twJoin(
                                "shadow-mobile-bottom-menu-2 shadow-app bg-transparent",
                                "w-3.5 h-3.5 absolute top-5 -right-[18px] rounded-tl-[11px]",
                            )}
                        />
                    </span>

                    {navigation.map((item, i) => (
                        <li
                            key={i}
                            className="w-16 cursor-pointer"
                        >
                            <div
                                onClick={() => routeNavigator.push(DEFAULT_VIEW_URLS[item.panel])}
                                className="flex flex-col justify-center items-center text-center pt-6"
                            >
                                <span
                                    className={twJoin(
                                        "text-xl mb-1 duration-500 pointer-events-none select-none z-[1]",
                                        i === active && "-mt-[1.8rem] text-white"
                                    )}
                                >
                                    <item.Icon />
                                </span>

                                <span
                                    className={twJoin(
                                        "text-xs will-change-transform pointer-events-none select-none",
                                        active === i
                                            ? "translate-y-4 duration-700 opacity-100"
                                            : "opacity-0 translate-y-10"
                                    )}
                                >
                                    {item.title}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Div>
    );
}