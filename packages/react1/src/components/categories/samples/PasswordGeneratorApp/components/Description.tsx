import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Description: RFC<HTMLAttributes<HTMLSpanElement>> = ({ className, children, ...rest }) => {
  return (
    <span className={cn(styles.description, className)} {...rest}>
      {children}
    </span>
  );
};

export { Description };
