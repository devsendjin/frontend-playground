import { AllInOne } from '@/components/AllInOne';
import { DynamicStateControllerSample } from '@/components/samples/DynamicStateControllerSample';

const ROUTES = {
  root: '/',
  combined: '/combined',
  dynamicStateControllerSample: '/dynamic-state-controller-sample',
} as const;

const componentMap: { route: string; component: React.FC }[] = [
  { route: ROUTES.combined, component: AllInOne },
  { route: ROUTES.dynamicStateControllerSample, component: DynamicStateControllerSample },
];

export { ROUTES, componentMap };
