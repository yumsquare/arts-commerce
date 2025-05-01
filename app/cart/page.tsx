"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "../components/icons";

export default function CartPage() {
  const {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  // Function to completely remove an item from the cart
  const removeItemCompletely = (productId: number) => {
    // Get the current state
    const currentItems = items.filter((item) => item.id !== productId);

    // Clear the cart first
    clearCart();

    // Re-add all items except the one we want to remove
    currentItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item);
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-600 transition-colors shadow-sm"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Your Shopping Cart
      </h1>

      {/* Card-based layout matching home page product style */}
      <div className="space-y-6 mb-8">
        {items.map((item) => {
          const discountedPrice =
            item.price * (1 - item.discountPercentage / 100);

          return (
            <div
              key={item.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
            >
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
        })}
      </div>

      <div className="flex justify-between mb-8">
        <Link
          href="/"
          className="text-indigo-500 hover:text-indigo-600 flex items-center gap-1 font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Continue Shopping
        </Link>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
        >
          <TrashIcon className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Items ({totalItems()})</span>
            <span className="font-medium">${totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-indigo-500">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1">Tax included</p>
          </div>
        </div>

        <button className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-sm">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
