import React, { memo, FC, useState } from 'react';
import { SwipeCard } from "@/components";
import { User } from "@/entity/user.ts";
import { SetState } from "@/types/types.tsx";
import { UserCard } from "@components/UserCard/Index.tsx";

interface UserSwipeCardProps {
    user: User;
    progress: number;
    setProgress: SetState<number>;

    onLike: () => void;
    onHate: () => void;
}

export const UserSwipeCard: FC<UserSwipeCardProps> = memo(({
    user,
    progress,
    setProgress,
    onLike,
    onHate
}) => {

    if(!user) return null;

    console.log(user)

    if(!user) return;

    return (
        <SwipeCard
            progress={progress}
            onProgress={(progress) => {
                setProgress(progress);
            }}
            onTop={onLike}
            onBottom={onHate}
        >
            {(shiftPercent: number) => (
                <UserCard user={user} progress={progress} />
            )}
        </SwipeCard>
    );
});