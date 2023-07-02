import { PropsWithChildren, ReactElement } from 'react';

declare global {
  declare const __DEV__: boolean;
  declare const __PROD__: boolean;

  type RFC<Props = {}> = {
    (props: PropsWithChildren<Props>): ReactElement<any, any> | null;
    displayName?: string;
  };

  declare module '*.svg' {
    import React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
  }
}
