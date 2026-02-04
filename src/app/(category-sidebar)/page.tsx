import { Link } from "@/components/ui/link";
import { getCollections, getProductCount } from "@/lib/queries";

import Image from "next/image";

export default async function Home() {
  const [collections, productCount] = await Promise.all([
    getCollections(),
    getProductCount(),
  ]);
  let imageCount = 0;

  return (
  <div className="mx-auto max-w-7xl px-6 py-8">

    {/* HERO */}
<div className="relative mb-14 overflow-hidden rounded-3xl 
bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 
p-14 text-white max-w-6xl">

  <div className="max-w-xl">
    <h1 className="text-5xl font-bold leading-tight">
      Discover Products <br /> You’ll Love
    </h1>

    <p className="mt-5 text-white/90 text-lg">
      Browse collections curated just for you.
    </p>

    <Link
      href="#"
      className="mt-8 inline-block rounded-xl bg-white px-8 py-3 
      font-semibold text-black hover:bg-gray-100 transition"
    >
      Shop Now
    </Link>
  </div>
</div>

    <div className="mb-6 flex items-center justify-between">
  <h1 className="text-2xl font-bold tracking-tight">
    Explore {productCount.at(0)?.count.toLocaleString()} Products
  </h1>
  <span className="text-sm text-gray-500">
    Handpicked collections
  </span>
</div>
<div className="mt-16" />

      {collections.map((collection) => (
        <div key={collection.name}>
         <h2 className="mb-4 text-xl font-semibold tracking-tight">
  {collection.name}
</h2>

<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 border-b py-6">

            {collection.categories.map((category) => (
              <Link
                prefetch={true}
                key={category.name}
              className="group w-[150px] rounded-xl border bg-white p-4 shadow-sm 
hover:shadow-md transition hover:-translate-y-1"

                href={`/products/${category.slug}`}
              >
                <Image
                  loading={imageCount++ < 15 ? "eager" : "lazy"}
                  decoding="sync"
                  src={category.image_url ?? "/placeholder.svg"}
                  alt={`A small picture of ${category.name}`}
                 className="mb-3 h-16 w-16 rounded-full bg-gray-100 p-2 
group-hover:scale-105 transition"

                  width={48}
                  height={48}
                  quality={65}
                />
           <span className="text-sm font-medium text-gray-800">
  {category.name}
</span>

              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
