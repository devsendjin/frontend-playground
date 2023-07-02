import { useAccordionContext } from "../Accordion.context";
import styles from "../Accordion.module.scss";

type ItemToggleProps = {
  itemKey: number;
};

const ItemToggle: RFC<ItemToggleProps> = ({ itemKey, children }) => {
  // console.log('ItemToggle itemKey: ', itemKey);
  const { setActiveIndex } = useAccordionContext();

  const handleClick = () => {
    setActiveIndex(itemKey);
  };

  return (
    <div className={styles["toggle"]} onClick={() => handleClick()}>
      {children}
    </div>
  );
};

export { ItemToggle };
