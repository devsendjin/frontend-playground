import { useState } from "react";
import Downshift, { useSelect } from "downshift";
import cn from "classnames";
import s from "./dropdown.module.scss";

type Lang = {
  value: string;
  label: string;
};

const defaultLang: Lang = {
  value: "en",
  label: "English",
};

const langs: Lang[] = [
  defaultLang,
  { value: "ua", label: "Ukrainian" },
  { value: "ru", label: "Russian" },
];

type DropdownProps = {
  className?: string;
  children?: React.ReactNode;
};

const itemToString = (item: Lang | null) => {
  return item ? item.label : "";
};

const Dropdown = ({ className }: DropdownProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    closeMenu,
    selectItem,
  } = useSelect({
    items: langs,
    itemToString,
  });

  return (
    <div onMouseLeave={closeMenu} className={cn(s.dropdown, className)}>
      <div className={s.head}>
        {/* <label {...getLabelProps()}>Choose your favorite book:</label> */}
        <div className="flex justify-between">
          <div
            className="p-2 bg-white flex justify-between grow cursor-pointer"
            onClick={() => {
              openMenu();
            }}
            {...getToggleButtonProps({
              // onClick() {
              //   openMenu();
              // },
            })}>
            <span
            // onClick={() => {
            //   openMenu();
            // }}
            >
              {selectedItem ? selectedItem.label : "Choose lang"}
            </span>
            <span className="px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
          </div>
          <button
            aria-label="clear selection"
            className="p-2 bg-white"
            type="button"
            onClick={() => {
              selectItem(null);
            }}>
            &#215;
          </button>
        </div>
      </div>
      <ul
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
          !isOpen && "hidden"
        }`}
        {...getMenuProps()}>
        {isOpen &&
          langs.map((item, index) => (
            <li
              className={cn(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "py-2 px-3 shadow-sm flex flex-col"
              )}
              key={item.value}
              {...getItemProps({ item, index })}>
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Dropdown };
