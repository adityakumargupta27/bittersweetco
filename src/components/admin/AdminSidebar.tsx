import { Link, useMatches } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders" as const, label: "Orders", icon: ShoppingCart, exact: false },
  { to: "/admin/products" as const, label: "Products", icon: Package, exact: false },
  { to: "/admin/customers" as const, label: "Customers", icon: Users, exact: false },
  { to: "/admin/coupons" as const, label: "Coupons", icon: Tag, exact: false },
];

export default function AdminSidebar() {
  const matches = useMatches();
  const currentPath = (matches[matches.length - 1]?.fullPath ?? "") as string;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-cocoa text-cream">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-cream/10 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft">
          <span className="font-display text-sm font-bold text-cocoa">B</span>
        </div>
        <div>
          <span className="font-display text-sm tracking-wide">Admin</span>
          <p className="text-[10px] text-cream/40">The Bittersweet Co.</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = link.exact
              ? currentPath.endsWith("/admin/") || currentPath.endsWith("/admin")
              : currentPath.includes(link.to);

            return (
              <li key={link.to}>
                <Link
                  to={link.to as any}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-gold/15 text-gold"
                      : "text-cream/60 hover:bg-cream/5 hover:text-cream",
                  )}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Back to store */}
      <div className="border-t border-cream/10 px-3 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-cream/50 transition-colors hover:text-cream"
        >
          <ArrowLeft size={18} />
          Back to Storefront
        </Link>
      </div>
    </aside>
  );
}
