import { UserService } from "./UserService.ts";
import { http } from "@/utils";
import { User } from "../entity/user.ts";
import { makeAutoObservable } from "mobx";

export class FeedService {
    isLoading = false;

    constructor(private userService: UserService) {
        makeAutoObservable(this);
    }

    /**
     * Return all user info by vkUserId.
     * @param vkUserId
     */
    async getNextUser() {
        this.isLoading = true;

        try {
            return await http.get<void, User>(
                "/feed/next",
            );
        } finally {
            this.isLoading = false;
        }
    }
}
