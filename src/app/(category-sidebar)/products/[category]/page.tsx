import Image from "next/image";
import { Link } from "@/components/ui/link";
import { notFound } from "next/navigation";
import { getCategory, getCategoryProductCount } from "@/lib/queries";
import { db } from "@/db";
import { categories } from "@/db/schema";

export async function generateStaticParams() {
  return await db.select({ category: categories.slug }).from(categories);
}

export default async function Page(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const urlDecoded = decodeURIComponent(category);

  const cat = await getCategory(urlDecoded);
  if (!cat) return notFound();

  const countRes = await getCategoryProductCount(urlDecoded);
  const finalCount = countRes[0]?.count;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:pl-42">


      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold capitalize">
          {cat.name}
        </h1>

        {finalCount && (
          <p className="mt-2 text-sm text-gray-500">
            {finalCount} Products Available
          </p>
        )}
      </div>

      {/* Subcollections */}
      <div className="space-y-14">
        {cat.subcollections.map((subcollection) => (
          <div key={subcollection.name}>

            <h2 className="mb-6 text-xl font-semibold">
              {subcollection.name}
            </h2>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

              {subcollection.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.slug}
                  href={`/products/${category}/${subcategory.slug}`}
                  className="group rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition"
                >

                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={subcategory.image_url ?? "/placeholder.svg"}
                      alt={subcategory.name}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <p className="mt-3 text-center font-medium">
                    {subcategory.name}
                  </p>

                </Link>
              ))}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
