import React from "react";
import cn from "classnames";
import { Button } from "@/vendors/bootstrap";
import { callAll, PartialBy } from "@/utils";
import styles from "./PropCollectionsGetters.module.scss";
import "./PropCollectionsGetters.scss";

const noop = () => {};

type SwitchProps = {
  onClick?: () => void;
  on: boolean;
  className?: string;
  "aria-label"?: string;
};

const Switch: RFC<SwitchProps> = ({ on, className = "", "aria-label": ariaLabel = "Toggle", onClick, ...rest }) => {
  return (
    <label aria-label={ariaLabel} className='toggle-label' style={{ display: "inline-flex" }}>
      <input
        className='toggle-input'
        type='checkbox'
        checked={on}
        onChange={noop}
        onClick={onClick}
        data-testid='toggle-input'
      />
      <span className={cn(className, "toggle-btn", on ? "toggle-btn-on" : "toggle-btn-off")} {...rest} />
    </label>
  );
};

type GetTogglerProps = PartialBy<SwitchProps, "on"> & {
  id?: string;
};
type GetTogglerReturn = PartialBy<SwitchProps, "on"> & {
  "aria-pressed": SwitchProps["on"];
};

const useToggle = () => {
  const [on, setOn] = React.useState<boolean>(false);
  const toggle = () => setOn((prev) => !prev);

  const getTogglerProps = ({ onClick, ...customProps }: GetTogglerProps = {}): GetTogglerReturn => {
    return {
      "aria-pressed": on,
      onClick: callAll(toggle, onClick),
      ...customProps,
    };
  };

  return {
    on,
    toggle,
    getTogglerProps,
  };
};

type PropCollectionsGettersProps = {
  className?: string;
};

const PropCollectionsGetters: RFC<PropCollectionsGettersProps> = ({ className }) => {
  const { on, getTogglerProps } = useToggle();

  return (
    <div className={cn(styles["prop-collections-getters"], "prop-collections-getters", className)}>
      <Switch on={on} {...getTogglerProps()} />

      <Button
        variant='light'
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
          className: "toggle-on-off",
        })}>
        {on ? "on" : "off"}
      </Button>
    </div>
  );
};

export { PropCollectionsGetters };
