import Link from "next/link";
import { Product } from "../../types";
import ProductDetail from "../../components/ProductDetail";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await the entire params object
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-indigo-500 hover:text-indigo-600 flex items-center gap-1 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Products
        </Link>
      </div>
      
      {/* Use the ProductDetail component directly */}
      <ProductDetail product={product} />
    </div>
  );
} 