// examples
// https://www.youtube.com/watch?v=AiJ8tRRH0f8&t=148s
// https://habr.com/ru/company/alfa/blog/647013/

import { HTMLProps } from 'react';
import cn from 'classnames';
import { AccordionProvider, TSharedAccordionState } from './Accordion.context';
import { Item } from './Item';
import { ItemToggle } from './ItemToggle';
import { ItemContent } from './ItemContent';
import styles from './Accordion.module.scss';

type TAccordionProps = { defaultActiveIndex?: TSharedAccordionState; className?: string } & Omit<
  HTMLProps<HTMLDivElement>,
  'className'
>;
type TAccordion = RFC<TAccordionProps> & {
  Item: typeof Item;
  Toggle: typeof ItemToggle;
  Content: typeof ItemContent;
};

const Accordion: TAccordion = ({ className, defaultActiveIndex, children, ...rest }) => {
  return (
    <AccordionProvider defaultActiveIndex={defaultActiveIndex}>
      <div className={cn(styles['accordion'], className)} {...rest}>
        {children}
      </div>
    </AccordionProvider>
  );
};

Accordion.Item = Item;
Accordion.Toggle = ItemToggle;
Accordion.Content = ItemContent;

export { Accordion };
