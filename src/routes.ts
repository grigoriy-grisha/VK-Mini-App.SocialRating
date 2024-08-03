import {
  createHashRouter,
  createModal,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  PERSIK: "persik",
} as const;

export const DEFAULT_VIEW_MODALS = {
  COUNTER: "counter",
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", [
        createModal(
          DEFAULT_VIEW_MODALS.COUNTER,
          `/${DEFAULT_VIEW_MODALS.COUNTER}`,
        ),
      ]),
      createPanel(
        DEFAULT_VIEW_PANELS.PERSIK,
        `/${DEFAULT_VIEW_PANELS.PERSIK}`,
        [],
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
