import cn from "classnames";
import styles from "./Title.module.scss";
import { DynamicTag, DynamicTagNameProps } from "@UI/DynamicTag";

type SampleTitleProps = Partial<DynamicTagNameProps> & {
  className?: string;
};

const SampleTitle: RFC<SampleTitleProps> = ({ tagName = "h4", className, children }) => {
  return (
    <DynamicTag tagName={tagName} className={className}>
      {children}
    </DynamicTag>
  );
};

const CategoryTitle: RFC<SampleTitleProps> = ({ tagName = "h3", className, children }) => {
  return (
    <DynamicTag tagName={tagName} className={cn(styles.categoryTitle, className)}>
      {children}
    </DynamicTag>
  );
};

export { SampleTitle, CategoryTitle };
