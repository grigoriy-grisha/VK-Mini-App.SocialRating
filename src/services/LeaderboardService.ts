import { SocialRatingUser, User } from "../entity/user.ts";
import { http } from "../utils";
import { makeAutoObservable } from "mobx";
import { UserInfo } from "@vkontakte/vk-bridge/dist/types/src/types/data";
import bridge from "@vkontakte/vk-bridge";

export class LeaderboardService {
    users: User[] = [];

    isLoading = false;


    constructor() {
        makeAutoObservable(this);
    }


    /**
     * Load top-10 or top-100 users
     * @param limit
     */
    async getTopUsers(limit: 10 | 100) {
        this.isLoading = true;

        try {
            const response = await http.get<void, User[]>("/leaderboard/top-" + limit);
            console.log(response)
            return this.users = response.data;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Load users that have already won the gift.
     */
    async getHallOfFameUsers() {
        this.isLoading = true;

        try {
            const response = await http.get<void, User[]>("/leaderboard/hall-of-fame");
            return this.users = response.data;
        } finally {
            this.isLoading = false;
        }
    }
}
