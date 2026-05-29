import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getAdminProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api/admin.server";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [editing, setEditing] = useState<Tables<"products"> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => getAdminProducts(),
  });

  const createMut = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product created");
      setShowForm(false);
    },
    onError: () => toast.error("Failed to create product"),
  });

  const updateMut = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product updated");
      setEditing(null);
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteMut = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      slug: fd.get("slug") as string,
      description: fd.get("description") as string,
      longDescription: (fd.get("longDescription") as string) || undefined,
      ingredients: (fd.get("ingredients") as string) || undefined,
      category: fd.get("category") as string,
      priceInr: parseInt(fd.get("priceInr") as string, 10),
      imageUrl: fd.get("imageUrl") as string,
      badge: (fd.get("badge") as string) || undefined,
      stock: parseInt(fd.get("stock") as string, 10) || 50,
      featured: fd.get("featured") === "on",
      active: fd.get("active") === "on",
    };

    if (editing) {
      updateMut.mutate({ data: { id: editing.id, ...payload } });
    } else {
      createMut.mutate({ data: payload });
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-cocoa">Products</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="flex items-center gap-2 rounded-xl bg-cocoa px-4 py-2.5 text-sm text-cream transition-colors hover:bg-chocolate"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* Form */}
      {(showForm || editing) && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-white p-5">
          <h2 className="font-display text-lg text-cocoa">
            {editing ? "Edit Product" : "New Product"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input name="name" defaultValue={editing?.name ?? ""} placeholder="Name" className={inputClass} required />
            <input name="slug" defaultValue={editing?.slug ?? ""} placeholder="slug-name" className={inputClass} required />
            <input name="category" defaultValue={editing?.category ?? "brownies"} placeholder="Category" className={inputClass} required />
            <input name="priceInr" type="number" defaultValue={editing?.price_inr ?? ""} placeholder="Price (₹)" className={inputClass} required />
            <input name="imageUrl" defaultValue={editing?.image_url ?? ""} placeholder="Image URL" className={inputClass} required />
            <input name="badge" defaultValue={editing?.badge ?? ""} placeholder="Badge (optional)" className={inputClass} />
            <input name="stock" type="number" defaultValue={editing?.stock ?? 50} placeholder="Stock" className={inputClass} />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" defaultChecked={editing?.featured ?? false} className="rounded" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="active" defaultChecked={editing?.active ?? true} className="rounded" />
                Active
              </label>
            </div>
          </div>
          <textarea name="description" defaultValue={editing?.description ?? ""} placeholder="Short description" className={`${inputClass} mt-4`} rows={2} required />
          <textarea name="longDescription" defaultValue={editing?.long_description ?? ""} placeholder="Long description (optional)" className={`${inputClass} mt-2`} rows={3} />
          <textarea name="ingredients" defaultValue={editing?.ingredients ?? ""} placeholder="Ingredients (optional)" className={`${inputClass} mt-2`} rows={2} />
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

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-beige/30">
                <td className="px-4 py-3">
                  <p className="font-medium text-cocoa">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.slug}</p>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-cocoa">₹{p.price_inr}</td>
                <td className="px-4 py-3 text-cocoa">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.active ? "bg-olive/10 text-olive" : "bg-destructive/10 text-destructive"}`}>
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setEditing(p); setShowForm(false); }}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-beige hover:text-cocoa"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this product?"))
                          deleteMut.mutate({ data: { id: p.id } });
                      }}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
