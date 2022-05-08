import { setFeatureState } from './feature.actionCreators';

export type TFeatureAction = ReturnType<typeof setFeatureState>;

export type Action = TFeatureAction;

export type FeatureState = {
  featureName: string;
};
