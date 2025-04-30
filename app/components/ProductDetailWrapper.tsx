'use client';

import ProductDetail from './ProductDetail';
import { Product } from '../types';
import { useEffect } from 'react';

interface ProductDetailWrapperProps {
  product: Product;
}

export default function ProductDetailWrapper({ product }: ProductDetailWrapperProps) {
  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <ProductDetail product={product} />;
} 