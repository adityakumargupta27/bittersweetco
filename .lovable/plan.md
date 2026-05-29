
# The Bittersweet Co. — Build Plan

A production-grade artisan bakery site on TanStack Start (the stack this project is on — Next.js can't be swapped in). Brand palette, fonts, and motion direction match the brief; payments are COD-only for v1 (Stripe can be added later via Lovable's seamless integration).

## Scope (v1)

**In:** Storefront, menu, product modal, cart, multi-step COD checkout, admin dashboard, order status flow, Resend transactional emails, marketing sections (Showcase, Why Us, Reviews, Instagram-style grid), full mobile experience, motion + glassmorphism design system.

**Out (later):** Stripe payments, real Instagram API, abandoned-cart automation, coupons engine (basic flat code only in v1), sound effects toggle.

## Design system

- Tokens in `src/styles.css` (oklch): `--cream`, `--beige`, `--chocolate`, `--cocoa`, `--olive`, `--gold` mapped to semantic Tailwind utilities (`bg-background`, `bg-primary`, etc.).
- Fonts via Google: Playfair Display (headings), Inter (body), Poppins (buttons). Loaded in `__root.tsx`.
- Reusable primitives: `GlassCard`, `MagneticButton`, `GoldDivider`, `SectionHeading`, `ParallaxImage`, `ScrollReveal` (Framer Motion).
- Global UX: cursor glow, scroll progress bar, page transitions, luxury loader on first paint.

## Pages / routes

```text
src/routes/
  __root.tsx              shell: fonts, Navbar, Footer, CartDrawer, CursorGlow, ScrollProgress, Toaster
  index.tsx               Hero, Showcase, Featured products, Why Us, Reviews, Instagram grid, CTA
  menu.tsx                Full product grid + filters + modal
  about.tsx               Brand story, craft, ingredients
  reviews.tsx             Full testimonials wall
  contact.tsx             Form + WhatsApp + map placeholder
  checkout.tsx            3-step COD checkout (details / delivery / confirm)
  order.$id.tsx           Order confirmation + tracking
  login.tsx               Admin login (email/password)
  _authenticated.tsx      Admin gate (role check)
  _authenticated/admin/
    index.tsx             Dashboard (revenue, recent orders, stats)
    orders.tsx            Order list + status update + CSV export
    products.tsx          CRUD products
    customers.tsx         List
    coupons.tsx           Simple flat-code coupons
```

## Backend (Lovable Cloud)

Tables (all RLS-enabled, with required `GRANT`s):

- `products` — name, slug, description, price_inr, image_url, category, badge, stock, featured, active.
- `orders` — id, customer name/phone/email, address json, items json, subtotal, delivery_fee, discount, total, coupon_code, status enum, delivery_slot, instructions, created_at.
- `order_items` (or embedded json on `orders` for v1 simplicity — embedded).
- `coupons` — code, type, value, active, expires_at.
- `reviews` — name, rating, body, photo_url, approved.
- `profiles` — id (auth.users), display_name.
- `user_roles` — separate table + `has_role()` security-definer fn (admin gate). Per project rules.

Status enum: `pending | preparing | baking | out_for_delivery | delivered | cancelled`.

Public reads via `createServerFn` + `supabaseAdmin` with explicit column projection (products, reviews, active coupon validation). Admin writes via `requireSupabaseAuth` + role check. Order creation is a public server route at `/api/public/orders` with Zod validation and basic rate-limit guard.

## Email (Resend via Lovable Emails)

Set up Lovable email domain → scaffold transactional infra → templates:
- `order-confirmation` — on order creation
- `order-status-update` — on admin status change
- `order-delivered` — when status flips to delivered

Triggered from server functions (admin status update) and order-creation route. Branded templates in cream/cocoa with Playfair headings.

## Motion direction

- Hero: animated static image with Ken Burns zoom, floating brownie particles (CSS + Motion), gradient overlay, staggered headline + glowing CTAs.
- Showcase: scroll-linked Framer Motion (`useScroll`/`useTransform`) — image scales/rotates, feature bullets cross-fade.
- Cards: spring lift on hover, image zoom, gold shadow bloom.
- Cart: right-side Sheet with spring physics, backdrop blur.
- Modal: scale + blur backdrop.

## Mobile

Bottom sticky "Order Now" bar, thumb-reach nav drawer, momentum-scrolled product carousels, full-screen modal on small screens. Tested at 375px and 414px.

## Conversion add-ons

Sticky CTA, WhatsApp floating button (deep link), "Today's Fresh Batch — N left" stock badge from `products.stock`, Best Seller / Popular ribbons from `products.badge`, confetti on order success.

## Out-of-scope clarifications

- **Stripe**: deferred. Checkout is COD; structure leaves a `payment_method` field so we can wire seamless Stripe later.
- **Instagram API**: real OAuth feed is a heavy integration. v1 renders a curated 6-tile Instagram-style grid backed by an `instagram_posts` table (or image imports) you can update from the admin. Real API can be added on request.
- **Hero video**: replaced with a high-res hero image + parallax/Ken Burns per your choice.
- **Sound effects, abandoned-cart, advanced analytics**: deferred.

## Build order

1. Enable Lovable Cloud, create schema + RLS + grants + role infra.
2. Design tokens, fonts, primitives (GlassCard, MagneticButton, ScrollReveal, CursorGlow, ScrollProgress, Loader).
3. Navbar, Footer, CartDrawer (Zustand store with persist).
4. Landing page sections (Hero → Showcase → Featured → Why Us → Reviews → Instagram → CTA).
5. Menu page + Product modal.
6. Checkout (3 steps) + order creation server route + confirmation page.
7. Admin auth gate, dashboard, orders, products, coupons, customers, CSV export.
8. Email domain + transactional templates + wiring.
9. Mobile pass, SEO meta per route, og:image on leaf routes, accessibility sweep.
10. Seed sample products + reviews so the site looks alive on first load.

## Technical notes

- TanStack Start (React 19 + Vite), Tailwind v4 tokens in `src/styles.css`, shadcn/ui, Framer Motion, Lucide, Zustand (with `persist` for cart), Zod for all input validation.
- Server logic via `createServerFn` (app-internal) and `src/routes/api/public/*` (order creation webhook-style endpoint).
- Lovable Cloud (Supabase) for DB/auth/storage; Resend via Lovable Emails for transactional.
- Lighthouse: lazy-loaded images, sized hero, font-display swap, route-level `head()` meta, JSON-LD for `Bakery` + `Product`.
