// PartsList.tsx
// fun stats as the bill of materials from a drawing: item, value, description.
// rows draw in one after another the first time the table scrolls into view.

"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type PartsRow = {
  value: string | number;
  label: string;
  /** "bar" draws a gauge from a percentage value; "cursor" adds a blinking caret */
  kind?: "bar" | "cursor";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PartsList({
  rows,
  rev,
}: {
  rows: PartsRow[];
  rev: string | number;
}) {
  const reduceMotion = useReducedMotion();

  const body: Variants = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: 0.15,
      },
    },
  };
  const row: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -10 },
        shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 id="fun-stats-title" className="label">
          fun stats
        </h3>
        <span className="label !text-[10px]">rev. {rev}</span>
      </div>

      <table className="w-full table-fixed border-collapse font-mono text-xs">
        <thead>
          <tr className="border-y border-rule text-left">
            <th
              scope="col"
              className="label w-11 py-1.5 !text-[10px] font-normal"
            >
              item
            </th>
            <th
              scope="col"
              className="label w-[5.5rem] py-1.5 !text-[10px] font-normal"
            >
              qty
            </th>
            <th scope="col" className="label py-1.5 !text-[10px] font-normal">
              description
            </th>
          </tr>
        </thead>
        <motion.tbody
          variants={body}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          {rows.map(({ value, label, kind }, i) => {
            const pct = kind === "bar" ? parseFloat(String(value)) : NaN;
            return (
              <motion.tr
                key={`${i}-${label}`}
                variants={row}
                className="border-b border-border"
              >
                <td className="py-2 text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="truncate py-2 pr-2 text-sm text-foreground">
                  {value}
                  {kind === "cursor" && (
                    <span
                      aria-hidden="true"
                      className="caret ml-0.5 inline-block h-[0.95em] w-[0.5em] translate-y-[0.12em] bg-primary"
                    />
                  )}
                </td>
                <td className="py-2">
                  <div className="flex min-w-0 items-center gap-2 text-foreground/75">
                    <span
                      title={label}
                      className="min-w-0 line-clamp-2 break-words"
                    >
                      {label}
                    </span>
                    {Number.isFinite(pct) ? (
                      // gauge: a hairline track filled to the value
                      <span
                        aria-hidden="true"
                        className="relative h-1.5 min-w-8 flex-1 border border-rule"
                      >
                        <motion.span
                          className="absolute inset-y-0 left-0 bg-primary"
                          initial={{ width: reduceMotion ? `${pct}%` : 0 }}
                          whileInView={{
                            width: `${Math.min(100, Math.max(0, pct))}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: reduceMotion ? 0 : 1.1,
                            delay: 0.3 + i * 0.09,
                            ease: EASE,
                          }}
                        />
                      </span>
                    ) : (
                      // leader dots out to the edge, like an index
                      <span
                        aria-hidden="true"
                        className="h-px min-w-3 flex-1 translate-y-1 border-b border-dotted border-rule"
                      />
                    )}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>
    </div>
  );
}
