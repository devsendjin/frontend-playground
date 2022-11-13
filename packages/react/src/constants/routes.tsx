import React from "react";
import { paramCase } from "change-case";
// samples
import { ChildrenRerenderSample } from "@/components/categories/samples/ChildrenRerenderSample";
import { DynamicStateControllerSample } from "@/components/categories/samples/DynamicStateControllerSample";
import { LazyInitialStateSample } from "@/components/categories/samples/LazyInitialStateSample";
import { LocalizationSample } from "@/components/categories/samples/LocalizationSample";
import { AccordionSample } from "@/components/categories/samples/AccordionSample";
import { PortalSample } from "@/components/categories/samples/PortalSample";
import { TypedReduxSample } from "@/components/categories/samples/TypedReduxSample";
import { ErrorBoundarySample } from "@/components/categories/samples/ErrorBoundarySample";
import { HookFlowSample } from "@/components/categories/samples/HookFlowSample";
import { Dropdown } from "@/components/UI/_draft/Dropdown";
// import { IconsSample } from "@/components/categories/samples/IconsSample";
import { LocalStorageStateHook } from "@/components/categories/hooks/LocalStorageStateHook";
import { FlexGridSample } from "@/components/categories/samples/FlexGridSample";
// apps
import { PasswordGeneratorApp } from "@/components/categories/samples/PasswordGeneratorApp";
import { TicTacToeGame } from "@/components/categories/samples/TicTacToeGame";
// patterns
import { PropCollectionsGetters } from "@/components/categories/patterns/PropCollectionsGetters";
// hooks
import { UseTransitionHook } from "@/components/categories/hooks/UseTransitionHook";
import { UseTypedReducerHook } from "@/components/categories/hooks/UseTypedReducerHook";
import { UseAsyncHook } from "@/components/categories/hooks/UseAsyncHook";
import { UseImperativeHandle } from "@/components/categories/hooks/UseImperativeHandle";
import { ByCategoryView } from "@/components/views/ByCategoryView";

const createUrl = (input: string): string => `/${paramCase(input)}`;

const ui = {
  Dropdown: createUrl("Dropdown"),
  AccordionSample: createUrl("AccordionSample"),
  // IconsSample: createUrl("IconsSample"),
  FlexGridSample: createUrl("FlexGridSample"),
} as const;
const features = {
  DynamicStateControllerSample: createUrl("DynamicStateControllerSample"),
  LocalizationSample: createUrl("LocalizationSample"),
  PortalSample: createUrl("PortalSample"),
  TypedReduxSample: createUrl("TypedReduxSample"),
  ErrorBoundarySample: createUrl("ErrorBoundarySample"),
} as const;
const hooks = {
  LocalStorageStateHook: createUrl("LocalStorageStateHook"),
  UseTransitionHook: createUrl("UseTransitionHook"),
  UseTypedReducerHook: createUrl("UseTypedReducerHook"),
  UseAsyncHook: createUrl("UseAsyncHook"),
  UseImperativeHandle: createUrl("UseImperativeHandle"),
  // UseSafeDispatchHook: createUrl('UseSafeDispatchHook'),
} as const;
const coreKnowledge = {
  HookFlowSample: createUrl("HookFlowSample"),
} as const;
const performance = {
  ChildrenRerenderSample: createUrl("ChildrenRerenderSample"),
  LazyInitialStateSample: createUrl("LazyInitialStateSample"),
} as const;
const patterns = {
  PropCollectionsGetters: createUrl("PropCollectionsGetters"),
} as const;
const apps = {
  TicTacToeGame: createUrl("TicTacToeGame"),
  PasswordGeneratorApp: createUrl("PasswordGeneratorApp"),
} as const;

const ROUTES = {
  root: "/",
  combined: "/combined",
  ...features,
  ...hooks,
  ...patterns,
  ...ui,
  ...coreKnowledge,
  ...performance,
  ...apps,
} as const;

export enum Categories {
  features = "Features",
  hooks = "Hooks",
  patterns = "Patterns",
  ui = "UI",
  coreKnowledge = "Core knowledge",
  performance = "Performance",
  apps = "Apps",
}

type RouteBase = {
  url: string;
  component: RFC | (() => ReturnType<RFC>);
  name: string;
}

type CategoryTitle = keyof typeof Categories
export type CategoryType = {
  name: string;
  url: string;
}
export type Route = Readonly<RouteBase & {
  next?: {
    category: CategoryType;
    routes: Route[];
  };
}>;
export type RouteMap = Readonly<{
  category: CategoryType;
  routes: Route[];
}>;

