"use client";

import Image from "next/image";
import { Product } from "../types";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";
import StarIcon from "./icons/StarIcon";
import BoxIcon from "./icons/BoxIcon";
import TagIcon from "./icons/TagIcon";
import BadgeIcon from "./icons/BadgeIcon";
import ShieldIcon from "./icons/ShieldIcon";
import TruckIcon from "./icons/TruckIcon";

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
            <StarIcon className="w-4 h-4 text-yellow-400" />
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
                    <BoxIcon className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                    <span className="font-medium">Availability:</span>
                    <span className="ml-2">{product.availabilityStatus}</span>
                  </div>
                )}

              {/* Category with icon */}
              {product.category && product.category.trim() !== "" && (
                <div className="flex items-center text-gray-700">
                  <TagIcon className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                  <span className="font-medium">Category:</span>
                  <span className="ml-2">{toTitleCase(product.category)}</span>
                </div>
              )}

              {/* Brand with icon */}
              {product.brand && product.brand.trim() !== "" && (
                <div className="flex items-center text-gray-700">
                  <BadgeIcon className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" />
                  <span className="font-medium">Brand:</span>
                  <span className="ml-2">{toTitleCase(product.brand)}</span>
                </div>
              )}

              {/* Warranty information with icon - moved to bottom */}
              {product.warrantyInformation &&
                product.warrantyInformation.trim() !== "" && (
                  <div className="flex items-start text-gray-700">
                    <ShieldIcon className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
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
                    <TruckIcon className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
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
