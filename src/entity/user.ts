import { UserInfo } from "@vkontakte/vk-bridge/dist/types/src/types/data";

export interface User extends UserInfo {
    uid: string; // Vk user id
    _id: string; // Mongodb id

    // Social Rating data
    social_rating: {
        total: number;
        likes_count: number;
        ignores_count: number;
        hates_count: number;
    };

    // Left votes count
    votes: number;
    voted_for: string[];

    // True if user already has won the gift
    hasWon: boolean;

    referrer: User | null;
    referrals: User[];

    photo_base?: string;
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
