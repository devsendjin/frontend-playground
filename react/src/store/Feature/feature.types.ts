import { setFeatureState } from './feature.actionCreators';

export type TFeatureAction = ReturnType<typeof setFeatureState>;

export type TAction = TFeatureAction;

export type TFeatureState = {
  featureName: string;
};
