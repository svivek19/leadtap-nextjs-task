import { notFound } from "next/navigation";
import { ProductLink } from "@/components/ui/product-card";
import type { Metadata } from "next";
import {
  getProductsForSubcategory,
  getSubcategory,
  getSubcategoryProductCount,
} from "@/lib/queries";
// import { db } from "@/db";

// export async function generateStaticParams() {
//   const results = await db.query.subcategories.findMany({
//     with: {
//       subcollection: {
//         with: {
//           category: true,
//         },
//       },
//     },
//   });
//   return results.map((s) => ({
//     category: s.subcollection.category.slug,
//     subcategory: s.slug,
//   }));
// }

export async function generateMetadata(props: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory: subcategoryParam } = await props.params;
  const urlDecodedCategory = decodeURIComponent(subcategoryParam);

  const [subcategory, rows] = await Promise.all([
    getSubcategory(urlDecodedCategory),
    getSubcategoryProductCount(urlDecodedCategory),
  ]);

  if (!subcategory) {
    return notFound();
  }

  const description = rows[0]?.count
    ? `Choose from over ${rows[0]?.count - 1} products in ${subcategory.name}. In stock and ready to ship.`
    : undefined;

  return {
    openGraph: { title: subcategory.name, description },
  };
}

export default async function Page(props: {
  params: Promise<{
    subcategory: string;
    category: string;
  }>;
}) {
  const { subcategory, category } = await props.params;
  // const urlDecodedCategory = decodeURIComponent(category);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  const [products, countRes] = await Promise.all([
    getProductsForSubcategory(urlDecodedSubcategory),
    getSubcategoryProductCount(urlDecodedSubcategory),
  ]);

  if (!products) {
    return notFound();
  }

  const finalCount = countRes[0]?.count;
  return (
<div className="mx-auto max-w-7xl px-6 py-10">
     {finalCount > 0 ? (
  <div className="mb-8">
    <h1 className="text-3xl font-bold capitalize">
      {urlDecodedSubcategory}
    </h1>
    <p className="mt-1 text-sm text-gray-500">
      {finalCount} {finalCount === 1 ? "Product" : "Products"}
    </p>
  </div>
) : (
  <p>No products for this subcategory</p>
)}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductLink
            key={product.name}
            loading="eager"
            category_slug={category}
            subcategory_slug={subcategory}
            product={product}
            imageUrl={product.image_url}
          />
        ))}
      </div>
    </div>
  );
}
