import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, children, type, ...rest }, ref) => {
    return (
      <input className={cn(styles.control, type && styles[`type-${type}`], className)} {...rest} type={type} ref={ref}>
        {children}
      </input>
    );
  }
);

export { Input };
