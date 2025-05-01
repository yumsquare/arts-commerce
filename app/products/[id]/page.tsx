import Link from "next/link";
import { getProduct } from "../../data";
import ProductDetail from "../../components/ProductDetail";
import { ArrowLeftIcon } from "../../components/icons";

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
        <Link
          href="/"
          className="text-indigo-500 hover:text-indigo-600 flex items-center gap-1 font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      {/* Use the ProductDetail component directly */}
      <ProductDetail product={product} />
    </div>
  );
}
