import type { ReactNode } from "react";
import { cn } from "../../cn";

/**
 * An M3 filled card: depth is signalled with surface tone rather than a shadow,
 * which is why there is no border and no elevation class here.
 */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-card bg-surface", className)}>{children}</div>
  );
}

export function CardHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="px-6 pt-6 pb-2">
      <h2 className="text-xl leading-7 font-normal text-on-surface">{title}</h2>
      {description && (
        <p className="mt-1 text-sm leading-5 text-on-surface-variant">{description}</p>
      )}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-6 pt-2 pb-6", className)}>{children}</div>;
}
