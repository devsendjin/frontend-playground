import React from 'react';

export interface IDynamicTagNameProps {
  tagName: keyof JSX.IntrinsicElements;
}

const DynamicTag: RFC<IDynamicTagNameProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  tagName,
  children,
  ...restProps
}) => {
  return React.createElement(tagName, restProps, children);
};
DynamicTag.displayName = DynamicTag.name;

export { DynamicTag };
