import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { getDashboardStats } from "@/lib/api/admin.server";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => getDashboardStats(),
    refetchInterval: 30000,
  });

  const cards = [
    {
      label: "Today's Revenue",
      value: stats ? `₹${stats.todayRevenue.toLocaleString()}` : "—",
      sub: `${stats?.todayOrders ?? 0} orders`,
      icon: DollarSign,
      color: "bg-gold/10 text-gold",
    },
    {
      label: "This Week",
      value: stats ? `₹${stats.weekRevenue.toLocaleString()}` : "—",
      sub: `${stats?.weekOrders ?? 0} orders`,
      icon: TrendingUp,
      color: "bg-olive/10 text-olive",
    },
    {
      label: "This Month",
      value: stats ? `₹${stats.monthRevenue.toLocaleString()}` : "—",
      sub: `${stats?.monthOrders ?? 0} orders`,
      icon: ShoppingCart,
      color: "bg-chocolate/10 text-chocolate",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-cocoa">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back to The Bittersweet Co.</p>

      {/* Stats cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.color}`}>
                <card.icon size={18} />
              </div>
            </div>
            <p className="mt-2 font-display text-2xl text-cocoa">{card.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-8 rounded-2xl border border-border bg-white p-5">
        <h2 className="font-display text-lg text-cocoa">Recent Orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.recentOrders ?? []).map((order) => (
                <tr key={order.id} className="border-b border-border/50">
                  <td className="py-3 font-medium text-cocoa">{order.order_number}</td>
                  <td className="py-3 text-muted-foreground">{order.customer_name}</td>
                  <td className="py-3 text-cocoa">₹{order.total}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-medium capitalize text-gold">
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
              {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
