import React from 'react';

interface IDynamicTagNameProps {
  tagName: keyof JSX.IntrinsicElements;
}

const DynamicTag: React.FC<IDynamicTagNameProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  tagName,
  children,
  ...restProps
}) => {
  return React.createElement(tagName, restProps, children);
};

export { DynamicTag };
