import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const validateCoupon = createServerFn({ method: "POST" })
  .inputValidator(z.object({ code: z.string().min(1), subtotal: z.number().int().min(0) }))
  .handler(async ({ data }) => {
    const { data: coupon, error } = await supabaseAdmin
      .from("coupons")
      .select("code, discount_type, discount_value, min_order, expires_at")
      .eq("code", data.code.toUpperCase().trim())
      .eq("active", true)
      .single();

    if (error || !coupon) {
      return { valid: false as const, message: "Invalid coupon code" };
    }

    // Check expiry
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return { valid: false as const, message: "This coupon has expired" };
    }

    // Check min order
    if (data.subtotal < coupon.min_order) {
      return {
        valid: false as const,
        message: `Minimum order of ₹${coupon.min_order} required`,
      };
    }

    return {
      valid: true as const,
      coupon: {
        code: coupon.code,
        discountType: coupon.discount_type as "flat" | "percent",
        discountValue: coupon.discount_value,
      },
    };
  });
