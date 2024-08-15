import { SocialRatingUser, User } from "../entity/user.ts";
import { http } from "../utils";
import { makeAutoObservable } from "mobx";
import { UserInfo } from "@vkontakte/vk-bridge/dist/types/src/types/data";
import bridge from "@vkontakte/vk-bridge";

export class UserService {
  user: SocialRatingUser | null = null;
  userRegisterLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async initRegister() {
    await this.registerUser(await this.getUserInfo());
  }

  async getUserInfo() {
    return await bridge.send("VKWebAppGetUserInfo");
  }

  async registerUser(user: UserInfo) {
    this.userRegisterLoading = true;

    try {
      this.user = await http.post<UserInfo, SocialRatingUser>(
        "/auth/register",
        user,
      );
    } finally {
      this.userRegisterLoading = false;
    }
  }

  async getAllUsers() {
    return await http.get<void, User[]>("/users");
  }
}
