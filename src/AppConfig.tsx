import vkBridge, {
    parseURLSearchParamsForGetLaunchParams,
} from "@vkontakte/vk-bridge";
import { useAdaptivity, useInsets } from "@vkontakte/vk-bridge-react";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import "@vkontakte/vkui/dist/vkui.css";

import { transformVKBridgeAdaptivity } from "./utils";
import { router } from "./routes";
import { App } from "./App";

export const AppConfig = () => {
    const vkBridgeInsets = useInsets() || undefined;
    const adaptivity = transformVKBridgeAdaptivity(useAdaptivity());
    const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
        window.location.search,
    );

    return (
        <ConfigProvider
            appearance="dark"
            platform={vk_platform === "desktop_web" ? "vkcom" : undefined}
            isWebView={vkBridge.isWebView()}
            hasCustomPanelHeaderAfter={true}
        >
            <AdaptivityProvider {...adaptivity}>
                <AppRoot
                    mode="full"
                    safeAreaInsets={vkBridgeInsets}
                >
                    <RouterProvider router={router}>
                        <App />
                    </RouterProvider>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};
