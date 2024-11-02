import { TopSearchBar } from "@components/AppLayout/components/TopSearchBar.tsx";
import React from "react";
import { observer } from "mobx-react-lite";
import AppPanel from "@components/AppPanel";
import { twJoin } from "tailwind-merge";
import { VideoBg } from "@components/VideoBG/VideoBG.tsx";
import { UserCard } from "@components/UserCard/Index.tsx";
import { userService } from "@/services";
import { ErrorMessage } from "@/components";

interface IProps {
    id: string
}

function UserProfile({ id }: IProps) {

    const authUser = userService.user;

    return <AppPanel
        id={id}
    >
        <TopSearchBar>
            Профиль
        </TopSearchBar>

        <div className="absolute h-24 w-full z-[15] bg-white/ backdrop-blur-xl "></div>


        <VideoBg />


        <div
            className={twJoin(
                "relative px-2 overflow-y-scroll h-screen",
                "flex flex-col items-center w-full",
                "transition-all overflow-y-scroll no-scrollbar pt-24",
            )}
        >
            <div className="h-max relative ">
                <div className="">
                    {authUser
                        ? <UserCard user={authUser} />
                        : <ErrorMessage>
                            Вы не авторизованы
                        </ErrorMessage>
                    }
                </div>


                <div
                    className={twJoin(
                        "relative select-none z-10",
                        "max-w-[360px] mx-auto w-full mt-10 ",
                        "px-3 py-3 flex flex-col gap-3",
                    )}
                    style={{
                        boxShadow   : "5px 4px 10px 0px #00000040, 1px 1px 0px 0px #FFFFFF40 inset",
                        border      : "1px solid #FFFFFF52",
                        background  : "#48319D52",
                        borderRadius: '30px'
                    }}
                >
                    <p className="holo-font font-semibold text-justify">
                        Добро пожаловать в жестокое тоталитарное <b>Будущее</b>, где у каждого человека
                        есть социальный рейтинг, который определяет отношение к нему других людей.
                    </p>


                    <p className="holo-font font-semibold text-justify">
                        <span className="!font-extrabold">1.</span> Трудитесь на благо общества и оценивайте других
                        людей.
                        Поможем империи составить социальный рейтинг всех её жителей!
                    </p>

                    <p className="holo-font font-semibold text-justify">
                        <span className="!font-extrabold">2.</span> Приглашайте друзей, чтобы получать
                        большей ⭐ для голосования.
                    </p>

                    <p className="holo-font font-semibold text-justify">
                        <span className="!font-extrabold">3.</span> Будьте хорошим гражданином,
                        и наберите наибольшее кол-во социальных очков.
                    </p>

                    <p className="holo-font font-semibold text-justify">
                        <span className="!font-extrabold">4.</span> Каждый день самый лучший житель
                        империи получает стикеры.
                    </p>

                    <p className="holo-font font-semibold text-justify">
                        <span className="!font-extrabold">5.</span> А в конце месяца империя будет
                        разыгрывать <b>Умную Колонку от Сбера</b> среди победителей.
                    </p>
                </div>

                <div className="mb-24"></div>

            </div>


        </div>

    </AppPanel>
}

export default observer(UserProfile)
