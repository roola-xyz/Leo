import { useState } from "react";
import { cn } from "../../cn";

/**
 * A person's, a channel's or a profile's mark: their picture if there is one,
 * an initial if not.
 *
 * The initial is not a placeholder for a missing image — it is the ordinary
 * case, and it is a colour picked from the name rather than one grey circle
 * repeated. Stable, so the same channel or person is the same colour on every
 * page and in every session, which is what makes a wall of them scannable at
 * all. A random colour would be neither.
 *
 * The palette is chosen for contrast against white text in both themes, so an
 * avatar does not need to know which one it is in.
 *
 * A picture that fails to load falls back to the initial rather than leaving a
 * broken image — but only that picture. What failed is remembered by its
 * address, not as a flag, so a different one is tried: these are long-lived
 * lists whose rows are reused, and a flag would mean one blocked or slow
 * picture turned every subject that later landed in that row into an
 * initial, with nothing to do about it but reload the page.
 */
const palette = [
  "bg-[#c2410c]",
  "bg-[#b91c1c]",
  "bg-[#be185d]",
  "bg-[#7e22ce]",
  "bg-[#4338ca]",
  "bg-[#1d4ed8]",
  "bg-[#0369a1]",
  "bg-[#0f766e]",
  "bg-[#15803d]",
  "bg-[#4d7c0f]",
  "bg-[#a16207]",
  "bg-[#9a3412]",
];

const sizes = {
  xs: "size-6 text-[0.625rem]",
  sm: "size-9 text-sm",
  md: "size-10 text-base",
  // A face in a row of faces above a feed.
  ml: "size-14 text-xl",
  lg: "size-20 text-2xl",
  xl: "size-32 text-5xl",
} as const;

/**
 * A small, stable hash. Not a security primitive and never used as one — it only
 * has to spread names across twelve buckets and give the same answer twice.
 */
function bucket(seed: string): number {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) | 0;
  }

  return Math.abs(hash) % palette.length;
}

export function Avatar({
  name,
  handle,
  src,
  size = "sm",
  className,
}: {
  name: string;
  /**
   * Seeds the colour instead of the name where there is one. A handle is
   * unique and a name is not, so two people called Sam do not share a tint —
   * and somebody who changes their display name keeps theirs.
   */
  handle?: string | null;
  /** Their picture, if they have one. */
  src?: string | null;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const [broken, setBroken] = useState<string | null>(null);

  if (src && broken !== src) {
    return (
      <img
        alt=""
        className={cn("shrink-0 rounded-full object-cover", sizes[size], className)}
        // `key` so a change of address is a new element rather than the same
        // one re-pointed: a browser that has already given up on the old
        // address does not always try the new one.
        key={src}
        loading="lazy"
        onError={() => setBroken(src)}
        src={src}
      />
    );
  }

  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      // The name is always beside this in the layouts that use it, so the mark
      // itself is decorative and announcing the initial would only repeat it.
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium text-white",
        palette[bucket(handle || name)],
        sizes[size],
        className,
      )}
    >
      {initial}
    </span>
  );
}
