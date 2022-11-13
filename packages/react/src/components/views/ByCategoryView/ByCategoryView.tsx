import { routesMap } from "@/constants/routes";
import cn from "classnames";
import styles from "../AllInOne/AllInOne.module.scss";
import { CategoryTitle, SampleTitle } from "@UI/playground/Title";

type ByCategoryViewProps = {
  url: string;
  title: string;
};

const ByCategoryView: RFC<ByCategoryViewProps> = ({ url, title }) => {
  console.log({ url, title });

  const categoryRoutes = routesMap.find((route) => route.category.url === url)?.routes ?? [];

  return (
    <>
      <CategoryTitle className={cn(styles["category"], styles["title"])}>{title}</CategoryTitle>

      {categoryRoutes &&
        categoryRoutes.map((route) => {
          const Component = route.component;
          return (
            <div key={route.name} className={styles["sample"]}>
              <SampleTitle className='mb-3'>{route.name}</SampleTitle>
              <Component key={route.name} />
            </div>
          );
        })}
    </>
  );
};

ByCategoryView.displayName = "ByCategoryView";

export { ByCategoryView };
