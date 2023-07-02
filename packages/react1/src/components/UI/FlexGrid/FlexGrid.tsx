import React from "react";
import cn from "classnames";
import styles from "./FlexGrid.module.scss";
import { FlexGridProvider, useFlexGridContext, FlexGridContextProps } from "./FlexGrid.context";

const defaultProps = {
  colGap: 15,
  cols: 12,
};

type RowProps = FlexGridContextProps & {
  className?: string;
  style?: React.CSSProperties;
};
const Row: RFC<RowProps> = ({
  colGap = defaultProps.colGap,
  rowGap = colGap,
  cols = defaultProps.cols,
  style,
  className,
  children,
}) => {
  return (
    <div
      className={cn(styles["row"], className)}
      style={{ "--col-gap": `${colGap}px`, "--row-gap": `${rowGap}px`, ...style } as React.CSSProperties}>
      <FlexGridProvider value={{ cols, colGap, rowGap }}>{children}</FlexGridProvider>
    </div>
  );
};

type ColProps = {
  className?: string;
  size: number;
};
const Col: RFC<ColProps> = ({ size, className, children }) => {
  const { cols, colGap } = useFlexGridContext();

  return (
    <div
      className={cn(styles["col"], className)}
      style={{ "--col-gap": `${colGap}px`, "--cols": cols, "--col": size } as React.CSSProperties}>
      {children}
    </div>
  );
};

export { Row, Col };
