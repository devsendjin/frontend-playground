import React from 'react';
import cn from 'classnames';
import styles from './ScaffoldComponent.module.scss';

interface IScaffoldComponentProps {
  className?: string;
}

const ScaffoldComponent: React.FC<IScaffoldComponentProps> = ({ className }) => {
  return <div className={cn(styles['scaffold'], className)}>ScaffoldComponent</div>;
};

export { ScaffoldComponent };
