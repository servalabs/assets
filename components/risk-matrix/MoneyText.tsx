import { Fragment } from "react";
import { splitMoney } from "./money";

/** Renders text with each money amount wrapped in `<mark class="rm-money">`. */
export function MoneyText({ text, className = "rm-money" }: { text: string; className?: string }) {
  return (
    <>
      {splitMoney(text).map((seg, i) =>
        seg.money ? (
          <mark key={i} className={className}>
            {seg.text}
          </mark>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}
