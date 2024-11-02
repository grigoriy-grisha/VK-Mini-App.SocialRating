import React, { memo, FC } from 'react';
import starIcon from "@assets/star.svg";


interface VotesCountProps {
    rank: string;
}

export const SocialRank: FC<VotesCountProps> = memo(({
    rank
}) => {
    return (
        <div className="absolute top-4 left-4">
            <div
                className="rounded-full px-2.5 py-0.5"
                style={{
                    background    : 'linear-gradient(167.57deg, rgba(46, 51, 90, 0.26) -4.68%, rgba(28, 27, 51, 0.26) 95.45%)',
                    boxShadow     : "0px 1px 0px 0px #FFFFFF70 inset",
                    backdropFilter: "blur(3px)",
                    fontSize      : "13px",
                    fontWeight    : "600",
                }}
            >
                <div className="holo-fon">
                    {rank}
                </div>
            </div>
        </div>
    );
});