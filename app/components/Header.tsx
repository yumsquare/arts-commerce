'use client';

import Link from 'next/link';
import { useCartStore } from '../store';
import { useState, useEffect } from 'react';

export default function Header() {
  const totalItems = useCartStore(state => state.totalItems);
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
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm h-16">
      <div className="container mx-auto h-full px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
          Arts Commerce
        </Link>
        
        <div className="relative mt-1">
          <Link 
            href="/cart" 
            className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            
            {mounted && itemCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-indigo-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
} 