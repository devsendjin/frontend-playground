import { forwardRef, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <textarea className={cn(styles.textarea, className)} {...rest} ref={ref}>
        {children}
      </textarea>
    );
  }
);

export { Textarea };
