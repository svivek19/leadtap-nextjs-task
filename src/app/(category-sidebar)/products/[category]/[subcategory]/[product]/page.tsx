import { ProductLink } from "@/components/ui/product-card";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { Metadata } from "next";

import { getProductDetails, getProductsForSubcategory } from "@/lib/queries";
// import { db } from "@/db";

// export async function generateStaticParams() {
//   const results = await db.query.products.findMany({
//     with: {
//       subcategory: {
//         with: {
//           subcollection: {
//             with: {
//               category: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   return results.map((s) => ({
//     category: s.subcategory.subcollection.category.slug,
//     subcategory: s.subcategory.slug,
//     product: s.slug,
//   }));
// }

export async function generateMetadata(props: {
  params: Promise<{ product: string; category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { product: productParam } = await props.params;
  const urlDecodedProduct = decodeURIComponent(productParam);

  const product = await getProductDetails(urlDecodedProduct);

  if (!product) {
    return notFound();
  }

  return {
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function Page(props: {
  params: Promise<{
    product: string;
    subcategory: string;
    category: string;
  }>;
}) {
  const { product, subcategory, category } = await props.params;
  const urlDecodedProduct = decodeURIComponent(product);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  const [productData, relatedUnshifted] = await Promise.all([
    getProductDetails(urlDecodedProduct),
    getProductsForSubcategory(urlDecodedSubcategory),
  ]);

  if (!productData) {
    return notFound();
  }
  const currentProductIndex = relatedUnshifted.findIndex(
    (p) => p.slug === productData.slug,
  );
  const related = [
    ...relatedUnshifted.slice(currentProductIndex + 1),
    ...relatedUnshifted.slice(0, currentProductIndex),
  ];

return (
  <div className="mx-auto max-w-7xl px-6 py-10 md:pl-24">

    {/* Product Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* Image */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        <Image
          loading="eager"
          decoding="sync"
          src={productData.image_url ?? "/placeholder.svg"}
          alt={productData.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {productData.name}
        </h1>

        <p className="mt-4 text-gray-600">
          {productData.description}
        </p>

        <p className="mt-6 text-2xl font-semibold">
          ${parseFloat(productData.price).toFixed(2)}
        </p>

        <div className="mt-6">
          <AddToCartForm productSlug={productData.slug} />
        </div>
      </div>

    </div>

    {/* Related Products */}
    {related.length > 0 && (
      <div className="mt-20">
        <h2 className="mb-6 text-2xl font-bold">
          Related Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {related.map((product) => (
            <ProductLink
              key={product.name}
              loading="lazy"
              category_slug={category}
              subcategory_slug={subcategory}
              product={product}
              imageUrl={product.image_url}
            />
          ))}
        </div>
      </div>
    )}

  </div>
);

}
