import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, Tag } from "lucide-react";

import { useCartStore } from "@/stores/cart";
import { createOrder } from "@/lib/api/orders.server";
import { validateCoupon } from "@/lib/api/coupons.server";
import { getProductImage } from "@/lib/products-images";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import GoldDivider from "@/components/GoldDivider";

const STEPS = ["Details", "Delivery", "Confirm"];

const detailsSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100),
  customerPhone: z.string().min(7, "Valid phone required").max(20),
  customerEmail: z.string().email("Valid email required"),
});

const deliverySchema = z.object({
  addressLine1: z.string().min(1, "Address is required").max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, "City is required").max(100),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  deliverySlot: z.string().optional(),
  instructions: z.string().max(500).optional(),
});

type DetailsForm = z.infer<typeof detailsSchema>;
type DeliveryForm = z.infer<typeof deliverySchema>;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — The Bittersweet Co." },
      { name: "description", content: "Complete your order from The Bittersweet Co." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const discountAmount = useCartStore((s) => s.discount);
  const totalAmount = useCartStore((s) => s.total);
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const clearCart = useCartStore((s) => s.clearCart);

  const detailsForm = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { customerName: "", customerPhone: "", customerEmail: "" },
  });

  const deliveryForm = useForm<DeliveryForm>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      pincode: "",
      deliverySlot: "",
      instructions: "",
    },
  });

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center">
          <p className="font-display text-2xl text-cocoa">Your cart is empty</p>
          <p className="mt-2 text-muted-foreground">
            Add some delicious treats before checking out!
          </p>
          <a
            href="/menu"
            className="mt-6 inline-flex rounded-full bg-cocoa px-6 py-3 font-button text-xs uppercase tracking-widest text-cream"
          >
            Browse Menu
          </a>
        </div>
      </main>
    );
  }

  async function handleNextStep() {
    if (step === 0) {
      const valid = await detailsForm.trigger();
      if (valid) setStep(1);
    } else if (step === 1) {
      const valid = await deliveryForm.trigger();
      if (valid) setStep(2);
    }
  }

  async function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const result = await validateCoupon({ data: { code: couponInput, subtotal: subtotal() } });
      if (result.valid) {
        applyCoupon(result.coupon);
        toast.success("Coupon applied!");
        setCouponInput("");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  }

  async function handlePlaceOrder() {
    setSubmitting(true);
    try {
      const details = detailsForm.getValues();
      const delivery = deliveryForm.getValues();

      const result = await createOrder({
        data: {
          customerName: details.customerName,
          customerPhone: details.customerPhone,
          customerEmail: details.customerEmail,
          addressLine1: delivery.addressLine1,
          addressLine2: delivery.addressLine2 || "",
          city: delivery.city,
          pincode: delivery.pincode,
          instructions: delivery.instructions || "",
          deliverySlot: delivery.deliverySlot || "",
          items: items.map((i) => ({
            id: i.id,
            slug: i.slug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          subtotal: subtotal(),
          deliveryFee: deliveryFee(),
          discount: discountAmount(),
          total: totalAmount(),
          couponCode: coupon?.code || "",
          paymentMethod: "cod",
        },
      });

      clearCart();
      navigate({ to: "/order/$id", params: { id: result.id } });
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-cocoa placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all";
  const labelClass = "block text-sm font-medium text-cocoa mb-1.5";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <main className="min-h-screen bg-background pb-20 pt-28">
      <div className="mx-auto max-w-2xl px-6 md:px-8">
        <h1 className="text-center font-display text-3xl text-cocoa md:text-4xl">Checkout</h1>
        <div className="mt-8">
          <CheckoutSteps currentStep={step} steps={STEPS} />
        </div>

        <div className="mt-10">
          {/* Step 1: Details */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  {...detailsForm.register("customerName")}
                  className={inputClass}
                  placeholder="Your full name"
                />
                {detailsForm.formState.errors.customerName && (
                  <p className={errorClass}>{detailsForm.formState.errors.customerName.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  {...detailsForm.register("customerPhone")}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                  type="tel"
                />
                {detailsForm.formState.errors.customerPhone && (
                  <p className={errorClass}>{detailsForm.formState.errors.customerPhone.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  {...detailsForm.register("customerEmail")}
                  className={inputClass}
                  placeholder="you@example.com"
                  type="email"
                />
                {detailsForm.formState.errors.customerEmail && (
                  <p className={errorClass}>{detailsForm.formState.errors.customerEmail.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Address Line 1</label>
                <input
                  {...deliveryForm.register("addressLine1")}
                  className={inputClass}
                  placeholder="House/Flat no., Building, Street"
                />
                {deliveryForm.formState.errors.addressLine1 && (
                  <p className={errorClass}>{deliveryForm.formState.errors.addressLine1.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Address Line 2 (optional)</label>
                <input
                  {...deliveryForm.register("addressLine2")}
                  className={inputClass}
                  placeholder="Landmark, Area"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    {...deliveryForm.register("city")}
                    className={inputClass}
                    placeholder="Mumbai"
                  />
                  {deliveryForm.formState.errors.city && (
                    <p className={errorClass}>{deliveryForm.formState.errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Pincode</label>
                  <input
                    {...deliveryForm.register("pincode")}
                    className={inputClass}
                    placeholder="400001"
                    maxLength={6}
                  />
                  {deliveryForm.formState.errors.pincode && (
                    <p className={errorClass}>{deliveryForm.formState.errors.pincode.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass}>Delivery Slot (optional)</label>
                <select {...deliveryForm.register("deliverySlot")} className={inputClass}>
                  <option value="">Select a slot</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 8 PM)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Special Instructions (optional)</label>
                <textarea
                  {...deliveryForm.register("instructions")}
                  className={inputClass}
                  rows={3}
                  placeholder="Any special requests or delivery instructions..."
                />
              </div>

              {/* Coupon */}
              <div>
                <label className={labelClass}>Coupon Code</label>
                {coupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-gold/10 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-olive">
                      <Tag size={14} />
                      {coupon.code} — {coupon.discountType === "flat" ? `₹${coupon.discountValue} off` : `${coupon.discountValue}% off`}
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-destructive hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className={inputClass}
                      placeholder="Enter coupon code"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="shrink-0 rounded-xl bg-cocoa px-5 py-3 font-button text-xs uppercase tracking-wider text-cream transition-colors hover:bg-chocolate disabled:opacity-50"
                    >
                      {couponLoading ? <Loader2 size={14} className="animate-spin" /> : "Apply"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Order summary */}
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-display text-lg text-cocoa">Order Summary</h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <img
                        src={getProductImage(item.slug, item.image)}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-cocoa">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-cocoa">₹{item.price * item.quantity}</p>
                    </li>
                  ))}
                </ul>

                <GoldDivider className="my-4" ornament={false} />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal()}</span>
                  </div>
                  {discountAmount() > 0 && (
                    <div className="flex justify-between text-olive">
                      <span>Discount ({coupon?.code})</span>
                      <span>-₹{discountAmount()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>{deliveryFee() === 0 ? "Free" : `₹${deliveryFee()}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-display text-lg text-cocoa">
                    <span>Total</span>
                    <span>₹{totalAmount()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery details */}
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-display text-lg text-cocoa">Delivery Details</h3>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-cocoa">{detailsForm.getValues("customerName")}</p>
                  <p>{detailsForm.getValues("customerPhone")}</p>
                  <p>{detailsForm.getValues("customerEmail")}</p>
                  <p className="mt-2">
                    {deliveryForm.getValues("addressLine1")}
                    {deliveryForm.getValues("addressLine2") && `, ${deliveryForm.getValues("addressLine2")}`}
                  </p>
                  <p>{deliveryForm.getValues("city")} - {deliveryForm.getValues("pincode")}</p>
                </div>
              </div>

              {/* Payment method */}
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-display text-lg text-cocoa">Payment Method</h3>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-gold/10 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
                    <span className="text-sm">💵</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cocoa">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-full border border-border px-5 py-3 font-button text-xs uppercase tracking-widest text-cocoa transition-colors hover:bg-beige"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 font-button text-xs uppercase tracking-widest text-cream transition-colors hover:bg-chocolate"
            >
              Next
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-button text-xs uppercase tracking-widest text-cocoa shadow-lg transition-all hover:bg-gold-soft hover:shadow-xl disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order · ₹{totalAmount()}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
