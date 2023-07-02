// @ts-nocheck
import React, { createRef, Ref, useEffect, useRef, useState } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cn from "classnames";
import { gsap } from "gsap";
import { randomItemFromArray } from "@/utils";
import { ROUTES, routesMap, TRouteArray } from "@/constants/routes";
import styles from "./Aside.module.scss";

// const colors = [
//   '#2775fe',
//   '#377bfe',
//   '#4482ff',
//   '#4f88ff',
//   '#5a8eff',
//   '#6495ff',
//   '#6d9bff',
//   '#77a2ff',
//   '#80a8ff',
//   '#89aeff',
// ];

const colors = ["#2196f3", "#03a9f4", "#00bcd4", "#009688"];

const withActiveNavLink = (LinkComponent: typeof NavLink) => {
  return React.forwardRef<HTMLAnchorElement, Omit<NavLinkProps, "className"> & { className?: string }>(
    ({ className, onMouseOver, ...rest }, ref) => {
      // const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

      // const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      //   if (onMouseOver) {
      //     onMouseOver(e);
      //   }
      //   setIsMouseOver(true);
      // };

      return (
        <LinkComponent
          className={({ isActive }) =>
            cn(isActive && styles["is-active"], isMouseOver && styles["is-mouseover"], className)
          }
          // onMouseOver={handleMouseOver}
          ref={ref}
          {...rest}
        />
      );
    }
  );
};

const EnhancedNavLink = withActiveNavLink(NavLink);

const routesArray: TRouteArray[] = routesMap.reduce<TRouteArray[]>((acc, { routes }) => {
  acc.push(routes);
  return acc;
}, []);

const Aside = () => {
  const $root = useRef<HTMLDivElement | null>(null);
  const $indicator1 = useRef<HTMLDivElement | null>(null);
  const $indicator2 = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string>("00");

  const $linkRefs = useRef(
    routesMap.map(({ routes }) => {
      return routes.map(() => createRef<HTMLAnchorElement>());
    })
  );

  const animate = () => {
    if (!$root.current) return;
    const menuOffset = $root.current.getBoundingClientRect();
    const activeIndexes = active.split("").map(Number);

    const activeItem = $linkRefs.current[activeIndexes[0]][activeIndexes[1]].current;
    if (!activeItem) return;
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width,
      height,
      backgroundColor: randomItemFromArray(colors),
      ease: "elastic.out(.7, .7)",
      duration: 0.8,
    };

    gsap.to($indicator1.current, {
      ...settings,
    });

    gsap.to($indicator2.current, {
      ...settings,
      duration: 1,
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener("resize", animate);

    return () => {
      window.removeEventListener("resize", animate);
    };
  }, [active]);

  return (
    <aside className={styles["aside"]}>
      <div ref={$root} className={styles["menu"]}>
        <EnhancedNavLink to={ROUTES.root} className={cn(styles["link"], styles["top-link"])}>
          Playground
        </EnhancedNavLink>

        <EnhancedNavLink to={ROUTES.combined} className={cn(styles["link"], styles["top-link"])}>
          All in one
        </EnhancedNavLink>

        {routesMap.map(({ category }, sampleIndex) => {
          const routes = routesArray[sampleIndex];

          return (
            <React.Fragment key={category}>
              <div>{category}</div>
              <div className={styles["link-group"]}>
                {routes.map((route, routeIndex) => {
                  const linkActiveIndex = `${sampleIndex}${routeIndex}`;

                  return (
                    <EnhancedNavLink
                      key={route.name}
                      ref={$linkRefs.current[sampleIndex][routeIndex] as Ref<HTMLAnchorElement>}
                      to={route.route}
                      className={cn(
                        styles["link"],
                        styles["link-group-item"],
                        active === linkActiveIndex && styles["is-active-animated"]
                      )}
                      onMouseEnter={() => {
                        setActive(linkActiveIndex);
                      }}>
                      {route.name}
                    </EnhancedNavLink>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
        <div ref={$indicator1} className={styles["indicator"]} />
        <div ref={$indicator2} className={styles["indicator"]} />
      </div>
    </aside>
  );
};

export { Aside };
