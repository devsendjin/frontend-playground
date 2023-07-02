import { HTMLAttributes } from "react";
import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Error: RFC<HTMLAttributes<HTMLSpanElement>> = ({ className, children, ...rest }) => {
  return (
    <span className={cn(styles.error, className)} {...rest}>
      {children}
    </span>
  );
};

export { Error };
