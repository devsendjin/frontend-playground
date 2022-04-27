import { EnhancedNavLink } from './Link';
import styles from './Aside.module.scss';

export type MenuItem = Readonly<{
  name: string;
  url: string;
  next?: {
    category: string;
    items: MenuItem[];
  };
}>;
export type Menu = Readonly<{
  category: string;
  items: MenuItem[];
}>;

const NestedMenu: RFC<{ menu: Menu }> = ({ menu }) => {
  return (
    <>
      {menu.category && <div className={styles['category']}>{menu.category}</div>}
      {menu.items &&
        menu.items.map((item) => {
          return (
            <div key={item.name} style={{ paddingLeft: 15 }}>
              <EnhancedNavLink to={item.url} className={styles['link-group-item']}>
                {item.name}
              </EnhancedNavLink>
              <div className={styles['link-group']}>
                {item.next && <NestedMenu menu={{ category: item.next.category, items: item.next.items }} />}
              </div>
            </div>
          );
        })}
    </>
  );
};
NestedMenu.displayName = NestedMenu.name;

export { NestedMenu };
