import { paramCase } from 'change-case';
import { AllInOne } from '@/components/AllInOne';
import { ChildrenRerenderSample } from '@/components/samples/ChildrenRerenderSample';
import { DynamicStateControllerSample } from '@/components/samples/DynamicStateControllerSample';
import { LazyInitialStateSample } from '@/components/samples/LazyInitialStateSample';
import { LocalizationSample } from '@/components/samples/LocalizationSample';
import { AccordionSample } from '@/components/samples/AccordionSample';

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
} as const;

type TRouteArray = ReadonlyArray<{ route: string; component: React.FC; name: string }>;
const samplesMap: ReadonlyArray<{ category: string; routes: TRouteArray }> = [
  {
    category: 'Common',
    routes: [
      { route: ROUTES.combined, component: AllInOne, name: 'All samples' },
      {
        route: ROUTES.DynamicStateControllerSample,
        component: DynamicStateControllerSample,
        name: 'Dynamic state controller',
      },
      { route: ROUTES.LocalizationSample, component: LocalizationSample, name: 'Localization (i18next)' },
      { route: ROUTES.AccordionSample, component: AccordionSample, name: 'Accordion' },
    ],
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
