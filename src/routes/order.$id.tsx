import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { Package, ArrowLeft } from "lucide-react";

import { getOrder } from "@/lib/api/orders.server";
import OrderTimeline from "@/components/OrderTimeline";
import GoldDivider from "@/components/GoldDivider";
import type { Enums } from "@/integrations/supabase/types";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — The Bittersweet Co." },
      { name: "description", content: "Track your order from The Bittersweet Co." },
    ],
  }),
  loader: async ({ params }) => {
    const order = await getOrder({ data: { id: params.id } });
    return { order };
  },
  component: OrderPage,
});

function OrderPage() {
  const { order } = Route.useLoaderData();
  const confettiFired = useRef(false);

  useEffect(() => {
    if (!confettiFired.current && order.status === "pending") {
      confettiFired.current = true;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C8B38A", "#5B3A29", "#7A7D57", "#F8F2E8"],
      });
    }
  }, [order.status]);

  const items = (order.items as any[]) ?? [];

  return (
    <main className="min-h-screen bg-background pb-20 pt-28">
      <div className="mx-auto max-w-2xl px-6 md:px-8">
        {/* Success header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
            <Package size={28} className="text-gold" />
          </div>
          <h1 className="mt-4 font-display text-3xl text-cocoa">
            {order.status === "pending" ? "Order Placed! 🎉" : "Order Status"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Order <span className="font-medium text-cocoa">{order.order_number}</span>
          </p>
        </div>

        <GoldDivider className="my-8" />

        {/* Timeline */}
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-4 font-display text-lg text-cocoa">Order Progress</h2>
          <OrderTimeline currentStatus={order.status as Enums<"order_status">} />
        </div>

        {/* Items */}
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-4 font-display text-lg text-cocoa">Items Ordered</h2>
          <ul className="space-y-3">
            {items.map((item: any, i: number) => (
              <li key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-cocoa">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm text-cocoa">₹{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>

          <GoldDivider className="my-4" ornament={false} />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-olive">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>{order.delivery_fee === 0 ? "Free" : `₹${order.delivery_fee}`}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-lg text-cocoa">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-3 font-display text-lg text-cocoa">Delivery Details</h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-medium text-cocoa">{order.customer_name}</p>
            <p>{order.customer_phone}</p>
            <p>{order.customer_email}</p>
            <p className="mt-2">
              {order.address_line1}
              {order.address_line2 && `, ${order.address_line2}`}
            </p>
            <p>{order.city} - {order.pincode}</p>
            {order.delivery_slot && <p>Slot: {order.delivery_slot}</p>}
            {order.instructions && <p className="italic">"{order.instructions}"</p>}
          </div>
        </div>

        {/* Back to menu */}
        <div className="mt-8 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-button text-xs uppercase tracking-widest text-cocoa transition-colors hover:bg-beige"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
