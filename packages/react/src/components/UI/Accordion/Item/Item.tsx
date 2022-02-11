import cn from 'classnames';
import { useAccordionContext } from '../Accordion.context';
import styles from '../Accordion.module.scss';

interface IItemProps {
  itemKey: number | string;
}

const Item: React.FC<IItemProps> = ({ itemKey, children }) => {
  const { activeIndex } = useAccordionContext();
  // console.log('Item itemKey: ', itemKey, '\nactiveIndex: ', activeIndex);

  const isActive = itemKey === activeIndex;

  return <div className={cn(styles['item'], isActive && styles['is-active'])}>{children}</div>;
};

export { Item };
