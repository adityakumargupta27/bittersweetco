import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil } from "lucide-react";
import { getAdminCoupons, createCoupon, updateCoupon } from "@/lib/api/admin.server";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin/coupons")({
  component: AdminCoupons,
});

function AdminCoupons() {
  const [editing, setEditing] = useState<Tables<"coupons"> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: coupons = [] } = useQuery({
    queryKey: ["admin", "coupons"],
    queryFn: () => getAdminCoupons(),
  });

  const createMut = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
      toast.success("Coupon created");
      setShowForm(false);
    },
    onError: () => toast.error("Failed to create coupon"),
  });

  const updateMut = useMutation({
    mutationFn: updateCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
      toast.success("Coupon updated");
      setEditing(null);
    },
    onError: () => toast.error("Failed to update coupon"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      code: fd.get("code") as string,
      discountType: fd.get("discountType") as "flat" | "percent",
      discountValue: parseInt(fd.get("discountValue") as string, 10),
      minOrder: parseInt(fd.get("minOrder") as string, 10) || 0,
      active: fd.get("active") === "on",
      expiresAt: (fd.get("expiresAt") as string) || undefined,
    };

    if (editing) {
      updateMut.mutate({ data: { id: editing.id, ...payload, expiresAt: payload.expiresAt || null } });
    } else {
      createMut.mutate({ data: payload });
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-cocoa">Coupons</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="flex items-center gap-2 rounded-xl bg-cocoa px-4 py-2.5 text-sm text-cream transition-colors hover:bg-chocolate"
        >
          <Plus size={14} />
          Add Coupon
        </button>
      </div>

      {(showForm || editing) && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-white p-5">
          <h2 className="font-display text-lg text-cocoa">
            {editing ? "Edit Coupon" : "New Coupon"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input name="code" defaultValue={editing?.code ?? ""} placeholder="CODE" className={inputClass} required />
            <select name="discountType" defaultValue={editing?.discount_type ?? "flat"} className={inputClass}>
              <option value="flat">Flat (₹)</option>
              <option value="percent">Percent (%)</option>
            </select>
            <input name="discountValue" type="number" defaultValue={editing?.discount_value ?? ""} placeholder="Value" className={inputClass} required />
            <input name="minOrder" type="number" defaultValue={editing?.min_order ?? 0} placeholder="Min Order (₹)" className={inputClass} />
            <input name="expiresAt" type="date" defaultValue={editing?.expires_at?.slice(0, 10) ?? ""} className={inputClass} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={editing?.active ?? true} className="rounded" />
              Active
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="rounded-lg bg-cocoa px-4 py-2 text-sm text-cream hover:bg-chocolate">
              {editing ? "Update" : "Create"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="rounded-lg border border-border px-4 py-2 text-sm text-cocoa hover:bg-beige">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Min Order</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Expires</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-beige/30">
                <td className="px-4 py-3 font-mono font-medium text-cocoa">{c.code}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{c.discount_type}</td>
                <td className="px-4 py-3 text-cocoa">
                  {c.discount_type === "flat" ? `₹${c.discount_value}` : `${c.discount_value}%`}
                </td>
                <td className="px-4 py-3 text-muted-foreground">₹{c.min_order}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${c.active ? "bg-olive/10 text-olive" : "bg-destructive/10 text-destructive"}`}>
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {c.expires_at ? new Date(c.expires_at).toLocaleDateString() : "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => { setEditing(c); setShowForm(false); }}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-beige hover:text-cocoa"
                  >
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
