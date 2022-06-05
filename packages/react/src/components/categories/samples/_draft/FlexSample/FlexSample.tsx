import cn from 'classnames';
import styles from './FlexSample.module.scss';
import { Flex } from '@/components/UI/_draft/Flex';

type FlexSampleProps = {
  className?: string;
};

const FlexSample: RFC<FlexSampleProps> = ({ className }) => {
  return (
    <div className={cn(styles['flex-sample'], className)}>
      <Flex />
    </div>
  );
};

export { FlexSample };
