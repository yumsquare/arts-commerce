import IconBase from "./IconBase";

interface PlusIconProps {
  className?: string;
}

export default function PlusIcon({ className = "w-4 h-4" }: PlusIconProps) {
  return (
    <IconBase className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </IconBase>
  );
}
