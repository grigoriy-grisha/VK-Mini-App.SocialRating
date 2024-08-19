import { ScreenSpinner, SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { observer } from "mobx-react-lite";

import { Main, Rating, UserProfile } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

import { userService } from "./services";
import { AppLayout } from "@/components";

userService.initRegister();

export const App = observer(() => {
    const { panel = DEFAULT_VIEW_PANELS.main } = useActiveVkuiLocation();

    return (
        <SplitLayout
            popout={
                userService.userRegisterLoading ? <ScreenSpinner size="large" /> : null
            }
        >
            <SplitCol>
                <AppLayout>
                    {userService.userRegisterLoading ? (
                        <ScreenSpinner size="large" />
                    ) : (
                        <View activePanel={panel}>
                            <Main id={DEFAULT_VIEW_PANELS.main} />
                            <UserProfile id={DEFAULT_VIEW_PANELS.userProfile} />
                            <Rating id={DEFAULT_VIEW_PANELS.rating} />
                        </View>
                    )}
                </AppLayout>
            </SplitCol>
        </SplitLayout>
    );
});
