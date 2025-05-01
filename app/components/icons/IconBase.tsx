import { ReactNode } from "react";

interface IconBaseProps {
  className?: string;
  strokeWidth?: number;
  children: ReactNode;
}

export default function IconBase({
  className = "w-6 h-6",
  strokeWidth = 1.5,
  children,
}: IconBaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={className}
    >
      {children}
    </svg>
  );
}
