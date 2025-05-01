"use client";

import Link from "next/link";
import { useCartStore } from "../store";
import { TrashIcon, ArrowLeftIcon } from "../components/icons";
import CartItem from "../components/CartItem";

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
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeItemCompletely={removeItemCompletely}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        ))}
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
