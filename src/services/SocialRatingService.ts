import { UserService } from "./UserService.ts";
import { http } from "@/utils";
import { User } from "../entity/user.ts";
import { makeAutoObservable } from "mobx";

export class SocialRatingService {
    allUsersLoading = false;
    allUsers: User[] = [];

    constructor(private userService: UserService) {
        makeAutoObservable(this);
    }

    async getAllUser() {
        this.allUsersLoading = true;
        try {
            this.allUsers = await this.userService.getAllUsers();
        } finally {
            this.allUsersLoading = false;
        }
    }

    async like(targetUserId: string) {
        const likeResponse = await http.post<void, User | null>(
            `/social-rating/${targetUserId}/like`,
        );
        console.log(likeResponse);
        return likeResponse;
    }

    async hate(targetUserId: string) {
        const hateResponse = await http.post<void, User | null>(
            `/social-rating/${targetUserId}/hate`,
        );
        console.log(hateResponse);
        return hateResponse;
    }

    async ignore(targetUserId: string) {
        const ignoreResponse = await http.post<void, User | null>(
            `/social-rating/${targetUserId}/ignore`,
        );

        console.log(ignoreResponse);
        return ignoreResponse;
    }

    // get getAvailableVotes() {
    //     return this.allUsers[0];
    // }
}
