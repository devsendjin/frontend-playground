import { CSSProperties, Fragment, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { fromEvent } from "rxjs";
import { throttleTime, debounceTime, tap } from "rxjs/operators";
import styles from "./HTMLDomWatcherApp.module.scss";
import { useLocalStorageState } from "@/hooks/utils/useLocalStorageState";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// useEffect(() => {
//   toast.info('🦄 Wow so easy!', {
//     position: "top-right",
//     autoClose: false,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//     });
// }, [])

// type RGBTuple = [r: number, g: number, b: number];
// const parseRGB = (value: string): RGBTuple => value.replace("rgb(", "").replace(")", "").split(", ").map(Number) as RGBTuple;
// const valueToHex = (value: number): string =>  value.toString(16);
// const rgbToHex = (r: number, g: number, b: number): string => `${valueToHex(r)}${valueToHex(g)}${valueToHex(b)}`;

/*
mode: "click" | "hover"
*/

const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    console.error("You are using old browser, try to update to the latest version");
    return;
  }
  navigator.clipboard.writeText(text).catch((err) => {
    console.error("Could not copy text: ", err);
  });
};

type HTMLDomWatcherAppProps = {
  className?: string;
};

const rgba2hex = (rgba: string): string =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    ?.slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, "0").replace("NaN", "")
    )
    .join("")}`;

type PropKeyValue = (keyof CSSStyleDeclaration | keyof Pick<HTMLElement, "classList">) & (string & {});
type PropKey = {
  value: PropKeyValue;
  // value: keyof CSSStyleDeclaration;
};

type PropValue = {
  value: string | string[];
};

type PropertiesMap = Map<PropKey, PropValue>;

const defaultValues = {
  throttle: 100,
  panelMaxWidth: 400,
};

const HTMLDomWatcherApp: RFC<HTMLDomWatcherAppProps> = ({ className }) => {
  const [htmlElement, setHtmlElement] = useState<HTMLElement | null>();

  // const [arraySeparator, setArraySeparator] = useState("\n");

  const [isSettingsVisible, toggleSettings] = useState<boolean>(false);
  const [propertiesMap, setPropertiesMap] = useState<PropertiesMap>(new Map());
  const [panelMaxWidth, setPanelMaxWidth] = useLocalStorageState<number>("panelMaxWidth", defaultValues.panelMaxWidth);
  const [parsingDebounce, setParsingDebounce] = useLocalStorageState<number>("throttle", defaultValues.throttle);
  // const [mode, setMode] = useLocalStorageState<"click" | "hover">("mode", "click");
  const hoveredHtmlEls = useRef<Set<HTMLElement>>(new Set());

  const resetToDefaults = () => {
    setPanelMaxWidth(defaultValues.panelMaxWidth);
    setParsingDebounce(defaultValues.throttle);
    setPropertiesMap(new Map());
    toggleSettings(false);
    clearOutline();
  };

  const clearOutline = () => {
    console.log(hoveredHtmlEls.current);

    hoveredHtmlEls.current.forEach((el) => {
      el.style.outline = "";
    });
  };

  useEffect(() => {
    if (!htmlElement) return;
    const computedStyle = window.getComputedStyle(htmlElement);
    const choosenStyleProps = new Set<keyof CSSStyleDeclaration>([
      "fontSize",
      "fontWeight",
      "fontStyle",
      "color",
      "backgroundColor",
      "lineHeight",
    ]);

    const propertiesMapValue = new Map<PropKey, PropValue>();

    (Object.entries(computedStyle) as [keyof CSSStyleDeclaration, string][])
      .filter(([key]) => choosenStyleProps.has(key))
      .map(([k, v]) => {
        if (k === "color" || k === "backgroundColor") {
          return [k, rgba2hex(v)];
        }
        return [k, v];
      })
      .forEach(([k, v]) => {
        if (typeof k !== "symbol" && typeof k !== "number" && typeof v !== "symbol" && typeof v !== "number") {
          const _k = k as PropKeyValue;
          propertiesMapValue.set({ value: _k }, { value: v });
        }
      });
    propertiesMapValue.set({ value: "classList" }, { value: [...htmlElement.classList].map((cls) => cls.trim()) });

    setPropertiesMap(propertiesMapValue);
  }, [htmlElement]);

  useEffect(() => {
    const rx = fromEvent(document, "mousemove")
      .pipe(
        throttleTime(50),
        tap((e) => {
          const event = e as unknown as React.MouseEvent<Document>;
          const el = event.target as HTMLElement;

          if (event.altKey) {
            hoveredHtmlEls.current.add(el);
            el.style.outline = "1px solid #f00";
          }
        }),
        debounceTime(parsingDebounce)
      )
      .subscribe((e) => {
        const event = e as unknown as React.MouseEvent<Document>;
        const el = event.target as HTMLElement;

        hoveredHtmlEls.current.forEach((element) => {
          if (element !== el) {
            element.style.outline = "";

            if (hoveredHtmlEls.current.has(element)) {
              hoveredHtmlEls.current.delete(element);
            }
          }
        });
        if (event.altKey) {
          setHtmlElement(el);
        }
      });

    return () => {
      console.log("unsubscribe");
      rx.unsubscribe();
    };
  }, [parsingDebounce]);

  return (
    <div>
      <div className={cn(styles.test, "HTMLDomWatcherAppHTMLDomWatcherAppHTMLDomWatcherApp", "HTMLDomWatcherApp2")}>
        HTMLDomWatcherApp
      </div>
      <div
        className={cn(styles.htmldomwatcher, className)}
        style={{ "--panelMaxWidth": `${panelMaxWidth}px` } as CSSProperties}>
        <div className={cn(styles.settings, { [`${styles.isSettingsVisible}`]: isSettingsVisible })}>
          {/* <label>
            <input type='radio' name='mode' checked={mode === "click"} onChange={() => setMode("click")} /> click
          </label>
          <label>
            <input type='radio' name='mode' checked={mode === "hover"} onChange={() => setMode("hover")} /> hover
          </label> */}
          <button onClick={resetToDefaults} className={styles.button}>
            reset
          </button>
          <label className={styles.label}>
            parsingDebounce
            <input
              className={styles.input}
              type='number'
              value={parsingDebounce}
              onChange={(e) => setParsingDebounce(+e.target.value)}
            />
          </label>
          <label className={styles.label}>
            panelMaxWidth
            <input
              className={styles.input}
              type='number'
              value={panelMaxWidth}
              onChange={(e) => setPanelMaxWidth(+e.target.value)}
            />
          </label>
        </div>
        <button onClick={() => toggleSettings((prev) => !prev)} className={cn(styles.button, styles.buttonSettings)}>
          toggle settings
        </button>
        <div className={cn(styles.properties, propertiesMap.size > 0 && styles.hasParsedProperties)}>
          <div className={cn(styles.propertiesCol, styles.propertyKeys)}>
            {[...propertiesMap.keys()].map((k) => {
              return Array.isArray(propertiesMap.get(k)?.value) ? (
                (propertiesMap.get(k)?.value as string[]).map((v, index) => {
                  return (
                    <div key={v} className={styles.propertyKey}>
                      {index === 1 ? k.value : "---"}
                    </div>
                  );
                })
              ) : (
                <div key={k.value} className={styles.propertyKey}>
                  <button
                    onClick={() => copyTextToClipboard(k.value)}
                    className={cn(styles.button, styles.buttonCopyArrayItem, styles.buttonCopyPropertyKey)}>
                    c
                  </button>

                  {k.value}
                </div>
              );
            })}
          </div>
          <div className={cn(styles.propertiesCol, styles.propertyValues)}>
            {[...propertiesMap.keys()].map((k) => {
              if (Array.isArray(propertiesMap.get(k)?.value)) {
                const classes = propertiesMap.get(k)?.value as string[];
                return (
                  <Fragment key={k.value}>
                    <div className={styles.arrayControls}>
                      <button onClick={() => copyTextToClipboard(classes.join("\n"))} className={cn(styles.button)}>
                        copy all classes
                      </button>
                      {/* <label className='label'>
                        <input type='text' value={arraySeparator} onChange={(e) => setArraySeparator(e.target.value)} />
                      </label> */}
                    </div>
                    {(propertiesMap.get(k)?.value as string[]).map((v) => (
                      <div key={v} className={styles.arrayBoxProp}>
                        <button
                          onClick={() => copyTextToClipboard(v)}
                          className={cn(styles.button, styles.buttonCopyArrayItem)}>
                          c
                        </button>
                        {v}
                      </div>
                    ))}
                  </Fragment>
                );
              }
              return (
                <div key={k.value} className={styles.propertyValue}>
                  <button
                    onClick={() =>
                      propertiesMap.get(k)?.value && copyTextToClipboard(propertiesMap.get(k)?.value as string)
                    }
                    className={cn(styles.button, styles.buttonCopyArrayItem)}>
                    c
                  </button>
                  {propertiesMap.get(k)?.value}
                  {(k.value === "color" || k.value === "backgroundColor") && (
                    <span
                      className={styles.colorHighlight}
                      style={{ backgroundColor: propertiesMap.get(k)?.value as string }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export { HTMLDomWatcherApp };
