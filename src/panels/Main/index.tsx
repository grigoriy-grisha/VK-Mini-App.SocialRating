import React, { CSSProperties, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { socialRatingService } from "@/services";
import AppPanel from "@components/AppPanel";
import { SwipeCard } from "@/components";
import { Spacing, Title } from "@vkontakte/vkui";
import { RatingBottom, RatingTop, UsersIcon } from "@components/Icons";

interface IProps {
  id: string;
}

function getRatingIcon(progress: number) {
  if (progress > 0.5) return <RatingBottom />;
  if (progress < -0.5) return <RatingTop />;
  return (
    <div className="opacity-0">
      <RatingBottom />
    </div>
  );
}

function getAppBg(progress) {
  if (progress > 0.5) return "bg-app-gradient-dislike";
  if (progress < -0.5) return "bg-app-gradient-like";
  return "b";
}

function getRatingBackground(progress: number) {
  const isLike = progress < -0.5;
  const isDisLike = progress > 0.5;

  const style: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
    transition: "opacity 0.3s",
  };

  return (
    <>
      <img
        className={!isLike && !isDisLike ? "opacity-1" : "opacity-0"}
        style={style}
        width="100%"
        src="/SwipeCardBackgroundDefault.svg"
      />
      <img
        style={style}
        className={isLike ? "opacity-1" : "opacity-0"}
        width="100%"
        src="/SwipeCardBackgroundLike.svg"
      />
      <img
        style={style}
        className={isDisLike ? "opacity-1" : "opacity-0"}
        width="100%"
        src="/SwipeCardBackgroundDisLike.svg"
      />
    </>
  );
}

function getRatingNumber(progress: number, rating: number) {
  if (progress > 0.5) return rating - 1;
  if (progress < -0.5) return rating + 1;
  return rating;
}

//todo вынести стили в tailwind
function Main({ id }: IProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    socialRatingService.getAllUser();
  }, []);

  const user = socialRatingService.allUsers[0];

  if (!user) return null;

  return (
    <AppPanel
      id={id}
      className="bg-app-gradient flex flex-col flex-1 justify-center items-center"
    >
      {(heightContainer) => (
        <SwipeCard
          onProgress={(progress) => {
            setProgress(progress);
            if (progress > 0.5)
              return document.documentElement.classList.add("dislike-theme");
            if (progress < -0.5)
              return document.documentElement.classList.add("like-theme");

            document.documentElement.classList.remove("like-theme");
            document.documentElement.classList.remove("dislike-theme");
          }}
          onTop={() => {
            console.log("top");
          }}
          onBottom={() => {
            console.log("bottom");
          }}
          heightContainer={heightContainer}
        >
          <div className="relative pb-[20px] pt-[10px] pl-[10px] pr-[10px] select-none h-full w-full">
            {getRatingBackground(progress)}
            <img
              style={{
                borderRadius: 28,
                width: "100%",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.35)",
              }}
              src={user.photo_max_orig}
              alt=""
            />
            <Spacing size={10} />
            <div className="flex items-center  pl-[26px] pr-[26px]">
              <Title className="flex items-center gap-1" level="2">
                {getRatingNumber(progress, 834)} {getRatingIcon(progress)}
              </Title>
              <div className="pl-[26px] pr-[44px]">
                <Title>{user.first_name}</Title>
                <Title>{user.last_name}</Title>
              </div>
              <UsersIcon />
            </div>
          </div>
        </SwipeCard>
      )}
    </AppPanel>
  );
}

export default observer(Main);
