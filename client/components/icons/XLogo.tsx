import type { SVGProps } from "react";

export function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M3 3h3.9l5.2 6.9 5.3-6.9H21l-7.5 9.8L21 21h-3.9l-5.6-7.2L6 21H3l7.6-10L3 3z" />
    </svg>
  );
}
