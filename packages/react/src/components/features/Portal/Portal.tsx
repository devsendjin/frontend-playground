// sample
// https://github.com/mui/material-ui/blob/master/packages/mui-base/src/Portal/Portal.js
import React, { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TPortalElement = Element;
type TPortalNode = TPortalElement | null | undefined;
type TContainerIdentifier = string | TPortalNode;
type TUsePortalNodeReturn = MutableRefObject<TPortalNode>;
interface IPortalProps {
  containerIdentifier?: TContainerIdentifier;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

const cssPropertiesToString = (cssProperties: React.CSSProperties) => {
  return Object.entries(cssProperties).reduce((acc, [prop, value]) => {
    acc = acc.concat(`${prop}: ${value};`);
    return acc;
  }, '');
};

const usePortalNode = (containerIdentifier?: TContainerIdentifier): TUsePortalNodeReturn => {
  const [_, setIsSelectorGrepped] = useState<boolean>(false);
  const portalNodeRef = useRef<TPortalNode>(null);

  useLayoutEffect(() => {
    if (typeof containerIdentifier === 'string') {
      portalNodeRef.current = document.querySelector(containerIdentifier);
      setIsSelectorGrepped(true);
    }
  }, []);

  if (typeof containerIdentifier === 'string') {
    return portalNodeRef;
  }

  return useRef<TPortalNode>(containerIdentifier);
};

const Portal: React.FC<IPortalProps> = ({ className, id: portalId, style, containerIdentifier, children }) => {
  const portalNodeRef = usePortalNode(containerIdentifier);
  const [dynamicPortalNode] = useState<TPortalElement>(document.createElement('div'));

  useLayoutEffect(() => {
    if (!portalNodeRef.current) {
      if (portalId) {
        dynamicPortalNode.setAttribute('id', portalId);
      }
      if (style) {
        dynamicPortalNode.setAttribute('style', cssPropertiesToString(style));
      }
      if (className) {
        dynamicPortalNode.classList.add(className);
      }
      document.body.appendChild(dynamicPortalNode);
    }

    return () => {
      if (dynamicPortalNode && dynamicPortalNode.parentElement) {
        dynamicPortalNode.parentElement.removeChild(dynamicPortalNode);
      }
    };
  }, []);

  return createPortal(children, portalNodeRef.current || dynamicPortalNode);
};

export { Portal };
