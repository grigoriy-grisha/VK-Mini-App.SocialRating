import { UserService } from "./UserService.ts";
import { http } from "../utils";
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

  async like() {
    const likeResponse = await http.post(
      `/social-rating/${this.voteAvailableUser.uid}/like`,
    );
    console.log(likeResponse);
  }

  async hate() {
    const likeResponse = await http.post(
      `/social-rating/${this.voteAvailableUser.uid}/hate`,
    );
    console.log(likeResponse);
  }

  async ignore() {
    const likeResponse = await http.post(
      `/social-rating/${this.voteAvailableUser.uid}/ignore`,
    );
    console.log(likeResponse);
  }

  get voteAvailableUser() {
    return this.allUsers[0];
  }
}
