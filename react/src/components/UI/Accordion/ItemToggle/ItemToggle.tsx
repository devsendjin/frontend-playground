import { useAccordionContext } from '../Accordion.context';
import styles from '../Accordion.module.scss';

interface IItemToggleProps {
  itemIndex: number;
}

const ItemToggle: React.FC<IItemToggleProps> = ({ itemIndex, children }) => {
  console.log('ItemToggle itemIndex: ', itemIndex);
  const { setActiveIndex } = useAccordionContext();

  const handleClick = () => {
    setActiveIndex(itemIndex);
  };

  return (
    <div className={styles['toggle']} onClick={() => handleClick()}>
      {children}
    </div>
  );
};

export { ItemToggle };
