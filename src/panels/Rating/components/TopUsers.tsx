import React, {memo, FC} from 'react';
import { User } from "@/entity/user.ts";

interface TopUsersProps {
    users: User[];
}

export const TopUsers: FC<TopUsersProps> = memo(({
    users
}) => {


    return (
        <div className="">
            TopUsers
        </div>
    );
});