"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col h-[400px]">
      {/* Card container with relative positioning for tag overlay */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100 h-[300px] mb-4">
        {/* Top section with tags on left and rating on right */}
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-10">
          {/* Tags in top left if they exist */}
          <div>
            {product.tags &&
              product.tags.length > 0 &&
              product.tags.slice(0, 1).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wide px-2 py-1 inline-block mr-1 mb-1"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Rating in top right */}
          <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>

        {/* Product image fills the entire card */}
        <Link
          href={`/products/${product.id}`}
          className="block w-full h-full"
          scroll={true}
        >
          <div className="relative w-full h-full group">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Product details below the box - left aligned */}
      <div className="text-left">
        <Link href={`/products/${product.id}`} className="block" scroll={true}>
          <h2 className="font-medium text-gray-800 mb-2 hover:text-indigo-500 transition-colors">
            {product.title}
          </h2>
          <div className="flex items-center">
            <span className="font-semibold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
