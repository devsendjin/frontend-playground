import cn from 'classnames';
import styles from './ScaffoldComponent.module.scss';

type ScaffoldComponentProps = {
  className?: string;
};

const ScaffoldComponent: RFC<ScaffoldComponentProps> = ({ className }) => {
  return <div className={cn(styles['scaffold'], className)}>ScaffoldComponent</div>;
};

export { ScaffoldComponent };
