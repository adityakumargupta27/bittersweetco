import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getActiveProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[products] fetch error:", error);
      throw new Error("Failed to load products");
    }

    return data ?? [];
  },
);

export const getFeaturedProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("active", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(6);

    if (error) {
      console.error("[products] featured fetch error:", error);
      throw new Error("Failed to load featured products");
    }

    return data ?? [];
  },
);
