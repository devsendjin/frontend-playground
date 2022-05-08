import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  className?: string;
  htmlProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;
}

const Button: RFC<ButtonProps> = ({ htmlProps = {}, onClick, className, children }) => {
  const { type = 'button', ...restHtmlProps } = htmlProps;
  return (
    <button
      type={type}
      className={cn(styles['button'], 'btn btn-light', className)}
      onClick={onClick}
      {...restHtmlProps}
    >
      {children}
    </button>
  );
};

export { Button };
