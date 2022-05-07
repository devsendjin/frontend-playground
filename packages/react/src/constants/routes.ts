import { paramCase } from 'change-case';
import { ChildrenRerenderSample } from '@/components/samples/ChildrenRerenderSample';
import { DynamicStateControllerSample } from '@/components/samples/DynamicStateControllerSample';
import { LazyInitialStateSample } from '@/components/samples/LazyInitialStateSample';
import { LocalizationSample } from '@/components/samples/LocalizationSample';
import { AccordionSample } from '@/components/samples/AccordionSample';
import { PortalSample } from '@/components/samples/PortalSample';
import { TypedReduxSample } from '@/components/samples/TypedReduxSample';
import { ErrorBoundarySample } from '@/components/samples/ErrorBoundarySample';
import { HookFlowSample } from '@/components/samples/HookFlowSample';
import { Dropdown } from '@/components/UI/_draft/Dropdown';
import { IconsSample } from '@/components/samples/IconsSample';
import { LocalStorageStateHook } from '@/components/hooks/LocalStorageStateHook';
import { TicTacToeGame } from '@/components/samples/TicTacToeGame';
import { UseTransitionHook } from '@/components/hooks/UseTransitionHook';

/*
const components = [
  ChildrenRerenderSample,
  DynamicStateControllerSample,
  LazyInitialStateSample,
  LocalizationSample,
  AccordionSample,
  PortalSample,
  TypedReduxSample,
  ErrorBoundarySample,
  HookFlowSample,
  Dropdown,
  IconsSample,
  LocalStorageStateHook,
] as const;
// can't type this correctly
const _routes = components.reduce<{ [route: string]: `/${string}` }[]>((acc, item) => {
  acc.push({ [item.name]: `/${paramCase(item.name)}` });
  return acc;
}, []);
*/

const ui = {
  Dropdown: `/${paramCase('Dropdown')}`,
  AccordionSample: `/${paramCase('AccordionSample')}`,
  IconsSample: `/${paramCase('IconsSample')}`,
} as const;
const features = {
  DynamicStateControllerSample: `/${paramCase('DynamicStateControllerSample')}`,
  LocalizationSample: `/${paramCase('LocalizationSample')}`,
  PortalSample: `/${paramCase('PortalSample')}`,
  TypedReduxSample: `/${paramCase('TypedReduxSample')}`,
  ErrorBoundarySample: `/${paramCase('ErrorBoundarySample')}`,
} as const;
const hooks = {
  LocalStorageStateHook: `/${paramCase('LocalStorageStateHook')}`,
  UseTransitionHook: `/${paramCase('UseTransitionHook')}`,
} as const;
const coreKnowledge = {
  HookFlowSample: `/${paramCase('HookFlowSample')}`,
} as const;
const performance = {
  ChildrenRerenderSample: `/${paramCase('ChildrenRerenderSample')}`,
  LazyInitialStateSample: `/${paramCase('LazyInitialStateSample')}`,
} as const;
const games = {
  TicTacToeGame: `/${paramCase('TicTacToeGame')}`,
} as const;

const ROUTES = {
  root: '/',
  combined: '/combined',
  ...features,
  ...hooks,
  ...ui,
  ...coreKnowledge,
  ...performance,
  ...games,
} as const;

export type Route = Readonly<{
  url: string;
  component: RFC;
  name: string;
  next?: {
    category: string;
    routes: Route[];
  };
}>;
export type RouteMap = Readonly<{
  category: string;
  routes: Route[];
}>;

const routesMap: RouteMap[] = [
  {
    category: 'Features',
    routes: [
      {
        url: ROUTES.DynamicStateControllerSample,
        component: DynamicStateControllerSample,
        name: 'Dynamic state controller',
      },
      { url: ROUTES.LocalizationSample, component: LocalizationSample, name: 'Localization (i18next)' },
      { url: ROUTES.PortalSample, component: PortalSample, name: 'Portal' },
      { url: ROUTES.TypedReduxSample, component: TypedReduxSample, name: 'Typed Redux' },
      { url: ROUTES.ErrorBoundarySample, component: ErrorBoundarySample, name: 'Error Boundary' },
    ],
  },
  {
    category: 'hooks',
    routes: [
      {
        url: ROUTES.LocalStorageStateHook,
        component: LocalStorageStateHook,
        name: 'LocalStorageStateHook',
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
        name: 'UseTransitionHook',
      },
    ],
  },
  {
    category: 'UI',
    routes: [
      { url: ROUTES.Dropdown, component: Dropdown, name: 'Dropdown' },
      { url: ROUTES.AccordionSample, component: AccordionSample, name: 'Accordion' },
      { url: ROUTES.IconsSample, component: IconsSample, name: 'Icons' },
    ],
  },
  {
    category: 'Core knowledge',
    routes: [{ url: ROUTES.HookFlowSample, component: HookFlowSample, name: 'Hook Flow' }],
  },
  {
    category: 'Performance',
    routes: [
      { url: ROUTES.ChildrenRerenderSample, component: ChildrenRerenderSample, name: 'Children rerender' },
      { url: ROUTES.LazyInitialStateSample, component: LazyInitialStateSample, name: 'Lazy initial state' },
    ],
  },
  {
    category: 'Games',
    routes: [{ url: ROUTES.TicTacToeGame, component: TicTacToeGame, name: 'Tic Tac Toe' }],
  },
];

const flatRoutes = (arr: RouteMap['routes']): Route[] => {
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

export { ROUTES, routesMap, componentMap };
