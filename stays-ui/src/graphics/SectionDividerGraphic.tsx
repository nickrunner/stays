import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={1125} height={37.5} {...props}>
    <path
      strokeLinecap="round"
      transform="matrix(5.92105 0 0 5.52632 12.952 18.491)"
      fill="none"
      d="M4 0h177.625"
      stroke="#6C5EE6"
    />
    <path
      transform="matrix(5.92105 0 0 5.52632 12.952 18.491)"
      fill="none"
      strokeLinejoin="round"
      d="M.5-1.5h3v3h-3Zm0 0"
      stroke="#6C5EE6"
    />
    <path
      transform="matrix(5.92105 0 0 5.52632 1112.048 18.491)"
      fill="none"
      strokeLinejoin="round"
      d="M-3.5-1.5h3v3h-3Zm0 0"
      stroke="#6C5EE6"
    />
    <path
      fill="#6C5EE6"
      d="M569.586 10.871H555.69a.822.822 0 0 0-.824.824V25.59c0 .457.367.824.824.824h13.895a.822.822 0 0 0 .824-.824V11.695a.822.822 0 0 0-.824-.824"
    />
  </svg>
);

export default SvgComponent;
