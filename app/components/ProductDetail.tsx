'use client';

import Image from "next/image";
import { Product } from "../types";
import AddToCartButton from "./AddToCartButton";
import { useState, useEffect } from "react";
import Head from "next/head";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Safely handle potential null or undefined product.images
  const productImages = product?.images || [];
  
  // Create array of unique images from product.images (if available)
  const allImages = [...new Set(productImages)];
  
  // Use the first image as default, or thumbnail if no images
  const defaultImage = allImages.length > 0 ? allImages[0] : (product?.thumbnail || '');
  
  // State to track the currently displayed image
  const [currentImage, setCurrentImage] = useState(defaultImage);
  
  // State to track preloaded images
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  
  // Calculate the discounted price
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  // Only show thumbnails if we have at least 2 images
  const showThumbnails = allImages.length >= 2;

  // Preload all product images
  useEffect(() => {
    // Function to preload an image
    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setPreloadedImages(prev => [...prev, src]);
          resolve(src);
        };
        img.onerror = reject;
      });
    };

    // Preload all images except the currently displayed one (which is already loaded)
    const imagesToPreload = allImages.filter(img => img !== currentImage);
    
    // Preload each image
    Promise.all(imagesToPreload.map(preloadImage))
      .catch(error => console.error('Error preloading images:', error));
  }, [allImages, currentImage]);

  // Handler for thumbnail click with preloaded image check
  const handleThumbnailClick = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <>
      {/* Preload link tags for all images */}
      {allImages.map((image, index) => (
        <link 
          key={`preload-${index}`}
          rel="preload" 
          href={image}
          as="image"
        />
      ))}
      
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
          {/* Top section with tags on left and rating on right */}
          <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-10">
            {/* Tags in top left if they exist */}
            <div>
              {product.tags && product.tags.length > 0 && (
                product.tags.slice(0, 1).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wide px-2 py-1 inline-block mr-1 mb-1">
                    {tag}
                  </span>
                ))
              )}
            </div>
            
            {/* Rating in top right */}
            <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
          
          {/* Main product image */}
          <div className="aspect-square relative">
            <Image
              src={currentImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
          
          {/* Invisible preload container for all images */}
          <div className="sr-only">
            {allImages.map((image, i) => (
              <Image 
                key={`preload-img-${i}`}
                src={image}
                alt={`Preload ${i}`}
                width={1}
                height={1}
                priority={i < 4}
                style={{ position: 'absolute', opacity: 0 }}
              />
            ))}
          </div>
          
          {/* Thumbnail container - always present for consistent height */}
          <div className="mt-4 p-3 min-h-[100px]">
            {showThumbnails ? (
              <div className="grid grid-cols-4 gap-3 h-full">
                {allImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(image)}
                    className={`aspect-square relative rounded-lg overflow-hidden border ${
                      currentImage === image 
                        ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' 
                        : 'border-gray-100 hover:border-indigo-300'
                    } transition-all`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 12vw"
                      className="object-cover"
                      priority={index < 4} // Make sure the first 4 thumbnails are prioritized
                    />
                  </button>
                ))}
              </div>
            ) : (
              // Empty placeholder to maintain consistent height
              <div className="h-full" aria-hidden="true"></div>
            )}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.title}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-indigo-600">
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
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <AddToCartButton product={product} />
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium mb-2">Product Details:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>In Stock: {product.stock} units</li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
} 