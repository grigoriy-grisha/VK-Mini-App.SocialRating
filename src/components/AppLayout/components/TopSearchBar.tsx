import React, { memo, FC, ReactNode, useState, useEffect, useRef } from 'react';

import backIcon from '../assets/back.svg';
import searchIcon from '../assets/search.svg';
import { twJoin } from "tailwind-merge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Title } from "@vkontakte/vkui";
import { User } from "@/entity/user.ts";
import { UserListItem } from "@components/UserListItem";
import { userService } from "@/services";

// const friendsList: User[] = [{
//     first_name: 'Вася',
//     last_name : 'Пушкин'
// }, {
//     first_name: 'Георгий',
//     last_name : 'Буберяшвилли'
// }, {
//     first_name: 'Георгий',
//     last_name : 'Буберяшвилли'
// }, {
//     first_name: 'Георгий',
//     last_name : 'Буберяшвилли'
// }, {
//     first_name: 'Георгий',
//     last_name : 'Буберяшвилли'
// }, {
//     first_name: 'Георгий',
//     last_name : 'Буберяшвилли'
// }];

// const filteredFriendsList = friendsList.filter(user =>
//     user.first_name.toLowerCase().includes(searchString.toLowerCase()) ||
//     user.last_name.toLowerCase().includes(searchString.toLowerCase())
// );

interface TopSearchBarProps {
    children?: ReactNode;
}

export const TopSearchBar: FC<TopSearchBarProps> = memo(({ children }) => {
    const routeNavigator = useRouteNavigator();

    const searchInputref = useRef<HTMLInputElement>(null);
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);
    const [searchString, setSearchString] = useState('');

    const handleSearchClick = async () => {
        if (!searchString) setIsSearchBarActive(prev => !prev);
        else search(searchString);
    }

    useEffect(() => {
        // Clear search string when close search bar
        if (!isSearchBarActive) setSearchString('');

        if (isSearchBarActive) searchInputref.current?.focus();
    }, [isSearchBarActive]);

    // Close search bar when clicking outside
    const searchContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setIsSearchBarActive(false);
            }
        };

        if (isSearchBarActive) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on component unmount or when search is not active
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchBarActive]);

    const handleSearchFriend = async () => {
        const friend = await userService.getUserFriends();
        search(friend[0].id)
    }

    const search = async (searchString: string|number) => {
        setIsSearchBarActive(false); // Close search bar
        console.log(searchString)

        // Work only if it's id of already registered user :(
        // const result = await userService.getUserById('colorkat');
        // console.log(result)
    }

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
                className="flex p-5 hover:scale-110 origin-center transition-transform will-change-transform"
            >
                <img
                    src={backIcon}
                    alt="Назад"
                />
            </button>

            {/* Title */}
            {
                children && <div
                    className={twJoin(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "transition-opacity",
                        isSearchBarActive ? "opacity-0" : "opacity-100 delay-500"
                    )}
                >
                    <Title
                        style={{ fontSize: '25px', fontWeight: 700 }}
                    >
                        {children}
                    </Title>
                </div>
            }

            {/*  Search  */}
            <div className="w-full" ref={searchContainerRef}>
                <div
                    className="p-5 relative w-full h-max"
                >
                    <input
                        ref={searchInputref}
                        className={twJoin(
                            "w-full h-10 right-2.5 top-1/2 -translate-y-1/2 transition-all duration-700",
                            "pr-10 p-5",
                            isSearchBarActive ? "max-w-[400px] opacity-100" : "max-w-0 opacity-0",
                            "absolute rounded-full bg-white/30 backdrop-blur-sm",
                            "focus:outline-none focus:ring-2 ring-white/40 border-white/50"
                        )}
                        onChange={(e) => setSearchString(e.target.value)}
                        value={searchString}
                        type="text"
                        placeholder="Id профиля или ссылка"
                    />

                    <button
                        className="relative ml-auto flex z-10"
                        onClick={handleSearchClick}
                    >
                        <img
                            src={searchIcon}
                            alt="Поиск"
                        />
                    </button>
                </div>

                {/* List of friends for search */}
                <div
                    className={twJoin(
                        "absolute px-5 top-20 bg-white/30 backdrop-blur-xl left-5 right-5 z-10 rounded-2xl shadow-[0px_100px_100px_50px_rgba(10,10,50,0.6)]",
                        "transition-all duration-100 ease-in h-max overflow-y-scroll no-scrollbar",
                        isSearchBarActive ? "h-[450px] py-5 opacity-100 delay-300" : "max-h-0 h-0 opacity-100",
                        "flex flex-col gap-5"
                    )}
                >
                    <img
                        className="rounded-full mx-auto w-4/5"
                        src="https://files.oaiusercontent.com/file-hspzUhIerGtALIAXz1M6JWLK?se=2024-10-02T17%3A20%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D6f283531-af22-4793-8684-b08170bea24f.webp&sig=IUlneBf4WuzOEavEL6mwgBRoOoxzBrP4FfdjX1Wsw1U%3D"
                        alt=""
                    />

                    <p className="text-zinc-900 my-auto">
                        Оценивайте других пользователей и получайте оценки в ответ! <br/>
                        Пользователи с наибольшим рейтингом получат ценные призы.
                    </p>

                    <button
                        className="bg-white/50 hover:bg-white/60 transition-colors p-3 text-xl font-bold text-black rounded-lg mt-auto"
                        onClick={handleSearchFriend}
                    >
                        Поиск среди друзей
                    </button>

                    {/*{filteredFriendsList.map((friend: User) =>*/}
                    {/*    <UserListItem user={friend} key={friend.uid} />*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
});