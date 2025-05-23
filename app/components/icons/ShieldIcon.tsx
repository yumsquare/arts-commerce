import IconBase from "./IconBase";

interface ShieldIconProps {
  className?: string;
}

export default function ShieldIcon({
  className = "w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0",
}: ShieldIconProps) {
  return (
    <IconBase className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </IconBase>
  );
}
