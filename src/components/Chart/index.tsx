import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { cn } from "../../cn";

/**
 * A time series, as a line or as bars.
 *
 * ## Why hand-drawn SVG and not a charting library
 *
 * The estate needs two shapes and a charting library brings four hundred, with
 * its own theming system that would have to be taught the M3 tokens twice —
 * once for light and once for dark. This is a couple of hundred lines and every
 * mark in it is a Leo colour, which is the property that matters: a chart in a
 * Roola application should look drawn by the same hand as the page around it.
 *
 * ## One axis, always
 *
 * There is no second y-scale and no prop that would add one. Two measures of
 * different magnitude are two charts; a dual axis is the chart mistake that
 * reliably makes people read a relationship the data does not contain, because
 * the crossing point is set by whoever chose the scales.
 *
 * ## Colour is identity, never rank
 *
 * Series take `primary`, `warning`, `error`, then a neutral, in the order
 * given, for the life of the chart. Filtering one out must not repaint the
 * survivors. A fifth series is dropped rather than cycled: two series in one
 * colour on a chart whose job is telling them apart is worse than one missing.
 * The order suits the estate's commonest chart — served, refused, failed —
 * where the colour then also says what each line means.
 *
 * ## Accessibility
 *
 * A legend for two or more series, and a "Show as table" toggle carrying the
 * same numbers, so identity never rests on colour alone.
 */
export interface ChartSeries {
  /** The legend entry. */
  label: string;
  /** One value per point, in the same order as `labels`. */
  values: number[];
}

export interface ChartLabels {
  /** The toggle that swaps the plot for a table. */
  showTable: string;
  hideTable: string;
  /** The first column's heading in that table. */
  date: string;
}

const DEFAULT_LABELS: ChartLabels = { showTable: "Show as table", hideTable: "Hide table", date: "Date" };

/** Stroke and fill per slot, as Leo tokens. See "Colour is identity" above. */
const SLOTS = [
  { stroke: "var(--color-primary)", swatch: "bg-primary" },
  { stroke: "var(--color-warning)", swatch: "bg-warning" },
  { stroke: "var(--color-error)", swatch: "bg-error" },
  { stroke: "var(--color-on-surface-variant)", swatch: "bg-on-surface-variant" },
] as const;

const PAD = { top: 12, right: 16, bottom: 26, left: 48 };
const GRIDLINES = 4;

