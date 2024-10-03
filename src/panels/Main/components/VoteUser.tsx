import { Caption, Card, Div, Spacing, Tappable, Title } from "@vkontakte/vkui";
import {
    Icon36CancelOutline,
    Icon36Done,
    Icon48HideOutline,
} from "@vkontakte/icons";
import { User } from "@/entity/user.ts";
import { socialRatingService } from "@/services";

interface IProps {
    user?: User;
}

function VoteUser({ user }: IProps) {
    if (!user) {
        return null;
    }

    return (
        <Div className="flex flex-col justify-between">
            <div className="flex flex-1">
                <div className="relative flex flex-1">
                    <img
                        className="rounded-xl"
                        src={user.photo_200}
                        alt=""
                    />
                    <Div className="absolute text-black bottom-0 left-0">
                        <Title>
                            {user.first_name} {user.last_name}
                        </Title>
                        <div>Рейтинг: 50,000,000</div>
                        <Caption>
                            Приколыч Приколыч Приколыч Приколыч Приколыч Приколыч Приколыч
                            Приколыч Приколыч Приколыч Приколыч Приколыч
                        </Caption>
                    </Div>
                </div>
            </div>
            <Spacing size={12} />
            <Card>
                <Div className="grid gap-4 grid-cols-3">
                    <Tappable
                        className="rounded-xl flex items-center bg-red-900 justify-center"
                        // onClick={() => socialRatingService.hate()}
                    >
                        <Icon36CancelOutline />
                    </Tappable>
                    <Tappable
                        className="rounded-xl flex items-center bg-gray-500 justify-center"
                        // onClick={() => socialRatingService.ignore()}
                    >
                        <Icon48HideOutline
                            width={36}
                            height={36}
                        />
                    </Tappable>
                    <Tappable
                        className="rounded-xl flex items-center bg-green-900 justify-center"
                        // onClick={() => socialRatingService.like()}
                    >
                        <Icon36Done />
                    </Tappable>
                </Div>
            </Card>
        </Div>
    );
}

export default VoteUser;
