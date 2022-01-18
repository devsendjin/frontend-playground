import { AllInOne } from '@/components/AllInOne';
import { ChildrenRerenderSample } from '@/components/samples/ChildrenRerender';
import { DynamicStateControllerSample } from '@/components/samples/DynamicStateControllerSample';
import { LazyInitialStateSample } from '@/components/samples/LazyInitialStateSample';
import { LocalizationSample } from '@/components/samples/LocalizationSample';

const ROUTES = {
  root: '/',
  combined: '/combined',
  dynamicStateControllerSample: '/dynamic-state-controller-sample',
  chilrenRerenderSample: '/chilren-rerender-sample',
  lazyInitialStateSample: '/lazy-initial-stateSample',
  localizationSample: '/localization-sample',
} as const;

const componentMap: { route: string; component: React.FC }[] = [
  { route: ROUTES.combined, component: AllInOne },
  { route: ROUTES.dynamicStateControllerSample, component: DynamicStateControllerSample },
  { route: ROUTES.chilrenRerenderSample, component: ChildrenRerenderSample },
  { route: ROUTES.lazyInitialStateSample, component: LazyInitialStateSample },
  { route: ROUTES.localizationSample, component: LocalizationSample },
];

export { ROUTES, componentMap };
