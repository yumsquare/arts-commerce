import IconBase from "./IconBase";

interface MinusIconProps {
  className?: string;
}

export default function MinusIcon({ className = "w-4 h-4" }: MinusIconProps) {
  return (
    <IconBase className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </IconBase>
  );
}
