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

const ROUTES = {
  root: '/',
  combined: '/combined',
  DynamicStateControllerSample: `/${paramCase('DynamicStateControllerSample')}`,
  ChildrenRerenderSample: `/${paramCase('ChildrenRerenderSample')}`,
  LazyInitialStateSample: `/${paramCase('LazyInitialStateSample')}`,
  LocalizationSample: `/${paramCase('LocalizationSample')}`,
  AccordionSample: `/${paramCase('AccordionSample')}`,
  Dropdown: `/${paramCase('Dropdown')}`,
  PortalSample: `/${paramCase('PortalSample')}`,
  TypedReduxSample: `/${paramCase('TypedReduxSample')}`,
  ErrorBoundarySample: `/${paramCase('ErrorBoundarySample')}`,
  HookFlowSample: `/${paramCase('HookFlowSample')}`,
  IconsSample: `/${paramCase('IconsSample')}`,
  LocalStorageStateHook: `/${paramCase('LocalStorageStateHook')}`,
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
