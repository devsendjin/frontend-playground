import { useState } from 'react';
import cn from 'classnames';
import { Portal } from '@/components/features/Portal';
import styles from './PortalSample.module.scss';

const PortalSample = () => {
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
        <Portal containerIdentifier="#portal-mount">
          {/* <Portal containerIdentifier={document.getElementById('portal')} */}
          {console.count('sample portal reder count')}
          <div>Portal</div>
        </Portal>
      )}
      {toggleBodyPortal && (
        <Portal id="portal-node" className="portal-node" style={{ color: 'red' }}>
          {console.count('sample portal (mount into body) reder count')}
          <div>Portal</div>
        </Portal>
      )}
    </div>
  );
};

export { PortalSample };
