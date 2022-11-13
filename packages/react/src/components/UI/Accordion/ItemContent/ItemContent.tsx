import React, { useLayoutEffect, useRef, useState } from "react";
import { useAccordionContext } from "../Accordion.context";
import styles from "../Accordion.module.scss";

type ItemContentProps = {
  itemKey: number;
};

const ItemContent: RFC<ItemContentProps> = ({ itemKey, children }) => {
  const { activeIndex } = useAccordionContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined);

  useLayoutEffect(() => {
    // console.group('ItemContent');
    // console.log(
    //   'contentRef.current: ',
    //   contentRef.current,
    //   '\nstyle: ',
    //   style,
    //   '\nitemIndex: ',
    //   itemKey,
    //   '\nactiveIndex: ',
    //   activeIndex,
    //   '\nitemIndex === activeIndex: ',
    //   itemKey === activeIndex
    // );
    // console.groupEnd();
    if (contentRef.current && itemKey === activeIndex) {
      setStyle({ maxHeight: contentRef.current.scrollHeight });
    } else {
      setStyle(undefined);
    }
  }, [activeIndex]);

  return (
    <div ref={contentRef} className={styles["content"]} style={style}>
      {children}
    </div>
  );
};

export { ItemContent };
