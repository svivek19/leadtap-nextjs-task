import { cache } from "react";
import { detailedCart } from "@/lib/cart";
import { Link } from "@/components/ui/link";
import Image from "next/image";
import { removeFromCart } from "@/lib/actions";
import { X } from "lucide-react";

const getCartItems = cache(() => detailedCart());
type CartItem = Awaited<ReturnType<typeof getCartItems>>[number];

export async function CartItems() {
  const cart = await getCartItems();

  return (
    <div className="space-y-6">

      {/* Delivery Info */}
      {cart.length > 0 && (
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="font-medium">Delivers in 2–4 weeks</p>
          <p className="text-sm text-gray-500">Need this sooner?</p>
        </div>
      )}

      {/* Items */}
      {cart.length > 0 ? (
        cart.map((item) => (
          <ModernCartItem key={item.slug} product={item} />
        ))
      ) : (
        <p className="text-gray-500">Your cart is empty</p>
      )}
    </div>
  );
}

function ModernCartItem({ product }: { product: CartItem }) {
  const cost = (Number(product.price) * product.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row gap-6 rounded-2xl bg-white p-6 shadow-sm">

      {/* Image */}
      <Link
        href={`/products/${product.subcategory.subcollection.category_slug}/${product.subcategory.slug}/${product.slug}`}
        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100"
      >
        <Image
          src={product.image_url ?? "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold">
            {product.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

          <span className="text-sm text-gray-600">
            Qty: {product.quantity}
          </span>

          <span className="text-sm text-gray-600">
            ${Number(product.price).toFixed(2)} each
          </span>

          <span className="text-lg font-semibold">
            ${cost}
          </span>

          <form action={removeFromCart}>
            <input type="hidden" name="productSlug" value={product.slug} />
            <button
              type="submit"
              className="rounded-full p-2 hover:bg-gray-100 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export async function TotalCost() {
  const cart = await getCartItems();

  const totalCost = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.price),
    0
  );

  return (
    <span className="text-xl font-semibold">
      ${totalCost.toFixed(2)}
    </span>
  );
}
