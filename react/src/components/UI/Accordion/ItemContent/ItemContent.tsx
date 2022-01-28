import React, { useLayoutEffect, useRef, useState } from 'react';
import { useAccordionContext } from '../Accordion.context';
import styles from '../Accordion.module.scss';

interface IItemContentProps {
  itemIndex: number;
}

const ItemContent: React.FC<IItemContentProps> = ({ itemIndex, children }) => {
  const { activeIndex } = useAccordionContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined);

  useLayoutEffect(() => {
    console.group('ItemContent');
    console.log(
      'contentRef.current: ',
      contentRef.current,
      '\nstyle: ',
      style,
      '\nitemIndex: ',
      itemIndex,
      '\nactiveIndex: ',
      activeIndex,
      '\nitemIndex === activeIndex: ',
      itemIndex === activeIndex
    );
    console.groupEnd();
    if (contentRef.current && itemIndex === activeIndex) {
      setStyle({ maxHeight: contentRef.current.scrollHeight });
    } else {
      setStyle(undefined);
    }
  }, [activeIndex]);

  return (
    <div ref={contentRef} className={styles['content']} style={style}>
      {children}
    </div>
  );
};

export { ItemContent };
