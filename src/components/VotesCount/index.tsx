import React, {memo, FC} from 'react';
import starIcon from "@assets/star.svg";


interface VotesCountProps {
    votesCount: number
}

export const VotesCount: FC<VotesCountProps> = memo(({
    votesCount
}) => {
    return (
        <div
            className="rounded-full max-w-[360px]"
            style={{
                background: 'linear-gradient(167.57deg, rgba(46, 51, 90, 0.26) -4.68%, rgba(28, 27, 51, 0.26) 95.45%)',
                boxShadow: "0px 1px 0px 0px #FFFFFF70 inset",
                backdropFilter: "blur(50px)",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: '30px',
                padding: "20px 50px"
            }}
        >
            <div className="flex gap-3">
                <div className="flex gap-1.5 holo-font items-center">
                    {votesCount > 1000 ? (votesCount / 1000).toFixed(1) + 'k' : votesCount}
                    <img
                        className="w-5 h-5"
                        src={starIcon}
                        alt=""
                    />
                </div>

                <div className="ml-2 holo-font">
                    Осталось
                </div>
            </div>
        </div>
    );
});