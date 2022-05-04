import { useState } from 'react';
import cn from 'classnames';
import { Portal } from '@/components/features/Portal';
import styles from './PortalSample.module.scss';

const PortalSample: RFC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [toggleBodyPortal, setToggleBodyPortal] = useState<boolean>(false);

  return (
    <div className={styles['portal']}>
      <div className={cn(styles['btn-box'], 'btn-group')}>
        <button type="button" className="btn btn-primary" onClick={() => setToggle((prev) => !prev)}>
          Toggle portal
        </button>
        <button type="button" className="btn btn-primary" onClick={() => setToggleBodyPortal((prev) => !prev)}>
          Toggle portal (mount in body)
        </button>
      </div>
      <div id="portal-mount" className={styles['portal-node']} />
      {toggle && (
        <Portal containerIdentifier="#portal-mount" onMount={() => console.count('sample portal render count')}>
          <div>Portal</div>
        </Portal>
      )}
      {toggleBodyPortal && (
        <Portal
          prependToBody
          id="portal-node"
          className="portal-node"
          style={{ color: 'red' }}
          onMount={() => console.count('sample portal (mount into body) render count')}
        >
          <div>Portal</div>
        </Portal>
      )}
    </div>
  );
};

export { PortalSample };
