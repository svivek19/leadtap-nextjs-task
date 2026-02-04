import type { Metadata } from "next";
import "./globals.css";
import { SearchDropdownComponent } from "@/components/search-dropdown";
import { MenuIcon, ShoppingCart, Clock } from "lucide-react";
import { Suspense } from "react";
import { Cart } from "@/components/cart";
import { AuthServer } from "./auth.server";
import { Link } from "@/components/ui/link";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { WelcomeToast } from "./welcome-toast";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | NextFaster",
    default: "NextFaster",
  },
  description: "A performant site built with Next.js",
};

export const revalidate = 86400; // One day

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
  <body
  className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col bg-white antialiased`}
>

        {/* Header */}
       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Top Bar */}
            <div className="flex h-16 items-center justify-between gap-4">
              {/* Logo */}
              <Link
                prefetch={true}
                href="/"
                className="text-2xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent"

              >
                NextFaster
              </Link>

              {/* Desktop Search */}
       <div className="hidden flex-1 max-w-2xl px-6 md:block">

                <SearchDropdownComponent />
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Auth Dropdown */}
                <Suspense
                  fallback={
                    <div className="h-9 w-16 animate-pulse rounded bg-gray-100" />
                  }
                >
                  <AuthServer />
                </Suspense>

                {/* Order Button */}
                <Link
                  prefetch={true}
                  href="/order"
                className="hidden items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 lg:flex"

                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden sm:inline">Order</span>
                  <Suspense>
                    <Cart />
                  </Suspense>
                </Link>

                {/* Order History - Desktop */}
                <Link
                  prefetch={true}
                  href="/order-history"
                  className="hidden items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 lg:flex"
                >
                  <Clock className="h-4 w-4" />
                  <span>History</span>
                </Link>

                {/* Mobile Menu Button */}
                <Link
                  prefetch={true}
                  href="/order-history"
                  aria-label="Menu"
                className="flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"

                >
                  <MenuIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="pb-3 md:hidden">
              <SearchDropdownComponent />
            </div>
          </div>
        </header>

        {/* Main Content */}
      <main className="flex-1 w-full bg-gray-50">

         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

            {children}
          </div>
        </main>

        {/* Footer */}
    <footer className="w-full border-t border-gray-200 bg-white">


          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
<div className="py-14">

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand Section */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <Link
                    href="/"
                    className="inline-block text-xl font-bold text-gray-900"
                  >
                    NextFaster
                  </Link>
                  <p className="mt-3 text-sm text-gray-600">
                    A performant e-commerce site built with Next.js
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Shop
                  </h3>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link
                        href="/order"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                      >
                        Order
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/order-history"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                      >
                        Order History
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                      >
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                      >
                        Returns
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/ethanniser/NextFaster"
                        className="text-sm text-gray-600 transition hover:text-gray-900 hover:underline"
                        target="_blank"
                      >
                        Source Code
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
           <div className="border-t border-gray-100 py-8">

              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} NextFaster. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Notifications */}
        <Suspense fallback={null}>
          <Toaster closeButton position="top-right" />
          <WelcomeToast />
        </Suspense>

        <Analytics scriptSrc="/insights/events.js" endpoint="/hfi/events" />
        <SpeedInsights />
      </body>
    </html>
  );
}