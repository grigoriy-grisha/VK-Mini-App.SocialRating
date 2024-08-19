import { SocialRatingUser, User } from "../entity/user.ts";
import { http } from "../utils";
import { makeAutoObservable } from "mobx";
import { UserInfo } from "@vkontakte/vk-bridge/dist/types/src/types/data";
import bridge from "@vkontakte/vk-bridge";

export class UserService {
    vkUserId: number | null = null;
    user: User | null = null;

    isLoading = false;
    userRegisterLoading = true;


    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Register / login user when the app is ready.
     */
    async initRegister() {
        const vkUserInfo = await this.getVKUserInfo();

        // Save vk_user_id for future requests.
        this.vkUserId = vkUserInfo.id;

        // Send request
        await this.registerUser(vkUserInfo);
    }

    /**
     * Load user info from VK using bridge.
     */
    async getVKUserInfo() {
        return await bridge.send("VKWebAppGetUserInfo");
    }

    /**
     * Send request to register or login the Vk user.
     * @param user
     */
    async registerUser(user: UserInfo) {
        this.userRegisterLoading = true;

        try {
            await http.post<UserInfo, User>(
                "/auth/register",
                user,
            );
        } finally {
            this.userRegisterLoading = false;
        }
    }

    /**
     * Load auth user info.
     */
    async getAuthUser() {
        // User is already loaded or not registered yet
        if(!this.vkUserId || this.user) return this.user;

        this.user = (await this.getUserById(this.vkUserId)).data;

        return this.user;
    }

    /**
     * Return all user info by vkUserId.
     * @param vkUserId
     */
    async getUserById(vkUserId: number) {
        this.isLoading = true;

        try {
            return await http.get<void, User>(
                "/users/" + vkUserId,
            );
        } finally {
            this.isLoading = false;
        }
    }

    async getAllUsers() {
        const response = await http.get<void, User[]>("/users");
        return response.data;
    }
}
