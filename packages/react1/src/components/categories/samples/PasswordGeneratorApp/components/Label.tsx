import { LabelHTMLAttributes } from "react";
import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Label: RFC<LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...rest }) => {
  return (
    <label className={cn(styles.label, className)} {...rest}>
      {children}
    </label>
  );
};

export { Label };
