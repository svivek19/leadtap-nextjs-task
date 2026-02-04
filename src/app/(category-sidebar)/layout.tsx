import { Link } from "@/components/ui/link";
import { getCollections } from "@/lib/queries";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCollections = await getCollections();

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside
        className="
          sticky top-16
          hidden h-[calc(100vh-64px)] w-64
          bg-white border-r
          px-6 py-8
          md:flex md:flex-col
        "
      >
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Categories
        </h2>

        <ul className="space-y-2">
          {allCollections.map((collection) => (
            <li key={collection.slug}>
              <Link
                prefetch
                href={`/${collection.slug}`}
                className="
                  block rounded-lg px-3 py-2
                  text-sm font-medium text-gray-700
                  hover:bg-gray-100 hover:text-black
                  transition
                "
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        {children}
      </main>

    </div>
  );
}
