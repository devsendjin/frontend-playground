import { Container } from "@/vendors/bootstrap";
import cn from "classnames";
import { BsCard } from "@/components/UI/BsCard";
import { routesMap } from "@/constants/routes";
import styles from "./SampleList.module.scss";
import React from "react";

const SampleList: RFC = () => {
  return (
    <Container>
      <div className={styles["sample-list"]}>
        {routesMap.map(({ category, routes }) => (
          <React.Fragment key={category.name}>
            <h2 className={cn("mb-0", styles["title"])}>{category.name}</h2>
            <div className={styles["grid"]}>
              {routes &&
                routes.map((route) => (
                  <BsCard key={route.name} to={route.url}>
                    {route.name}
                  </BsCard>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};
SampleList.displayName = SampleList.name;

export { SampleList };
