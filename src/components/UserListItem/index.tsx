import React, {memo, FC} from 'react';
import { User } from "@/entity/user.ts";

interface UserListItemProps {
    user: User
}

export const UserListItem: FC<UserListItemProps> = memo(({
    user
}) => {


    return (
        <div className="">
            {user.last_name}
        </div>
    );
});