import { SvgIcon, svgIconMap } from '@/components/UI/Icons';
import React from 'react';
import styles from './IconsSample.module.scss';

const IconsSample: RFC = () => {
  return (
    <div className={styles['icons']}>
      {/* <div>Github icons</div> */}
      <div className={styles['icon-list']}>
        {(Object.keys(svgIconMap) as unknown as (keyof typeof svgIconMap)[]).map((iconName) => {
          return (
            <React.Fragment key={iconName}>
              <div className={styles['icon-holder']}>
                <div className={styles['icon-inner']}>
                  <div className={styles['icon-name']}>{iconName}</div>
                  <SvgIcon className={styles['icon-component']} type={iconName} />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export { IconsSample };
