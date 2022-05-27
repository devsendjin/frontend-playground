import cn from 'classnames';
import styles from './Flex.module.scss';

interface FlexProps {
  className?: string;
}

// fdc
// flexDiractionColumn
// aic
// alignItemsCenter
// jcc
// justifyContentCenter
// jcfs
// justifyContentFlexStart
// jcfe
// justifyContentFlexEnd
// ...

const Flex: RFC<FlexProps> = ({ className }) => {
  return <div className={cn(styles['flex'], className)}>Flex</div>;
};

export { Flex };
