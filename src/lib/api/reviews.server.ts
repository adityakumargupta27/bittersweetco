import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getApprovedReviews = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("[reviews] fetch error:", error);
      throw new Error("Failed to load reviews");
    }

    return data ?? [];
  },
);
