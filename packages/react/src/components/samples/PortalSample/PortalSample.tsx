import { useState } from 'react';
import cn from 'classnames';
import { Button } from '@/vendors/bootstrap';
import { Portal } from '@/components/features/Portal';
import styles from './PortalSample.module.scss';

const PortalSample: RFC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [toggleBodyPortal, setToggleBodyPortal] = useState<boolean>(false);

  return (
    <div className={styles['portal']}>
      <div className={cn(styles['btn-box'], 'btn-group')}>
        <Button type="button" className="btn btn-light" onClick={() => setToggle((prev) => !prev)} variant="light">
          Toggle portal
        </Button>
        <Button
          type="button"
          className="btn btn-light"
          onClick={() => setToggleBodyPortal((prev) => !prev)}
          variant="light"
        >
          Toggle portal (mount in body)
        </Button>
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
