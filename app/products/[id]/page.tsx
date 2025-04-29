import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types";
import AddToCartButton from "../../components/AddToCartButton";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  // Calculate the discounted price
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

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
      
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
          <div className="aspect-square relative">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-3 p-3">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square relative rounded-lg overflow-hidden border border-gray-100">
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 12vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 text-yellow-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-700 dark:text-gray-300">Brand: {product.brand}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-700 dark:text-gray-300">Category: {product.category}</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </>
            )}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <AddToCartButton product={product} />
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-medium mb-2">Product Details:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>In Stock: {product.stock} units</li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>SKU: {product.sku}</li>
              {product.tags && product.tags.length > 0 && (
                <li>Tags: {product.tags.join(', ')}</li>
              )}
              <li>Warranty: {product.warrantyInformation}</li>
              <li>Shipping: {product.shippingInformation}</li>
              <li>Return Policy: {product.returnPolicy}</li>
              <li>Status: <span className={product.availabilityStatus === 'Low Stock' ? 'text-orange-500 font-semibold' : ''}>
                {product.availabilityStatus}
              </span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 