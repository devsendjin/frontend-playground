import cn from 'classnames';
import { AccordionProvier, TSharedAccordionState } from './Accordion.context';
import { Item } from './Item';
import { ItemToggle } from './ItemToggle';
import { ItemContent } from './ItemContent';
import styles from './Accordion.module.scss';

type TAccordionProps = { defaultActiveIndex?: TSharedAccordionState; className?: string } & Omit<
  React.HTMLProps<HTMLDivElement>,
  'className'
>;
type TAccordion = React.FC<TAccordionProps> & {
  Item: typeof Item;
  Toggle: typeof ItemToggle;
  Content: typeof ItemContent;
};

const Accordion: TAccordion = ({ className, defaultActiveIndex, children, ...rest }) => {
  return (
    <AccordionProvier defaultActiveIndex={defaultActiveIndex}>
      <div className={cn(styles['accordion'], className)} {...rest}>
        {children}
      </div>
    </AccordionProvier>
  );
};

Accordion.Item = Item;
Accordion.Toggle = ItemToggle;
Accordion.Content = ItemContent;

export { Accordion };
