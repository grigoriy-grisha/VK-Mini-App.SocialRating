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

    decrementVotes() {
        const user = this.userService.user
        if(user) user.votes--;
    }

    async like(targetUserId: string) {
        const likeResponse = await http.post<void, User | null>(
            `/social-rating/${targetUserId}/like`,
        );

        // Decrement votes
        if(likeResponse.result) this.decrementVotes();

        return likeResponse;
    }

    async hate(targetUserId: string) {
        const hateResponse = await http.post<void, User | null>(
            `/social-rating/${targetUserId}/hate`,
        );

        // Decrement votes
        if(hateResponse.result) this.decrementVotes();

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
