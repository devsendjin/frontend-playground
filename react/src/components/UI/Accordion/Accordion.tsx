import { AccordionProvier, TSharedAccordionState } from './Accordion.context';
import { Item } from './Item';
import { ItemToggle } from './ItemToggle';
import { ItemContent } from './ItemContent';

type TAccordion = React.FC<{ defaultActiveIndex?: TSharedAccordionState }> & {
  Item: typeof Item;
  Toggle: typeof ItemToggle;
  Content: typeof ItemContent;
};
const Accordion: TAccordion = ({ defaultActiveIndex, children }) => {
  return <AccordionProvier defaultActiveIndex={defaultActiveIndex}>{children}</AccordionProvier>;
};

Accordion.Item = Item;
Accordion.Toggle = ItemToggle;
Accordion.Content = ItemContent;

export { Accordion };
