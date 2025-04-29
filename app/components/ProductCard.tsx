import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-gray-200 block h-[400px] flex flex-col"
    >
      {/* Fixed height container for image */}
      <div className="relative h-64 w-full bg-gray-100 flex-shrink-0">
        {/* Background placeholder always visible */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6.969 6H6.5l3.751-3.773 1.874 1.874 3.751-3.752L19.5 14v2.969z"/>
          </svg>
        </div>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-indigo-500 font-bold">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 text-yellow-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 