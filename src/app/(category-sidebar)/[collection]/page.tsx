import { Link } from "@/components/ui/link";
import { db } from "@/db";
import { collections } from "@/db/schema";
import { getCollectionDetails } from "@/lib/queries";

import Image from "next/image";

export async function generateStaticParams() {
  return await db.select({ collection: collections.slug }).from(collections);
}

export default async function Home(props: {
  params: Promise<{
    collection: string;
  }>;
}) {
  const collectionName = decodeURIComponent((await props.params).collection);

  const collectionsData = await getCollectionDetails(collectionName);
  let imageCount = 0;

  return (
   <div className="mx-auto max-w-7xl px-6 py-10 md:pl-24">

      {collectionsData.map((collection) => (
        <section key={collection.name} className="mb-16">
          {/* Title */}
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            {collection.name}
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {collection.categories.map((category) => (
              <Link
                prefetch
                key={category.name}
                href={`/products/${category.slug}`}
                className="group rounded-2xl bg-white p-6 shadow-md 
                hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Image */}
                <div className="flex justify-center">
                  <Image
                    loading={imageCount++ < 15 ? "eager" : "lazy"}
                    decoding="sync"
                    src={category.image_url ?? "/placeholder.svg"}
                    alt={category.name}
                    width={96}
                    height={96}
                    quality={70}
                    className="mb-4 h-24 w-24 rounded-full object-cover"
                  />
                </div>

                {/* Name */}
                <span className="block text-center text-base font-semibold text-gray-800">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
