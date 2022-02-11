import { featureActionTypes } from './feature.actionTypes';

export const setFeatureState = (
  featureName: string
): { type: featureActionTypes.SET_FEWATURE_TEST_STATE; payload: string } => {
  return {
    type: featureActionTypes.SET_FEWATURE_TEST_STATE,
    payload: featureName,
  };
};
