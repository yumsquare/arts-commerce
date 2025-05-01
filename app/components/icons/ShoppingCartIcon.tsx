import IconBase from "./IconBase";

interface ShoppingCartIconProps {
  className?: string;
}

export default function ShoppingCartIcon({
  className = "w-6 h-6 text-gray-600 hover:text-indigo-500",
}: ShoppingCartIconProps) {
  return (
    <IconBase className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l"
      />
    </IconBase>
  );
}
