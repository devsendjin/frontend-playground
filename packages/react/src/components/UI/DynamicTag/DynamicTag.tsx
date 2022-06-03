import React from 'react';

export type DynamicTagNameProps = {
  tagName: keyof JSX.IntrinsicElements;
};

const DynamicTag: RFC<DynamicTagNameProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  tagName,
  children,
  ...restProps
}) => {
  return React.createElement(tagName, restProps, children);
};
DynamicTag.displayName = DynamicTag.name;

export { DynamicTag };
