"use client";

import Link from "next/link";
import { useCartStore } from "../store";
import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "./icons";

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const [mounted, setMounted] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setItemCount(totalItems());
  }, [totalItems]);

  useEffect(() => {
    if (!mounted) return;

    const updateCount = () => {
      setItemCount(totalItems());
    };

    updateCount();
    const unsubscribe = useCartStore.subscribe(updateCount);

    return () => {
      unsubscribe();
    };
  }, [mounted, totalItems]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm h-16">
      <div className="container mx-auto h-full px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
        >
          Arts Commerce
        </Link>

        <div className="relative mt-1">
          <Link
            href="/cart"
            className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-600 hover:text-indigo-500" />

            {mounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
