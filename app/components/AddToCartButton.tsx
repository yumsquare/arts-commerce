'use client';

import { useState } from 'react';
import { useCartStore } from '../store';
import { Product } from '../types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset the button after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
        isAdded 
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }`}
      disabled={isAdded}
    >
      {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
    </button>
  );
} 