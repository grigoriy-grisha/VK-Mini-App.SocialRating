import React, { memo, FC } from 'react';
import { User } from "@/entity/user.ts";
import { twJoin } from "tailwind-merge";
import { userService } from "@/services";
import { Text, Title } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { ErrorMessage } from "@/components";

interface TopUsersProps {
    users: User[];
}

export const UserList: FC<TopUsersProps> = memo(({
    users
}) => {
    const authUserVkUserId = userService.vkUserId;

    const routeNavigator = useRouteNavigator();

    if(!users) return <ErrorMessage>Не удалось загрузить пользователей</ErrorMessage>;

    if(users.length == 0) return <ErrorMessage>В топе пока никого нет😱</ErrorMessage>;
    // users = [...users, ...users, ...users,...users, ...users, ...users,...users, ...users, ...users,...users, ...users, ...users,...users, ...users, ...users,...users, ...users, ...users,...users, ...users, ...users,...users, ...users, ...users,];

    return (
        <ul className="relative flex flex-col w-full px-1.5 text-white z-10">
            {users.map((user, i) => {
                if(!user) return null;

                return (
                    <li
                        key={user.uid}
                        className={twJoin(
                            "flex items-center rounded-2xl w-full h-20 px-3.5",
                            (+user.uid == authUserVkUserId) && "bg-white/10 backdrop-blur-sm shadow-inner shadow-white/5",
                            "cursor-pointer"
                        )}
                        onClick={() => routeNavigator.push(`/users/${user.uid}`)}
                    >

                        {/* Position */}
                        <div style={{ fontSize: '14px' }}>
                            {i + 1}
                        </div>

                        {/*  Avatar   */}
                        <div className="px-4">
                            <img
                                src={user.photo_100}
                                className="w-12 h-12 rounded-[14px]"
                            />
                        </div>

                        {/*  Name and rating  */}
                        <div className="flex flex-col gap-1 flex-1">
                            <Title
                                className=""
                                style={{ fontSize: '14px', fontWeight: 700, color: '#eeeeee' }}
                            >
                                {user.first_name + ' ' + user.last_name}
                            </Title>

                            <div
                                className=""
                                style={{ fontSize: '12px', fontWeight: 400, color: '#8d8d8f' }}
                            >
                                Рейтинг: {user.social_rating.total}
                            </div>
                        </div>

                        {/*  Gift  */}
                        {i === 0 && (
                            <img
                                src="/rating/cup.png"
                                alt="🎁"
                            />
                        )}

                        {user.hasWon &&(
                            <img
                                src="/logo.svg"
                                alt="🎁"
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
});