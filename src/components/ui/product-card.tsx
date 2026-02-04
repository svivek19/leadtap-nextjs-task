"use client";
import { Link } from "@/components/ui/link";
import NextImage from "next/image";
import { getImageProps } from "next/image";
import { Product } from "@/db/schema";
import { useEffect } from "react";

export function getProductLinkImageProps(
  imageUrl: string,
  productName: string,
) {
  return getImageProps({
    width: 48,
    height: 48,
    quality: 65,
    src: imageUrl,
    alt: `A small picture of ${productName}`,
  });
}

export function ProductLink(props: {
  imageUrl?: string | null;
  category_slug: string;
  subcategory_slug: string;
  loading: "eager" | "lazy";
  product: Product;
}) {
  const { category_slug, subcategory_slug, product, imageUrl } = props;

  return (
    <Link
      prefetch
      href={`/products/${category_slug}/${subcategory_slug}/${product.slug}`}
      className="group rounded-2xl bg-white shadow-sm hover:shadow-xl 
      transition-all hover:-translate-y-1 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <NextImage
          loading={props.loading}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 20vw"
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-2">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <button
          className="mt-4 w-full rounded-lg bg-black py-2 
          text-sm font-medium text-white 
          hover:bg-gray-800 transition"
        >
          View Product
        </button>
      </div>
    </Link>
  );
}