const routesMap: RouteMap[] = [
  {
    category: {
      name: Categories.features,
      url: createUrl(Categories.features),
    },
    routes: [
      {
        url: ROUTES.DynamicStateControllerSample,
        component: DynamicStateControllerSample,
        name: "Dynamic state controller",
      },
      { url: ROUTES.LocalizationSample, component: LocalizationSample, name: "Localization (i18next)" },
      { url: ROUTES.PortalSample, component: PortalSample, name: "Portal" },
      { url: ROUTES.TypedReduxSample, component: TypedReduxSample, name: "Typed Redux" },
      { url: ROUTES.ErrorBoundarySample, component: ErrorBoundarySample, name: "Error Boundary" },
    ],
  },
  {
    category: {
      name: Categories.hooks,
      url: createUrl(Categories.hooks),
    },
    routes: [
      {
        url: ROUTES.LocalStorageStateHook,
        component: LocalStorageStateHook,
        name: "LocalStorageStateHook",
        /*next: {
          category: 'hooks 1',
          routes: [
            {
              url: ROUTES.LocalStorageStateHook,
              component: LocalStorageStateHook,
              name: 'category: \'hooks 1.1\', LocalStorageStateHook',
            },
            {
              url: ROUTES.LocalStorageStateHook,
              component: LocalStorageStateHook,
              name: 'category: \'hooks 1.2\', LocalStorageStateHook',
            },
          ],
        },*/
      },
      {
        url: ROUTES.UseTransitionHook,
        component: UseTransitionHook,
        name: "UseTransitionHook",
      },
      {
        url: ROUTES.UseTypedReducerHook,
        component: UseTypedReducerHook,
        name: "UseTypedReducerHook",
      },
      {
        url: ROUTES.UseAsyncHook,
        component: UseAsyncHook,
        name: "UseAsync | UseSafeDispatch",
      },
      {
        url: ROUTES.UseImperativeHandle,
        component: UseImperativeHandle,
        name: "UseImperativeHandle",
      },
    ],
  },
  {
    category: {
      name: Categories.patterns,
      url: createUrl(Categories.patterns),
    },
    routes: [
      {
        url: ROUTES.PropCollectionsGetters,
        component: PropCollectionsGetters,
        name: "PropCollectionsGetters",
      },
    ],
  },
  {
    category: {
      name: Categories.ui,
      url: createUrl(Categories.ui),
    },
    routes: [
      { url: ROUTES.Dropdown, component: Dropdown, name: "Dropdown" },
      { url: ROUTES.AccordionSample, component: AccordionSample, name: "Accordion" },
      // { url: ROUTES.IconsSample, component: IconsSample, name: "Icons" },
      { url: ROUTES.FlexGridSample, component: FlexGridSample, name: "Flex Grid" },
    ],
  },
  {
    category: {
      name: Categories.coreKnowledge,
      url: createUrl(Categories.coreKnowledge),
    },
    routes: [{ url: ROUTES.HookFlowSample, component: HookFlowSample, name: "Hook Flow" }],
  },
  {
    category: {
      name: Categories.performance,
      url: createUrl(Categories.performance),
    },
    routes: [
      { url: ROUTES.ChildrenRerenderSample, component: ChildrenRerenderSample, name: "Children rerender" },
      { url: ROUTES.LazyInitialStateSample, component: LazyInitialStateSample, name: "Lazy initial state" },
    ],
  },
  {
    category: {
      name: Categories.apps,
      url: createUrl(Categories.apps),
    },
    routes: [
      { url: ROUTES.TicTacToeGame, component: TicTacToeGame, name: "Tic Tac Toe" },
      { url: ROUTES.PasswordGeneratorApp, component: PasswordGeneratorApp, name: "Password generator" },
    ],
  },
];

const byCategoryRoutesMap: ReadonlyArray<Omit<RouteBase, "name">> = (Object.keys(Categories) as unknown as CategoryTitle[])
  .map(categoryKey => {
    const url = createUrl(categoryKey);
    return {
      url,
      component: () => <ByCategoryView url={url} title={Categories[categoryKey]} />
    }
  })

const flatRoutes = (arr: RouteMap["routes"]): Route[] => {
  const result: Route[] = [];
  for (const item of arr) {
    result.push(item);
    if (item.next?.routes) {
      result.push(...flatRoutes(item.next.routes));
    }
  }

  return result;
};

const componentMap = routesMap.flatMap((route) => flatRoutes(route.routes));

export { ROUTES, routesMap, componentMap, byCategoryRoutesMap };
