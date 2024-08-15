import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  main: "main",
  rating: "rating",
  userProfile: "userProfile",
} as const;

export const DEFAULT_VIEW_URLS = {
  [DEFAULT_VIEW_PANELS.main]: "/",
  [DEFAULT_VIEW_PANELS.rating]: `/${DEFAULT_VIEW_PANELS.rating}`,
  [DEFAULT_VIEW_PANELS.userProfile]: `/${DEFAULT_VIEW_PANELS.userProfile}`,
} as const;

export const DEFAULT_VIEW_MODALS = {} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.main, DEFAULT_VIEW_URLS.main),
      createPanel(DEFAULT_VIEW_PANELS.rating, DEFAULT_VIEW_URLS.rating),
      createPanel(
        DEFAULT_VIEW_PANELS.userProfile,
        DEFAULT_VIEW_URLS.userProfile,
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
