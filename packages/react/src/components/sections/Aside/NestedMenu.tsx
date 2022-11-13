import { EnhancedNavLink } from "./Link";
import styles from "./Aside.module.scss";
import { CategoryType } from "@/constants/routes";

export type MenuItem = Readonly<{
  name: string;
  url: string;
  next?: {
    category: CategoryType;
    items: MenuItem[];
  };
}>;
export type Menu = Readonly<{
  category: CategoryType;
  items: MenuItem[];
}>;

const NestedMenu: RFC<{ menu: Menu }> = ({ menu }) => {
  return (
    <>
      {menu.category && (
        <EnhancedNavLink to={menu.category.url} className={styles["category"]}>
          {menu.category.name}
        </EnhancedNavLink>
      )}
      {menu.items &&
        menu.items.map((item) => {
          return (
            <div key={item.name} style={{ paddingLeft: 15 }}>
              <EnhancedNavLink to={item.url} className={styles["link-group-item"]}>
                {item.name}
              </EnhancedNavLink>
              <div className={styles["link-group"]}>
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
