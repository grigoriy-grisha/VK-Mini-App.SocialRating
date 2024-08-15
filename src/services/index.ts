import { UserService } from "./UserService.ts";
import { SocialRatingService } from "./SocialRatingService.ts";

export const userService = new UserService();
export const socialRatingService = new SocialRatingService(userService);
