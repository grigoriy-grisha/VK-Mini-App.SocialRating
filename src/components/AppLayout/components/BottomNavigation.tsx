import { useEffect, useMemo, useState } from "react";
import {
    useActiveVkuiLocation,
    useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import {
    Icon28CheckCircleOutline,
    Icon28ListOutline,
    Icon28UserCircleOutline,
} from "@vkontakte/icons";
import { DEFAULT_VIEW_PANELS } from "@/routes.ts";

import './bottomNavigation.scss';

export const BottomNavigation = () => {
    const { panel } = useActiveVkuiLocation();
    const routeNavigator = useRouteNavigator();

    const navigation = useMemo(() => ([
        {
            title : "Топ",
            panel : DEFAULT_VIEW_PANELS.rating,
            Icon  : Icon28ListOutline,
        },
        {
            title : "Лента",
            panel : DEFAULT_VIEW_PANELS.main,
            Icon  : Icon28CheckCircleOutline,
        },
        {
            title : "Профиль",
            panel : DEFAULT_VIEW_PANELS.userProfile,
            Icon  : Icon28UserCircleOutline,
        },
    ]), []);

    const [active, setActive] = useState<null | number>(null);

    useEffect(() => {
        const index = navigation.findIndex((item) => item.panel == panel);
        setActive(index !== -1 ? index : null);
    }, [panel, navigation]);

    return (
        <nav className="bottom-navigation">

            <svg xmlns="http://www.w3.org/2000/svg" width="388" height="200" viewBox="0 0 388 200" fill="none">
                <g filter="url(#filter0_d_2630_787)">
                    <path id="bottom-navigation-clip-path" fillRule="evenodd" clipRule="evenodd" d="M101.756 99.2535C114.436 102.13 126.861 107.509 139.864 107.509H351.289C365.489 107.509 377 119.02 377 133.22V151C377 170.882 360.882 187 341 187H46C26.1177 187 10 170.882 10 151V133.22C10 119.02 21.5112 107.509 35.711 107.509H41.0987C54.1014 107.509 66.5264 102.13 79.2069 99.2535C82.8166 98.4347 86.5932 98 90.4813 98C94.3694 98 98.146 98.4347 101.756 99.2535Z" fill="url(#paint0_linear_2630_787)"/>
                </g>
                <defs>
                    <linearGradient id="paint0_linear_2630_787" x1="10" y1="141.5" x2="377" y2="141.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3C397E"/>
                        <stop offset="1" stopColor="#0A0A1B"/>
                    </linearGradient>
                </defs>
            </svg>

            <div
                className="bg-rectangle"
            >

            </div>

            {/*<div*/}
            {/*    className={twJoin(*/}
            {/*        "max-h-[4.4rem] rounded-xl flex justify-center",*/}
            {/*        "absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[calc(100%-10px)]",*/}
            {/*        "bg-app-dark shadow-md shadow-app",*/}
            {/*    )}*/}
            {/*>*/}
            {/*    <ul className="flex relative">*/}
            {/*        /!* Bubble *!/*/}
            {/*        <span*/}
            {/*            className={twJoin(*/}
            {/*                "bg-indigo-600 border-4 border-app",*/}
            {/*                "h-16 w-16 absolute -top-6",*/}
            {/*                "duration-500 rounded-full will-change-transform",*/}
            {/*                active !== null ? navigation[active].offset : "hidden",*/}
            {/*            )}*/}
            {/*        >*/}
            {/*            /!* Rounded corner shadows *!/*/}
            {/*            <span*/}
            {/*                className={twJoin(*/}
            {/*                    "shadow-mobile-bottom-menu-1 shadow-app bg-transparent",*/}
            {/*                    "w-3.5 h-3.5 absolute top-5 -left-[19px] rounded-tr-[11px]",*/}
            {/*                )}*/}
            {/*            />*/}

            {/*            /!* Rounded corner shadows *!/*/}
            {/*            <span*/}
            {/*                className={twJoin(*/}
            {/*                    "shadow-mobile-bottom-menu-2 shadow-app bg-transparent",*/}
            {/*                    "w-3.5 h-3.5 absolute top-5 -right-[18px] rounded-tl-[11px]",*/}
            {/*                )}*/}
            {/*            />*/}
            {/*        </span>*/}

            {/*        {navigation.map((item, i) => (*/}
            {/*            <li*/}
            {/*                key={i}*/}
            {/*                className="w-16 cursor-pointer"*/}
            {/*            >*/}
            {/*                <div*/}
            {/*                    onClick={() =>*/}
            {/*                        routeNavigator.push(DEFAULT_VIEW_URLS[item.panel])*/}
            {/*                    }*/}
            {/*                    className="flex flex-col justify-center items-center text-center pt-6"*/}
            {/*                >*/}
            {/*                    */}
            {/*                    <span*/}
            {/*                        className={twJoin(*/}
            {/*                            "mb-1 duration-500 pointer-events-none select-none z-[1]",*/}
            {/*                            i === active && "-mt-[1.8rem] text-white",*/}
            {/*                        )}*/}
            {/*                    >*/}
            {/*                        <item.Icon className="scale-125"/>*/}
            {/*                    </span>*/}

            {/*                    <span*/}
            {/*                        className={twJoin(*/}
            {/*                            "text-xs will-change-transform pointer-events-none select-none",*/}
            {/*                            active === i*/}
            {/*                                ? "translate-y-4 duration-700 opacity-100"*/}
            {/*                                : "opacity-0 translate-y-10",*/}
            {/*                        )}*/}
            {/*                    >*/}
            {/*                        {item.title}*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </nav>
    );
};
