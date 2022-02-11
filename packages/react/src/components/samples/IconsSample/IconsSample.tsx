import { SvgIcon, svgIconMap } from '@/components/UI/Icons';
import styles from './IconsSample.module.scss';

const IconsSample = () => {
  return (
    <div className={styles['icons']}>
      <div>Github icons</div>
      <div className={styles['icon-list']}>
        {(Object.keys(svgIconMap) as unknown as (keyof typeof svgIconMap)[]).map((iconName) => {
          return (
            <>
              <div key={iconName} className={styles['icon-holder']}>
                <div className={styles['icon-name']}>{iconName}</div>
                <SvgIcon className={styles['icon-component']} type={iconName} />
              </div>
              <div key={iconName} className={styles['icon-holder']}>
                <div className={styles['icon-name']}>{iconName}</div>
                <SvgIcon className={styles['icon-component']} type={iconName} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export { IconsSample };
