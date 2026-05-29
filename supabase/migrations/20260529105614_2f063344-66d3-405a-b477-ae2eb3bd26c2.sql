
-- Fix set_updated_at search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Lock down SECURITY DEFINER functions: revoke from public/anon/authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- handle_new_user is only called by trigger; no GRANT needed

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC;

-- Tighten orders insert: ensure totals are non-negative and required fields valid
DROP POLICY "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can place an order" ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(customer_name) BETWEEN 1 AND 100
    AND char_length(customer_phone) BETWEEN 7 AND 20
    AND total >= 0
    AND subtotal >= 0
    AND jsonb_array_length(items) > 0
  );
