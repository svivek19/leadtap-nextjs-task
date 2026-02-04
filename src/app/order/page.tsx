import { Metadata } from "next";
import { Suspense } from "react";
import { CartItems, TotalCost } from "./dynamic";
import { PlaceOrderAuth } from "../auth.server";

export const metadata: Metadata = {
  title: "Order",
};

export default async function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review your items and place your order
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left - Cart */}
          <div className="lg:col-span-2">
            <Suspense>
              <CartItems />
            </Suspense>
          </div>

          {/* Right - Summary */}
          <div className="space-y-6">

            {/* Summary Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="flex items-center justify-between text-sm">
                <span>Merchandise</span>
                <Suspense>
                  <TotalCost />
                </Suspense>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Shipping and tax calculated at checkout.
              </p>
            </div>

            {/* Auth */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <Suspense>
                <PlaceOrderAuth />
              </Suspense>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
  