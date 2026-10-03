/**
 * Whether the page has been scrolled past `threshold`.
 *
 * For the top bar, which is translucent and sits over the content: at rest it
 * should be indistinguishable from the page behind it, and once anything has
 * scrolled underneath it needs an edge, or the blurred content reads as part of
 * the bar rather than as something passing beneath it.
 *
 * The listener is passive — this only ever reads `scrollY`, and saying so keeps
 * it off the critical path of the scroll itself. `setState` with an unchanged
 * boolean is a no-op in React, so the common case of scrolling within a region
 * that is already past the threshold costs one comparison a frame and no render.
 */
export declare function useScrolled(threshold?: number): boolean;
