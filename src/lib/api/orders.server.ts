import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const orderItemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  price: z.number().int().min(0),
  quantity: z.number().int().min(1).max(50),
  image: z.string(),
});

const createOrderSchema = z.object({
  customerName: z.string().min(1).max(100),
  customerPhone: z.string().min(7).max(20),
  customerEmail: z.string().email(),
  addressLine1: z.string().min(1).max(200),
  addressLine2: z.string().max(200).optional().default(""),
  city: z.string().min(1).max(100),
  pincode: z.string().regex(/^\d{6}$/),
  instructions: z.string().max(500).optional().default(""),
  deliverySlot: z.string().optional().default(""),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number().int().min(0),
  deliveryFee: z.number().int().min(0),
  discount: z.number().int().min(0),
  total: z.number().int().min(0),
  couponCode: z.string().optional().default(""),
  paymentMethod: z.literal("cod").default("cod"),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator(createOrderSchema)
  .handler(async ({ data }) => {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2 || null,
        city: data.city,
        pincode: data.pincode,
        instructions: data.instructions || null,
        delivery_slot: data.deliverySlot || null,
        items: data.items as any,
        subtotal: data.subtotal,
        delivery_fee: data.deliveryFee,
        discount: data.discount,
        total: data.total,
        coupon_code: data.couponCode || null,
        payment_method: data.paymentMethod,
        status: "pending",
      })
      .select("id, order_number")
      .single();

    if (error) {
      console.error("[orders] create error:", error);
      throw new Error("Failed to create order");
    }

    return { id: order.id, orderNumber: order.order_number };
  });

export const getOrder = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", data.id)
      .single();

    if (error) {
      console.error("[orders] fetch error:", error);
      throw new Error("Order not found");
    }

    return order;
  });
