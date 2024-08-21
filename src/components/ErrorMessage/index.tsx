import React, {memo, FC} from 'react';
import { Title } from "@vkontakte/vkui";

interface ErrorMessageProps {
    children?: React.ReactNode;
}

export const ErrorMessage: FC<ErrorMessageProps> = memo(({children}) => {


    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/90 text-lg">
                {children}
            </div>
        </div>
    );
});