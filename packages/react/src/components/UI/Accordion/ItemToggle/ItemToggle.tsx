import { useAccordionContext } from '../Accordion.context';
import styles from '../Accordion.module.scss';

interface IItemToggleProps {
  itemKey: number;
}

const ItemToggle: RFC<IItemToggleProps> = ({ itemKey, children }) => {
  // console.log('ItemToggle itemKey: ', itemKey);
  const { setActiveIndex } = useAccordionContext();

  const handleClick = () => {
    setActiveIndex(itemKey);
  };

  return (
    <div className={styles['toggle']} onClick={() => handleClick()}>
      {children}
    </div>
  );
};

export { ItemToggle };
