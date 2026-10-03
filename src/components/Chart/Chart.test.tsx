import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Chart } from "./index";

/**
 * A ResizeObserver the test drives: happy-dom lays nothing out, so the width a
 * chart is measured at is whatever the test says it is.
 */
class Observer {
  static instances: Observer[] = [];
  disconnected = false;

  constructor(private readonly callback: ResizeObserverCallback) {
    Observer.instances.push(this);
  }

  observe() {}

  disconnect() {
    this.disconnected = true;
  }

  resize(width: number | null) {
    const entries = width === null ? [] : [{ contentRect: { width } }];

    act(() => this.callback(entries as unknown as ResizeObserverEntry[], this as unknown as ResizeObserver));
  }
}

const latest = () => Observer.instances[Observer.instances.length - 1]!;

const labels = ["2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05"];

beforeEach(() => {
  Observer.instances = [];
  vi.stubGlobal("ResizeObserver", Observer);
});

afterEach(() => vi.unstubAllGlobals());

/** Points the pointer at an x position inside the plot. */
function hover(svg: Element, clientX: number) {
  svg.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 200 }) as DOMRect;
  fireEvent.pointerMove(svg, { clientX });
}

describe("Chart", () => {
  it("draws a line per series, labelled by the series, with no legend for one", () => {
    const { container } = render(<Chart labels={labels} series={[{ label: "Served", values: [1, 2, 3, 2, 1] }]} />);

    const plot = screen.getByRole("img", { name: "Served" });

    expect(plot.querySelectorAll("path")).toHaveLength(1);
    expect(container.querySelector("ul")).toBeNull();
    // The ends of a line chart are anchored inwards so they do not hang off the card.
    const axis = [...plot.querySelectorAll("text")].filter((text) => text.getAttribute("y") === "192");
    expect(axis[0]!.getAttribute("text-anchor")).toBe("start");
    expect(axis[axis.length - 1]!.getAttribute("text-anchor")).toBe("end");
    expect(axis[1]!.getAttribute("text-anchor")).toBe("middle");
  });

  it("measures itself and draws to its own width", () => {
    render(<Chart labels={labels} series={[{ label: "Served", values: [1, 2, 3, 2, 1] }]} height={160} />);

    latest().resize(400);
    expect(screen.getByRole("img").getAttribute("viewBox")).toBe("0 0 400 160");

    // A chart in a collapsed section measures nothing and keeps what it had.
    latest().resize(0);
    latest().resize(null);
    expect(screen.getByRole("img").getAttribute("viewBox")).toBe("0 0 400 160");
  });

  it("gives two or more series a legend and colours them by slot, dropping a fifth", () => {
    render(
      <Chart
        labels={labels}
        series={[
          { label: "Served", values: [1, 2, 3, 4, 5] },
          { label: "Refused", values: [0, 1, 0, 1, 0] },
          { label: "Failed", values: [0, 0, 1, 0, 0] },
          { label: "Other", values: [1, 1, 1, 1, 1] },
          { label: "Fifth", values: [9, 9, 9, 9, 9] },
        ]}
      />,
    );

    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Served", "Refused", "Failed", "Other"]);
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Served, Refused, Failed, Other");
    expect([...screen.getByRole("img").querySelectorAll("path")].map((path) => path.getAttribute("stroke"))).toEqual([
      "var(--color-primary)",
      "var(--color-warning)",
      "var(--color-error)",
      "var(--color-on-surface-variant)",
    ]);
  });

  it("fills under a line only when asked", () => {
    render(<Chart labels={labels} area series={[{ label: "Served", values: [1, 2, 3, 2, 1] }]} />);

    const [fill, line] = screen.getByRole("img").querySelectorAll("path");

    expect(fill!.getAttribute("opacity")).toBe("0.12");
    expect(fill!.getAttribute("d")).toMatch(/Z$/);
    expect(line!.getAttribute("fill")).toBe("none");
  });

  it("draws bars side by side in the middle of each band", () => {
    render(
      <Chart
        kind="bar"
        labels={["a", "b"]}
        series={[
          { label: "Served", values: [4, 2] },
          { label: "Refused", values: [1, 0] },
        ]}
      />,
    );

    const bars = screen.getByRole("img").querySelectorAll("rect");

    expect(bars).toHaveLength(4);
    // 720 wide: a 656px plot from x=48, two 328px bands, bars 162px wide.
    expect(bars[0]!.getAttribute("x")).toBe(String(48 + 164 - 162));
    expect(bars[0]!.getAttribute("width")).toBe("162");
    expect(bars[3]!.getAttribute("height")).toBe("0");
    expect(
      [...screen.getByRole("img").querySelectorAll("text")].every(
        (text) => text.getAttribute("y") !== "192" || text.getAttribute("text-anchor") === "middle",
      ),
    ).toBe(true);
  });

  it("puts a single point in the middle", () => {
    const { container } = render(<Chart labels={["only"]} series={[{ label: "Served", values: [3] }]} />);

    expect(container.querySelector("svg path")!.getAttribute("d")).toBe("M376,12");
  });

  it("says so instead of drawing when every value is zero", () => {
    render(<Chart labels={labels} series={[{ label: "Served", values: [0, 0, 0, 0, 0] }]} empty="Quiet week." />);

    expect(screen.getByText("Quiet week.")).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("says the default when there is nothing, including no series at all", () => {
    render(<Chart labels={[]} series={[]} />);

    expect(screen.getByText("Nothing in this period.")).toBeTruthy();
  });

  it("shows the same numbers as a table, and back", () => {
    render(
      <Chart
        labels={["first", "second"]}
        series={[
          { label: "Served", values: [1200, 3] },
          { label: "Refused", values: [5] },
        ]}
        text={{ showTable: "Table", hideTable: "Plot", date: "Day" }}
        format={(value) => `#${value}`}
        formatLabel={(label) => label.toUpperCase()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Table" }));

    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getAllByRole("columnheader").map((cell) => cell.textContent)).toEqual(["Day", "Served", "Refused"]);
    expect(screen.getAllByRole("row")[2]!.textContent).toBe("SECOND#3#0");

    fireEvent.click(screen.getByRole("button", { name: "Plot" }));

    expect(screen.getByRole("img")).toBeTruthy();
  });

  it("shortens ISO dates on the axis and prints anything else as it is", () => {
    render(
      <Chart
        labels={["2026-09-06", "2026-09-07T10:00:00", "week 2", "2026", "2026-13-45"]}
        series={[{ label: "Served", values: [1, 2, 3, 4, 5] }]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Show as table" }));

    const day = (value: string, timeZone?: string) =>
      new Date(Date.parse(value)).toLocaleDateString(undefined, { day: "numeric", month: "short", timeZone });

    expect(screen.getAllByRole("row").slice(1).map((row) => row.firstElementChild!.textContent)).toEqual([
      day("2026-09-06", "UTC"),
      day("2026-09-07T10:00:00"),
      "week 2",
      "2026",
      "2026-13-45",
    ]);
  });

  /**
   * A bare ISO date is midnight UTC, and it used to be shown in the browser's
   * own zone — so anywhere west of Greenwich every tick read the day before.
   */
  it("shows a bare date as that day in every time zone", () => {
    vi.spyOn(Date.prototype, "toLocaleDateString");

    render(<Chart labels={["2026-09-06", "2026-09-07"]} series={[{ label: "Served", values: [1, 2] }]} />);

    expect(Date.prototype.toLocaleDateString).toHaveBeenCalledWith(undefined, { day: "numeric", month: "short", timeZone: "UTC" });
    vi.restoreAllMocks();
  });

  it("shows the nearest point under the pointer, flipped near the right edge, and hides it on leaving", () => {
    render(
      <Chart
        labels={labels}
        series={[
          { label: "Served", values: [10, 20, 30, 40] },
          { label: "Refused", values: [1, 2, 3, 4, 5] },
        ]}
      />,
    );

    latest().resize(400);
    const svg = screen.getByRole("img");

    // 400 wide: points at 48, 132, 216, 300 and 384.
    hover(svg, 140);

    const tooltip = screen.getByRole("status");
    expect(tooltip.textContent).toContain("Served20");
    expect(tooltip.textContent).toContain("Refused2");
    expect(tooltip.className).not.toContain("-translate-x-full");
    expect(svg.querySelectorAll("circle")).toHaveLength(2);
    expect(svg.querySelector("line[stroke-dasharray]")!.getAttribute("x1")).toBe("132");

    hover(svg, 390);

    expect(screen.getByRole("status").className).toContain("-translate-x-full");
    // A series shorter than the labels reads as zero where it has no value.
    expect(screen.getByRole("status").textContent).toContain("Served0");

    fireEvent.pointerLeave(svg);

    expect(screen.queryByRole("status")).toBeNull();
  });

  it("chooses round gridlines: whole steps for counts, fractions only for fractional data", () => {
    const ticks = (values: number[]) => {
      const { unmount } = render(<Chart labels={values.map(String)} series={[{ label: "S", values }]} format={String} />);
      const shown = [...screen.getByRole("img").querySelectorAll("text[text-anchor='end'][x='40']")].map((text) => text.textContent);
      unmount();
      return shown;
    };

    expect(ticks([0, 1])).toEqual(["0", "1"]);
    expect(ticks([1, 3])).toEqual(["0", "1", "2", "3"]);
    expect(ticks([5, 10])).toEqual(["0", "5", "10", "15", "20"]);
    expect(ticks([3, 9])).toEqual(["0", "5", "10", "15", "20"]);
    expect(ticks([1, 24])).toEqual(["0", "10", "20", "30", "40"]);
    expect(ticks([0.5, 1.5])).toEqual(["0", "0.5", "1", "1.5", "2"]);
    expect(ticks([0.5, 2.3])).toEqual(["0", "1", "2", "3", "4"]);
    expect(ticks([0.5, 0.9])).toEqual(["0", "0.25", "0.5", "0.75", "1"]);
  });

  it("stops measuring once it is gone", () => {
    const { unmount } = render(<Chart labels={labels} series={[{ label: "Served", values: [1, 2, 3, 2, 1] }]} />);

    unmount();

    expect(latest().disconnected).toBe(true);
  });
});
