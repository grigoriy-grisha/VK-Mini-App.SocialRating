import React, {memo, FC} from 'react';
import { twJoin } from "tailwind-merge";

interface HateEffectProps {

}

export const HateEffect: FC<HateEffectProps> = memo(({}) => {
    
    
    return (
        <div className={twJoin(
            "hate-effect",
            "absolute top-0 right-0 left-0 z-10",
            'flex'
        )}>
            <div className="relative inset-0">
                <img
                    src="/feed/hateCat.png"
                    alt=""
                />
            </div>

            <div className="mr-6">
                <div className="hate-rating-text">
                    -1 Рейтинг
                </div>
            </div>
        </div>
    );
});