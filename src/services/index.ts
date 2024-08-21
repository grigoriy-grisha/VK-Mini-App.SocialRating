import { UserService } from "./UserService.ts";
import { SocialRatingService } from "./SocialRatingService.ts";
import { LeaderboardService } from "@/services/LeaderboardService.ts";

export const userService = new UserService();
export const socialRatingService = new SocialRatingService(userService);
export const leaderboardService = new LeaderboardService();
