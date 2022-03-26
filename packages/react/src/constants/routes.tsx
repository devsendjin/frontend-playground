import { paramCase } from 'change-case';
import { ChildrenRerenderSample } from '@/components/samples/ChildrenRerenderSample';
import { DynamicStateControllerSample } from '@/components/samples/DynamicStateControllerSample';
import { LazyInitialStateSample } from '@/components/samples/LazyInitialStateSample';
import { LocalizationSample } from '@/components/samples/LocalizationSample';
import { AccordionSample } from '@/components/samples/AccordionSample';
import { PortalSample } from '@/components/samples/PortalSample';
import { TypedReduxSample } from '@/components/samples/TypedReduxSample';
import { ErrorBounarySample } from '@/components/samples/ErrorBounarySample';
import { HookFlowSample } from '@/components/samples/HookFlowSample';
import { Dropdown } from '@/components/UI/_draft/Dropdown';
import { IconsSample } from '@/components/samples/IconsSample';

// const routesArr = [
//   'DynamicStateControllerSample',
//   'ChildrenRerenderSample',
//   'LazyInitialStateSample',
//   'LocalizationSample',
// ] as const;
// type TRoutes = typeof routesArr;

// const r = routesArr.reduce((acc: any, route: string) => {
//   acc[camelCase(route)] = paramCase(route);
//   return acc;
//, label: 'All samples' }, {}) as ({ [key in keyof TRoutes]: any })[];

// console.log(r);

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
  ErrorBounarySample: `/${paramCase('ErrorBounarySample')}`,
  HookFlowSample: `/${paramCase('HookFlowSample')}`,
  IconsSample: `/${paramCase('IconsSample')}`,
} as const;

export type TRouteArray = ReadonlyArray<{ route: string; component: React.FC; name: string }>;
const samplesMap: ReadonlyArray<{ category: string; routes: TRouteArray }> = [
  {
    category: 'Features',
    routes: [
      // { route: ROUTES.combined, component: AllInOne, name: 'All samples' },
      {
        route: ROUTES.DynamicStateControllerSample,
        component: DynamicStateControllerSample,
        name: 'Dynamic state controller',
      },
      { route: ROUTES.LocalizationSample, component: LocalizationSample, name: 'Localization (i18next)' },
      { route: ROUTES.PortalSample, component: PortalSample, name: 'Portal' },
      { route: ROUTES.TypedReduxSample, component: TypedReduxSample, name: 'Typed Redux' },
      { route: ROUTES.ErrorBounarySample, component: ErrorBounarySample, name: 'Error Boundary' },
    ],
  },
  {
    category: 'UI',
    routes: [
      { route: ROUTES.Dropdown, component: Dropdown, name: 'Dropdown' },
      { route: ROUTES.AccordionSample, component: AccordionSample, name: 'Accordion' },
      { route: ROUTES.IconsSample, component: IconsSample, name: 'Icons' },
    ],
  },
  {
    category: 'Core knowledge',
    routes: [{ route: ROUTES.HookFlowSample, component: HookFlowSample, name: 'Hook Flow' }],
  },
  {
    category: 'Performance',
    routes: [
      { route: ROUTES.ChildrenRerenderSample, component: ChildrenRerenderSample, name: 'Children rerender' },
      { route: ROUTES.LazyInitialStateSample, component: LazyInitialStateSample, name: 'Lazy initial state' },
    ],
  },
];

const componentMap = samplesMap
  .map(({ routes }) => {
    return routes.map((route) => route);
  })
  .flat();

export { ROUTES, samplesMap, componentMap };