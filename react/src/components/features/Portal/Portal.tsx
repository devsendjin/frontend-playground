import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TPortalElement = HTMLElement;
type TPortalNode = TPortalElement | null;
type TContainerIdentifier = string | TPortalNode;
type TUsePortalNodeReturn = MutableRefObject<TPortalNode>;
interface IPortalProps {
  containerIdentifier?: TContainerIdentifier;
}

const usePortalNode = (containerIdentifier?: TContainerIdentifier): TUsePortalNodeReturn => {
  if (typeof containerIdentifier === 'string') {
    return useRef<TPortalNode>(document.getElementById(containerIdentifier));
  }
  if (containerIdentifier instanceof HTMLDivElement) {
    return useRef<TPortalElement>(containerIdentifier);
  }
  return useRef<TPortalElement>(document.getElementById('div'));
};

const Portal: React.FC<IPortalProps> = ({ containerIdentifier, children }) => {
  const el = usePortalNode(containerIdentifier);
  const [dynamic] = useState(!el.current.parentElement);
  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [id]);
  return createPortal(children, el.current);
};

export { Portal };
