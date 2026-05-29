import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useMatches,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileOrderBar from "@/components/MobileOrderBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gold">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-cocoa px-6 py-3 font-button text-xs uppercase tracking-widest text-cream transition-colors hover:bg-chocolate"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-cocoa px-5 py-2.5 font-button text-xs uppercase tracking-widest text-cream transition-colors hover:bg-chocolate"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 font-button text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-beige"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// Google Fonts preconnect + stylesheet
const googleFontsUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Poppins:wght@400;500;600;700&display=swap";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "The Bittersweet Co. — Handcrafted Brownies & Cookies" },
        {
          name: "description",
          content:
            "Transforming cravings into bliss. Handcrafted brownies and cookies baked fresh with Belgian cocoa and French butter, delivered with love.",
        },
        { name: "author", content: "The Bittersweet Co." },
        { property: "og:title", content: "The Bittersweet Co." },
        {
          property: "og:description",
          content:
            "Handcrafted brownies and cookies, baked fresh and delivered with love.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#2F1B12" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        { rel: "stylesheet", href: googleFontsUrl },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const matches = useMatches();
  const isAdmin = matches.some((m) => m.fullPath.startsWith("/_authenticated"));
  const locationKey = matches[matches.length - 1]?.fullPath ?? "/";

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdmin && <CursorGlow />}
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={locationKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {!isAdmin && <Footer />}
      <CartDrawer />
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <MobileOrderBar />}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
