import cn from "classnames";
import { useAccordionContext } from "../Accordion.context";
import styles from "../Accordion.module.scss";
import { ReactNode } from "react";

type ItemProps = {
  itemKey: number | string;
  children?: ReactNode;
};

const Item: RFC<ItemProps> = ({ itemKey, children }) => {
  // const Item = ({ itemKey, children }: IItemProps) => {
  const { activeIndex } = useAccordionContext();
  // console.log('Item itemKey: ', itemKey, '\nactiveIndex: ', activeIndex);

  const isActive = itemKey === activeIndex;

  return <div className={cn(styles["item"], isActive && styles["is-active"])}>{children}</div>;
};

export { Item };
