import IconBase from "./IconBase";

interface ArrowLeftIconProps {
  className?: string;
}

export default function ArrowLeftIcon({
  className = "w-4 h-4",
}: ArrowLeftIconProps) {
  return (
    <IconBase className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </IconBase>
  );
}