export function Chart({
  labels,
  series,
  kind = "line",
  area = false,
  height = 200,
  format = (value: number) => value.toLocaleString(),
  formatLabel,
  empty = "Nothing in this period.",
  text = DEFAULT_LABELS,
  className,
}: {
  /** The x axis, one per point. ISO dates are shortened to "6 Sep"; anything else is printed. */
  labels: string[];
  series: ChartSeries[];
  /** `line` for a trend, `bar` for a count per period. */
  kind?: "line" | "bar";
  /**
   * Fill under a line. Off by default: an area says "this adds up to
   * something", and a filled line of a rate is a shape implying a total that
   * means nothing.
   */
  area?: boolean;
  /** Plot height in pixels. The width is always the container's. */
  height?: number;
  /** A raw value as the axis and tooltip show it — "1,204", "£12.40". */
  format?: (value: number) => string;
  /** An x label as the axis shows it, for a caller with its own locale. */
  formatLabel?: (label: string) => string;
  /** Shown in place of the plot when every value is zero. */
  empty?: string;
  /** The chart's own words, for a translated page. */
  text?: ChartLabels;
  className?: string;
}) {
  const plotRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(720);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tabular, setTabular] = useState(false);

  /*
   * Measured with a ResizeObserver rather than the window: a chart in a card
   * whose sibling collapsed has changed width without the window having. The
   * viewBox is then the element's own pixel size, so nothing is stretched —
   * a fixed viewBox would scale the axis type along with the plot, and two
   * charts in cards of different widths would carry visibly different text.
   */
  useEffect(() => {
    const element = plotRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const measured = entry?.contentRect.width ?? 0;

      // Zero while display:none — a chart in a collapsed section — where it
      // would divide by zero in every coordinate below.
      if (measured > 0) setWidth(measured);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [tabular]);

  const drawn = series.slice(0, SLOTS.length);
  const isEmpty = drawn.every((s) => s.values.every((v) => v === 0));
  const shortLabel = formatLabel ?? defaultLabel;

  const plot = {
    x: PAD.left,
    y: PAD.top,
    width: Math.max(40, width - PAD.left - PAD.right),
    height: height - PAD.top - PAD.bottom,
  };

  const { step, lines } = useMemo(() => scale(drawn), [drawn]);
  const ceiling = step * lines;

  const x = (index: number) => {
    const count = labels.length;

    if (count <= 1) return plot.x + plot.width / 2;

    // Bars sit in the middle of a band, line points on its edges. One rule for
    // both puts the first bar half off the left of the plot.
    if (kind === "bar") {
      const band = plot.width / count;

      return plot.x + band * index + band / 2;
    }

    return plot.x + (plot.width * index) / (count - 1);
  };

  const y = (value: number) => plot.y + plot.height * (1 - value / ceiling);

  const path = (values: number[]) =>
    values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(value)}`).join(" ");

  const base = plot.y + plot.height;

  // A 2px gap between bars. Bars that touch read as one block — the shape of a
  // histogram, not of a count per day.
  const barWidth = Math.max(2, plot.width / Math.max(1, labels.length) / Math.max(1, drawn.length) - 2);

  // At most six x labels, evenly spaced, both ends always shown.
  const ticks = useMemo(() => {
    const every = Math.max(1, Math.ceil(labels.length / 6));
    const indices = new Set<number>();

    for (let index = 0; index < labels.length; index += every) indices.add(index);
    if (labels.length) indices.add(labels.length - 1);

    return [...indices].sort((a, b) => a - b);
  }, [labels.length]);

  function track(event: PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const pointer = event.clientX - box.left;
    let nearest = 0;
    let best = Infinity;

    for (let index = 0; index < labels.length; index++) {
      const distance = Math.abs(x(index) - pointer);

      if (distance < best) {
        best = distance;
        nearest = index;
      }
    }

    setHovered(nearest);
  }

  // Flipped past the midpoint so it never hangs off the right of the card —
  // which is where the latest and most looked-at point always is.
  const flip = hovered !== null && x(hovered) > plot.x + plot.width * 0.6;

  return (
    <figure className={cn("m-0", className)}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        {drawn.length > 1 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant">
            {drawn.map((s, slot) => (
              <li key={s.label} className="flex items-center gap-1.5">
                <span aria-hidden="true" className={cn("size-2.5 rounded-sm", SLOTS[slot]!.swatch)} />
                {s.label}
              </li>
            ))}
          </ul>
        )}

        {!isEmpty && (
          <button
            type="button"
            onClick={() => setTabular((value) => !value)}
            className="ml-auto text-xs font-medium text-primary hover:underline"
          >
            {tabular ? text.hideTable : text.showTable}
          </button>
        )}
      </div>

      {isEmpty ? (
        <p className="py-10 text-center text-sm text-on-surface-variant">{empty}</p>
      ) : tabular ? (
        <div className="max-h-80 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-on-surface-variant">
              <tr>
                <th className="py-1.5 pr-4 font-medium">{text.date}</th>
                {drawn.map((s) => (
                  <th key={s.label} className="py-1.5 pr-4 text-right font-medium">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-on-surface tabular-nums">
              {labels.map((label, index) => (
                <tr key={label} className="border-t border-outline-variant">
                  <td className="py-1.5 pr-4">{shortLabel(label)}</td>
                  {drawn.map((s) => (
                    <td key={s.label} className="py-1.5 pr-4 text-right">
                      {format(s.values[index] ?? 0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div ref={plotRef} className="relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            style={{ height }}
            className="block w-full touch-none"
            role="img"
            aria-label={drawn.map((s) => s.label).join(", ")}
            onPointerMove={track}
            onPointerLeave={() => setHovered(null)}
          >
            {/* Gridlines first and recessive: a grid that competes with the
                data is a grid being read instead of it. */}
            <g stroke="var(--color-outline-variant)" strokeWidth={1}>
              {Array.from({ length: lines + 1 }, (_, index) => {
                const lineY = plot.y + plot.height * (1 - index / lines);

                return <line key={index} x1={plot.x} x2={plot.x + plot.width} y1={lineY} y2={lineY} />;
              })}
            </g>

            <g fill="var(--color-on-surface-variant)" fontSize={11}>
              {Array.from({ length: lines + 1 }, (_, index) => (
                <text
                  key={index}
                  x={plot.x - 8}
                  y={plot.y + plot.height * (1 - index / lines) + 4}
                  textAnchor="end"
                >
                  {format(step * index)}
                </text>
              ))}
              {/* The ends anchored inward on a line chart, where the first and
                  last points sit on the plot's edges and a centred label would
                  hang half off the card. */}
              {ticks.map((index) => (
                <text
                  key={`x-${index}`}
                  x={x(index)}
                  y={height - 8}
                  textAnchor={
                    kind === "line" && labels.length > 1 && index === 0
                      ? "start"
                      : kind === "line" && labels.length > 1 && index === labels.length - 1
                        ? "end"
                        : "middle"
                  }
                >
                  {shortLabel(labels[index] ?? "")}
                </text>
              ))}
            </g>

            {hovered !== null && (
              <line
                x1={x(hovered)}
                x2={x(hovered)}
                y1={plot.y}
                y2={base}
                stroke="var(--color-outline)"
                strokeDasharray="3 3"
              />
            )}

            {drawn.map((s, slot) => {
              const colour = SLOTS[slot]!.stroke;

              if (kind === "bar") {
                return (
                  <g key={s.label} fill={colour}>
                    {s.values.map((value, index) => (
                      <rect
                        key={index}
                        x={x(index) - (barWidth * drawn.length) / 2 + barWidth * slot + slot}
                        y={y(value)}
                        width={barWidth}
                        height={Math.max(0, base - y(value))}
                        rx={2}
                      />
                    ))}
                  </g>
                );
              }

              return (
                <g key={s.label}>
                  {area && (
                    <path
                      d={`${path(s.values)} L${x(s.values.length - 1)},${base} L${x(0)},${base} Z`}
                      fill={colour}
                      opacity={0.12}
                    />
                  )}
                  <path
                    d={path(s.values)}
                    fill="none"
                    stroke={colour}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* The hovered point only: a marker on all thirty points is
                      a dotted line, not a trend. */}
                  {hovered !== null && (
                    <circle
                      cx={x(hovered)}
                      cy={y(s.values[hovered] ?? 0)}
                      r={4.5}
                      fill={colour}
                      stroke="var(--color-surface)"
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {hovered !== null && (
            <div
              role="status"
              className={cn(
                "pointer-events-none absolute top-2 z-10 min-w-36 rounded-lg bg-surface-high px-3 py-2 text-xs shadow-md",
                flip && "-translate-x-full",
              )}
              style={{ left: `calc(${(x(hovered) / Math.max(1, width)) * 100}% ${flip ? "- 12px" : "+ 12px"})` }}
            >
              <p className="mb-1 font-medium text-on-surface">{shortLabel(labels[hovered] ?? "")}</p>
              {drawn.map((s, slot) => (
                <p key={s.label} className="flex items-center gap-2 text-on-surface-variant">
                  <span aria-hidden="true" className={cn("size-2 rounded-sm", SLOTS[slot]!.swatch)} />
                  <span className="flex-1">{s.label}</span>
                  <span className="text-on-surface tabular-nums">{format(s.values[hovered] ?? 0)}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}

/**
 * The gap between gridlines, and how many of them.
 *
 * The step is chosen first and the ceiling derived from it — the other way
 * round gives an axis of 50 / 37.5 / 25 / 12.5, round at the top and nowhere
 * else. Snapped to 1, 2, 2.5 or 5 × 10ⁿ; and for whole-number data, never a
 * fraction, so a busiest day of one call does not read 0.25 / 0.5 / 0.75.
 */
function scale(series: ChartSeries[]): { step: number; lines: number } {
  const maximum = Math.max(1, ...series.flatMap((s) => s.values));
  const whole = series.every((s) => s.values.every((v) => Number.isInteger(v)));
  const lines = whole && maximum < GRIDLINES ? Math.max(1, Math.ceil(maximum)) : GRIDLINES;
  const rough = maximum / lines;
  const magnitude = 10 ** Math.floor(Math.log10(rough));

  for (const factor of [1, 2, 2.5, 5]) {
    const candidate = factor * magnitude;

    if (whole && !Number.isInteger(candidate)) continue;
    if (candidate >= rough) return { step: whole ? Math.max(1, candidate) : candidate, lines };
  }

  return { step: whole ? Math.max(1, 10 * magnitude) : 10 * magnitude, lines };
}

/** "2026-09-06" as "6 Sep". The year is the same on every tick, so it is dropped. */
function defaultLabel(label: string): string {
  const parsed = Date.parse(label);

  if (Number.isNaN(parsed)) return label;

  return new Date(parsed).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}
