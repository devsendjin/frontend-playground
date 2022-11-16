import { useEffect, useState } from "react";
import cn from "classnames";
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";
import styles from "./HTMLDomWatcherApp.module.scss";
import { useLocalStorageState } from "@/hooks/utils/useLocalStorageState";

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

const HTMLDomWatcherApp: RFC<HTMLDomWatcherAppProps> = ({ className }) => {
  const [htmlElement, setHtmlElement] = useState<HTMLElement | null>();
  const [css, setCss] = useState<(CSSStyleDeclaration & { classList: string[] }) | null>(null);
  const [throttle, setThrottle] = useLocalStorageState<number>("throttle", 1000);

  useEffect(() => {
    if (!htmlElement) return;
    const computedStyle = window.getComputedStyle(htmlElement);
    const choosenStyleProps = new Set<keyof CSSStyleDeclaration>(["fontSize", "fontWeight", "fontStyle", "color", "lineHeight"]);
    const filteredComputedStyle = (Object.entries(computedStyle) as [keyof CSSStyleDeclaration, string][])
      .filter(([key]) => choosenStyleProps.has(key))
      .map(([k, v]) => {
        if (k === "color") {
          return [k, rgba2hex(v)];
        }
        return [k, v];
      });
    const transformed = Object.fromEntries(filteredComputedStyle);

    const res = { ...transformed, classList: [...htmlElement.classList].map((cls) => cls) };

    setCss(res);
  }, [htmlElement]);

  useEffect(() => {
    const rx = fromEvent(document, "mousemove")
      .pipe(throttleTime(throttle))
      .subscribe((e) => {
        const el = e.target as HTMLElement;

        if (!el.dataset.disableMousemove) {
          setHtmlElement(el);
        }
      });

    return () => {
      console.log("unsubscribe");

      rx.unsubscribe();
    };
  }, [throttle]);

  return (
    <div>
      <div className={`${styles.test}, ${styles.test}`}>HTMLDomWatcherApp</div>
      <div className={cn(styles.htmldomwatcher, className)}>
      <input type="number" value={throttle} onChange={(e) => setThrottle(+e.target.value)} data-disable-mousemove  />
        {css && (
          <pre>
            <code>{JSON.stringify(css, null, 2)}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export { HTMLDomWatcherApp };
