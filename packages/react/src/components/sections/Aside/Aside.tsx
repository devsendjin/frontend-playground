import { Route, RouteMap, ROUTES, routesMap } from "@/constants/routes";
import { Menu, MenuItem, NestedMenu } from "./NestedMenu";
import { EnhancedNavLink } from "./Link";
import styles from "./Aside.module.scss";

const mapRoutesToNavigation = (routesMaps: RouteMap[]): Menu[] => {
  const handler = (routes: Route[]): MenuItem[] => {
    return routes.map<MenuItem>((route) => {
      const base: MenuItem = {
        url: route.url,
        name: route.name,
      };

      if (!route.next) {
        return base;
      }

      return {
        ...base,
        next: {
          category: route.next.category,
          items: route.next.routes ? handler(route.next.routes) : [],
        },
      };
    });
  };

  return routesMaps.map<Menu>(
    (routeMap) => ({
      category: routeMap.category,
      items: routeMap.routes && routeMap.routes.length > 0 ? handler(routeMap.routes) : [],
    }),
    []
  );
};

const mappedRoutes = mapRoutesToNavigation(routesMap);

const Aside: RFC = () => {
  return (
    <aside className={styles["aside"]}>
      <EnhancedNavLink to={ROUTES.root} className={styles["top-link"]}>
        Playground
      </EnhancedNavLink>
      <EnhancedNavLink to={ROUTES.combined} className={styles["top-link"]}>
        All in one
      </EnhancedNavLink>

      {mappedRoutes.map((navBlock) => (
        <NestedMenu key={navBlock.category.name} menu={navBlock} />
      ))}
    </aside>
  );
};
Aside.displayName = Aside.name;

export { Aside };
