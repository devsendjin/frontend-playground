import { Routes, Route } from "react-router-dom";
import { byCategoryRoutesMap, componentMap, ROUTES } from "@/constants/routes";
import { AllInOne } from "@/components/views/AllInOne";
import { FrontView } from "@/components/views/FrontView";
import styles from "./Main.module.scss";

const Main: RFC = () => {
  return (
    <main className={styles["main"]}>
      <Routes>
        <Route path={ROUTES.root} element={<FrontView />} />
        <Route path={ROUTES.combined} element={<AllInOne />} />

        {byCategoryRoutesMap.map((route) => {
          const Component = route.component;
          return <Route key={route.url} path={route.url} element={<Component />} />;
        })}

        {componentMap.map((route) => {
          if (!route) return null;
          const { url, component: Component } = route;

          return <Route key={url} path={url} element={<Component />} />;
        })}
      </Routes>
    </main>
  );
};
Main.displayName = Main.name;

export { Main };
