import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cn from "classnames";
import styles from "./Aside.module.scss";

const withActiveNavLink = (LinkComponent: typeof NavLink, hocLinkProps: { hocClassName?: string } = {}) => {
  const { hocClassName } = hocLinkProps;
  return React.forwardRef<HTMLAnchorElement, Omit<NavLinkProps, "className"> & { className?: string }>(
    ({ className, onMouseOver, ...rest }, ref) => {
      return (
        <LinkComponent
          className={({ isActive }) => cn(isActive && styles["is-active"], className, hocClassName)}
          ref={ref}
          {...rest}
        />
      );
    }
  );
};
const EnhancedNavLink = withActiveNavLink(NavLink, { hocClassName: styles["link"] });

export { EnhancedNavLink };
