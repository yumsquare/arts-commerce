import Image from "next/image";
import Link from "next/link";
import { Product, CartItem as CartItemType } from "../types";
import { TrashIcon, MinusIcon, PlusIcon } from "./icons";

interface CartItemProps {
  item: CartItemType;
  removeItemCompletely: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  addToCart: (product: Product) => void;
}

export default function CartItem({
  item,
  removeItemCompletely,
  removeFromCart,
  addToCart,
}: CartItemProps) {
  const discountedPrice = item.price * (1 - item.discountPercentage / 100);

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="flex p-4 gap-4">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-transparent">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-contain"
          />
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <Link
              href={`/products/${item.id}`}
              className="font-medium text-gray-800 hover:text-indigo-500 line-clamp-2 sm:text-lg"
            >
              {item.title}
            </Link>
            <button
              onClick={() => removeItemCompletely(item.id)}
              className="text-gray-400 hover:text-red-500 ml-2 p-1"
              aria-label="Remove item"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-3">{item.brand}</p>

          <div className="flex items-center justify-between flex-wrap gap-y-3">
            <div className="flex items-center bg-white rounded-lg shadow-sm">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-indigo-500 p-1 w-8 h-8 flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => addToCart(item)}
                className="text-gray-400 hover:text-indigo-500 p-1 w-8 h-8 flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right">
              <span className="font-medium text-indigo-500 text-lg">
                ${(discountedPrice * item.quantity).toFixed(2)}
              </span>
              {item.discountPercentage > 0 && (
                <p className="text-xs text-gray-400 line-through">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
