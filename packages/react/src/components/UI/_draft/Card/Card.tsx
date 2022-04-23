import styles from './Card.module.scss';

// https://ui.glass/generator/

const Card: RFC = ({ children }) => {
  return (
    <div className={styles['card']}>
      <div className={styles['body']}>{children}</div>
    </div>
  );
};
export { Card };
