import cn from 'classnames';
import { useAccordionContext } from '../Accordion.context';
import styles from '../Accordion.module.scss';

interface IItemProps {
  itemIndex: number;
}

const Item: React.FC<IItemProps> = ({ itemIndex, children }) => {
  const { activeIndex } = useAccordionContext();
  console.log('Item itemIndex: ', itemIndex, '\nactiveIndex: ', activeIndex);

  const isActive = itemIndex === activeIndex;

  return <div className={cn(styles['item'], isActive && styles['is-active'])}>{children}</div>;
};

export { Item };
