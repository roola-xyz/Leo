import type { ReactNode } from "react";
import { cn } from "../../cn";

/**
 * One headline figure: a label, the value, a note under it, and — when there
 * is a history — a sparkline beside it.
 *
 * The sparkline is the comparison a single number lacks: "1,204 calls" says
 * nothing about whether that is a busy month until its shape is next to it. It
 * is drawn only when two or more values differ, because a flat run of equal
 * numbers across a tile reads as a deliberate plateau rather than as nothing
 * happening.
 *
 * `tone` colours the note, never the value. The value is a fact; whether it is
 * good news is the note's to say.
 */
export function Stat({
  label,
  value,
  note,
  tone = "plain",
  spark,
  loading = false,
  action,
  className,
}: {
  label: string;
  /** A string, because "1,204", "3 / 25" and "—" are all legitimate. */
  value: ReactNode;
  note?: ReactNode;
  tone?: "plain" | "good" | "warn" | "bad";
  /** Daily values, oldest first. */
  spark?: number[];
  /** Greys the value while the real one is on its way. */
  loading?: boolean;
  /** Wraps the tile — a link to the page the figure comes from. */
  action?: (tile: ReactNode) => ReactNode;
  className?: string;
}) {
  const tile = (
    <div className={cn("flex h-full items-end gap-3 rounded-card bg-surface px-5 py-4", className)}>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-on-surface-variant">{label}</p>
        <p
          className={cn(
            "mt-1 text-3xl leading-tight font-normal tracking-tight text-on-surface",
            loading && "animate-pulse text-on-surface-variant",
          )}
        >
          {value}
        </p>
        {note && (
          <p
            className={cn(
              "mt-0.5 text-xs",
              tone === "plain" && "text-on-surface-variant",
              tone === "good" && "text-success",
              tone === "warn" && "text-warning",
              tone === "bad" && "text-error",
            )}
          >
            {note}
          </p>
        )}
      </div>

      {spark && <Sparkline values={spark} />}
    </div>
  );

  return <>{action ? action(tile) : tile}</>;
}

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2 || values.every((value) => value === values[0])) return null;

  const width = 88;
  const height = 32;
  const maximum = Math.max(...values, 1);
  const points = values.map((value, index) => [
    (width * index) / (values.length - 1),
    height - 2 - ((height - 4) * value) / maximum,
  ]);
  const line = points.map(([px, py], index) => `${index === 0 ? "M" : "L"}${px},${py}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true" className="shrink-0">
      <path d={`${line} L${width},${height} L0,${height} Z`} fill="var(--color-primary)" opacity={0.12} />
      <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}
