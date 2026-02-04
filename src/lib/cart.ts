import { db } from "@/db";
import { cookies } from "next/headers";
import { z } from "zod";

const cartSchema = z.array(
  z.object({
    productSlug: z.string(),
    quantity: z.number(),
  }),
);

export type CartItem = z.infer<typeof cartSchema>[number];

export async function updateCart(newItems: CartItem[]) {
  (await cookies()).set("cart", JSON.stringify(newItems), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getCart() {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart");

  if (!cart || !cart.value) {
    return [];
  }

  try {
    const parsed = JSON.parse(cart.value);
    return cartSchema.parse(parsed);
  } catch (error) {
    console.error("Invalid cart cookie. Resetting cart.");

    // delete broken cookie
    cookieStore.delete("cart");

    return [];
  }
}

export async function detailedCart() {
  const cart = await getCart();

  const products = await db.query.products.findMany({
    where: (products, { inArray }) =>
      inArray(
        products.slug,
        cart.map((item) => item.productSlug),
      ),
    with: {
      subcategory: {
        with: {
          subcollection: true,
        },
      },
    },
  });

  const withQuantity = products.map((product) => ({
    ...product,
    quantity:
      cart.find((item) => item.productSlug === product.slug)?.quantity ?? 0,
  }));
  return withQuantity;
}
