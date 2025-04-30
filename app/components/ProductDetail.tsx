"use client";

import Image from "next/image";
import { Product } from "../types";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

// Helper function to convert string to title case (first letter of each word capitalized)
function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Safely handle potential null or undefined product.images
  const productImages = product?.images || [];

  // Create array of unique images from product.images (if available)
  const allImages = [...new Set(productImages)];

  // Use the first image as default, or thumbnail if no images
  const defaultImage =
    allImages.length > 0 ? allImages[0] : product?.thumbnail || "";

  // State to track the currently displayed image
  const [currentImage, setCurrentImage] = useState(defaultImage);

  // Calculate the discounted price
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  // Only show thumbnails if we have at least 2 images
  const showThumbnails = allImages.length >= 2;

  // Check if we have any product details to show
  const hasProductDetails =
    (product.warrantyInformation &&
      product.warrantyInformation.trim() !== "") ||
    (product.shippingInformation &&
      product.shippingInformation.trim() !== "") ||
    (product.category && product.category.trim() !== "") ||
    (product.brand && product.brand.trim() !== "") ||
    (product.availabilityStatus && product.availabilityStatus.trim() !== "");

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2 relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
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

        {/* Thumbnail container - always present for consistent height */}
        <div className="mt-4 p-3 min-h-[100px]">
          {showThumbnails ? (
            <div className="grid grid-cols-4 gap-3 h-full">
              {allImages.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(image)}
                  className={`aspect-square relative rounded-lg overflow-hidden border ${
                    currentImage === image
                      ? "border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50"
                      : "border-gray-100 hover:border-indigo-300"
                  } transition-all`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    className="object-cover"
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
        <h1 className="text-3xl font-bold mb-3 text-gray-800">
          {product.title}
        </h1>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
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

        {/* Modernized Product Details section */}
        {hasProductDetails && (
          <div className="rounded-lg bg-gray-50 p-5 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Product Details
            </h3>

            <div className="space-y-3">
              {/* Show availability status if available */}
              {product.availabilityStatus &&
                product.availabilityStatus.trim() !== "" && (
                  <div className="flex items-center text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <span className="font-medium">Availability:</span>
                    <span className="ml-2">{product.availabilityStatus}</span>
                  </div>
                )}

              {/* Category with icon */}
              {product.category && product.category.trim() !== "" && (
                <div className="flex items-center text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6z"
                    />
                  </svg>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2">{toTitleCase(product.category)}</span>
                </div>
              )}

              {/* Brand with icon */}
              {product.brand && product.brand.trim() !== "" && (
                <div className="flex items-center text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  <span className="font-medium">Brand:</span>
                  <span className="ml-2">{toTitleCase(product.brand)}</span>
                </div>
              )}

              {/* Warranty information with icon - moved to bottom */}
              {product.warrantyInformation &&
                product.warrantyInformation.trim() !== "" && (
                  <div className="flex items-start text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                    <div>
                      <span className="font-medium">Warranty:</span>
                      <span className="ml-2">
                        {product.warrantyInformation}
                      </span>
                    </div>
                  </div>
                )}

              {/* Shipping information with icon - moved to bottom */}
              {product.shippingInformation &&
                product.shippingInformation.trim() !== "" && (
                  <div className="flex items-start text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    <div>
                      <span className="font-medium">Shipping:</span>
                      <span className="ml-2">
                        {product.shippingInformation}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
