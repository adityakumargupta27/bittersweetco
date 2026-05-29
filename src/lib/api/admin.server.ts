import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ── Orders ──

export const getAdminOrders = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw new Error("Failed to fetch orders");
    return data ?? [];
  },
);

export const updateOrderStatus = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      orderId: z.string().uuid(),
      status: z.enum(["pending", "preparing", "baking", "out_for_delivery", "delivered", "cancelled"]),
    }),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.orderId);

    if (error) throw new Error("Failed to update order status");
    return { success: true };
  });

// ── Products ──

export const getAdminProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    // Admin needs to see ALL products including inactive
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw new Error("Failed to fetch products");
    return data ?? [];
  },
);

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().min(1),
      longDescription: z.string().optional(),
      ingredients: z.string().optional(),
      category: z.string().min(1),
      priceInr: z.number().int().min(0),
      imageUrl: z.string().min(1),
      badge: z.string().optional(),
      stock: z.number().int().min(0).default(50),
      featured: z.boolean().default(false),
      active: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("products").insert({
      name: data.name,
      slug: data.slug,
      description: data.description,
      long_description: data.longDescription || null,
      ingredients: data.ingredients || null,
      category: data.category,
      price_inr: data.priceInr,
      image_url: data.imageUrl,
      badge: data.badge || null,
      stock: data.stock,
      featured: data.featured,
      active: data.active,
    });

    if (error) throw new Error("Failed to create product");
    return { success: true };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().uuid(),
      name: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      longDescription: z.string().optional(),
      ingredients: z.string().optional(),
      category: z.string().optional(),
      priceInr: z.number().int().min(0).optional(),
      imageUrl: z.string().optional(),
      badge: z.string().nullable().optional(),
      stock: z.number().int().min(0).optional(),
      featured: z.boolean().optional(),
      active: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, ...updates } = data;
    const { error } = await supabaseAdmin
      .from("products")
      .update({
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.slug !== undefined && { slug: updates.slug }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.longDescription !== undefined && { long_description: updates.longDescription }),
        ...(updates.ingredients !== undefined && { ingredients: updates.ingredients }),
        ...(updates.category !== undefined && { category: updates.category }),
        ...(updates.priceInr !== undefined && { price_inr: updates.priceInr }),
        ...(updates.imageUrl !== undefined && { image_url: updates.imageUrl }),
        ...(updates.badge !== undefined && { badge: updates.badge }),
        ...(updates.stock !== undefined && { stock: updates.stock }),
        ...(updates.featured !== undefined && { featured: updates.featured }),
        ...(updates.active !== undefined && { active: updates.active }),
      })
      .eq("id", id);
    if (error) throw new Error("Failed to update product");
    return { success: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error("Failed to delete product");
    return { success: true };
  });

// ── Coupons ──

export const getAdminCoupons = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error("Failed to fetch coupons");
    return data ?? [];
  },
);

export const createCoupon = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      code: z.string().min(1),
      discountType: z.enum(["flat", "percent"]),
      discountValue: z.number().int().min(1),
      minOrder: z.number().int().min(0).default(0),
      active: z.boolean().default(true),
      expiresAt: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("coupons").insert({
      code: data.code.toUpperCase(),
      discount_type: data.discountType,
      discount_value: data.discountValue,
      min_order: data.minOrder,
      active: data.active,
      expires_at: data.expiresAt || null,
    });

    if (error) throw new Error("Failed to create coupon");
    return { success: true };
  });

export const updateCoupon = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().uuid(),
      code: z.string().optional(),
      discountType: z.enum(["flat", "percent"]).optional(),
      discountValue: z.number().int().min(1).optional(),
      minOrder: z.number().int().min(0).optional(),
      active: z.boolean().optional(),
      expiresAt: z.string().nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, ...updates } = data;
    const { error } = await supabaseAdmin
      .from("coupons")
      .update({
        ...(updates.code !== undefined && { code: updates.code.toUpperCase() }),
        ...(updates.discountType !== undefined && { discount_type: updates.discountType }),
        ...(updates.discountValue !== undefined && { discount_value: updates.discountValue }),
        ...(updates.minOrder !== undefined && { min_order: updates.minOrder }),
        ...(updates.active !== undefined && { active: updates.active }),
        ...(updates.expiresAt !== undefined && { expires_at: updates.expiresAt }),
      })
      .eq("id", id);
    if (error) throw new Error("Failed to update coupon");
    return { success: true };
  });

// ── Dashboard ──

export const getDashboardStats = createServerFn({ method: "GET" }).handler(
  async () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [todayOrders, weekOrders, monthOrders, allOrders] = await Promise.all([
      supabaseAdmin.from("orders").select("total").gte("created_at", todayStart),
      supabaseAdmin.from("orders").select("total").gte("created_at", weekStart),
      supabaseAdmin.from("orders").select("total").gte("created_at", monthStart),
      supabaseAdmin.from("orders").select("id, total, status, created_at, customer_name, order_number").order("created_at", { ascending: false }).limit(10),
    ]);

    const sum = (rows: any[] | null) => (rows ?? []).reduce((s, r) => s + (r.total ?? 0), 0);

    return {
      todayRevenue: sum(todayOrders.data),
      todayOrders: todayOrders.data?.length ?? 0,
      weekRevenue: sum(weekOrders.data),
      weekOrders: weekOrders.data?.length ?? 0,
      monthRevenue: sum(monthOrders.data),
      monthOrders: monthOrders.data?.length ?? 0,
      recentOrders: allOrders.data ?? [],
    };
  },
);

// ── Customers ──

export const getCustomers = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("customer_email, customer_name, customer_phone, total, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error("Failed to fetch customers");

    // Group by email
    const map = new Map<string, { email: string; name: string; phone: string; orders: number; totalSpent: number; lastOrder: string }>();
    for (const order of data ?? []) {
      const existing = map.get(order.customer_email);
      if (existing) {
        existing.orders++;
        existing.totalSpent += order.total;
      } else {
        map.set(order.customer_email, {
          email: order.customer_email,
          name: order.customer_name,
          phone: order.customer_phone,
          orders: 1,
          totalSpent: order.total,
          lastOrder: order.created_at,
        });
      }
    }

    return Array.from(map.values());
  },
);
