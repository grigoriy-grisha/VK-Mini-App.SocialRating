import { ReactNode, useEffect, useState } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import {
  ModalRoot,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import { Home, Persik } from "./panels";
import { DEFAULT_VIEW_MODALS, DEFAULT_VIEW_PANELS } from "./routes";
import CountModal from "./modals/CountModal";

export const App = () => {
  const { panel = DEFAULT_VIEW_PANELS.HOME, modal } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const routeNavigator = useRouteNavigator();

  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />,
  );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }

    fetchData();
  }, []);

  return (
    <SplitLayout
      popout={popout}
      modal={
        <ModalRoot activeModal={modal} onClose={() => routeNavigator.back()}>
          <CountModal id={DEFAULT_VIEW_MODALS.COUNTER} />
        </ModalRoot>
      }
    >
      <SplitCol>
        <View activePanel={panel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
          <Persik id={DEFAULT_VIEW_PANELS.PERSIK} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
