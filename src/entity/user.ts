import { UserInfo } from "@vkontakte/vk-bridge/dist/types/src/types/data";

export interface User extends UserInfo {
  uid: string;
  _id: string;
}

export interface SocialRatingUser {
  social_rating: {
    total: number;
    likes_count: number;
    ignores_count: number;
    hates_count: number;
  };
  uid: string;
  votes: number;
}
