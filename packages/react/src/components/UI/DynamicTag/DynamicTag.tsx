import React from 'react';
import { Card } from '@/components/UI/_draft/Card';

interface IDynamicTagNameProps {
  tagName: keyof JSX.IntrinsicElements;
}

const DynamicTag: RFC<IDynamicTagNameProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  tagName,
  children,
  ...restProps
}) => {
  return React.createElement(tagName, restProps, children);
};
Card.displayName = Card.name;

export { DynamicTag };
