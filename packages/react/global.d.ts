declare const __DEV__: boolean;
declare const __PROD__: boolean;

// for images
declare module '*.jpeg' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.gif' {
  const content: any;
  export = content;
}
declare module '*.webp' {
  const content: string;
  export default content;
}
declare module '*.avif' {
  const content: string;
  export default content;
}
declare module '*.bmp' {
  const content: any;
  export = content;
}
declare module '*.svg' {
  import React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

// For CSS
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// For SCSS
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// For LESS
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
