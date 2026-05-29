import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const checkAdminRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (error) {
      console.error("[auth] role check error:", error);
      throw new Error("Failed to check admin role");
    }

    if (!data) {
      throw new Error("Unauthorized: Admin role required");
    }

    return { userId, isAdmin: true };
  });
