import { ButtonHTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ type = "button", className, children, ...rest }, ref) => {
    return (
      <button className={cn(styles.button, className)} {...rest} type={type} ref={ref}>
        {children}
      </button>
    );
  }
);

export { Button };
