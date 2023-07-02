import cn from "classnames";
import styles from "../PasswordGeneratorApp.module.scss";

const Row: RFC<{ className?: string }> = ({ className, children }) => {
  return <div className={cn(styles.row, className)}>{children}</div>;
};

export { Row };
