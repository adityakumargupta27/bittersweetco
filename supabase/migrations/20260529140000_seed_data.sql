-- Seed data: products, reviews, and a test coupon
-- This makes the site look alive on first load

-- Products
INSERT INTO public.products (slug, name, description, long_description, ingredients, category, price_inr, image_url, badge, stock, featured, sort_order) VALUES
  ('classic-brownie', 'Classic Fudge Brownie', 'Rich, dense, and impossibly fudgy. Our signature brownie.', 'Our signature brownie is a celebration of pure chocolate indulgence. Made with Belgian Callebaut cocoa and French butter, each brownie is baked low and slow until the top develops a delicate crackle while the inside stays impossibly fudgy. This is the brownie that started it all.', 'Belgian cocoa, French butter, free-range eggs, cane sugar, pure vanilla extract, sea salt, all-purpose flour', 'brownies', 249, '/product-classic-brownie.jpg', 'bestseller', 50, true, 1),
  ('choco-chunk-brownie', 'Choco Chunk Brownie', 'Loaded with premium dark chocolate chunks in every bite.', 'Take our classic fudge base and stud it with generous chunks of 70% dark chocolate that melt into pools of liquid gold. The contrast between the dense brownie and the melting chocolate chunks creates a texture experience that''s absolutely irresistible.', 'Belgian cocoa, dark chocolate chunks (70%), French butter, free-range eggs, cane sugar, pure vanilla extract, sea salt, flour', 'brownies', 299, '/product-choco-chunk.jpg', 'popular', 35, true, 2),
  ('walnut-brownie', 'Walnut Brownie', 'Crunchy toasted walnuts meet our fudgy brownie base.', 'Premium California walnuts, lightly toasted to bring out their nutty sweetness, folded into our signature fudge brownie batter. The walnuts add a beautiful crunch and earthy depth that complements the rich chocolate perfectly.', 'Belgian cocoa, California walnuts, French butter, free-range eggs, cane sugar, pure vanilla extract, sea salt, flour', 'brownies', 279, '/product-walnut-brownie.jpg', NULL, 40, true, 3),
  ('choco-chip-cookie', 'Choco Chip Cookie', 'Crispy edges, chewy center, loaded with Belgian chocolate chips.', 'These aren''t your average cookies. Brown butter gives them a deep, toffee-like flavor. Belgian chocolate chips melt into every bite. Crispy around the edges, soft and chewy in the center — the way a perfect cookie should be.', 'Brown butter, Belgian chocolate chips, free-range eggs, cane sugar, brown sugar, pure vanilla extract, sea salt, flour, baking soda', 'cookies', 199, '/product-choco-chip-cookie.jpg', 'new', 60, true, 4),
  ('oats-cookie', 'Oats & Raisin Cookie', 'Wholesome oats and plump raisins in a golden, chewy cookie.', 'A beautiful balance of wholesome and indulgent. Rolled oats give these cookies a satisfying chew while plump raisins add bursts of natural sweetness. Lightly spiced with cinnamon and a touch of nutmeg.', 'Rolled oats, raisins, butter, free-range eggs, brown sugar, cinnamon, nutmeg, pure vanilla extract, flour, baking soda', 'cookies', 179, '/product-oats-cookie.jpg', NULL, 45, true, 5),
  ('gift-box', 'The Indulgence Box', 'A curated box of 6 assorted brownies and cookies. Perfect for gifting.', 'The ultimate gift for anyone with a sweet tooth. This beautifully packaged box contains 2 Classic Fudge Brownies, 1 Choco Chunk Brownie, 1 Walnut Brownie, 1 Choco Chip Cookie, and 1 Oats Cookie. Wrapped in our signature cream and gold packaging.', 'Assorted premium brownies and cookies', 'gift-boxes', 899, '/product-gift-box.jpg', 'popular', 20, true, 6);

-- Reviews
INSERT INTO public.reviews (customer_name, rating, body, location, approved) VALUES
  ('Priya Sharma', 5, 'The best brownies I''ve ever had! The classic fudge brownie is absolutely divine. You can taste the quality of the ingredients.', 'Mumbai', true),
  ('Rahul Mehta', 5, 'Ordered the Indulgence Box for my wife''s birthday and she was thrilled. Beautifully packaged and everything tasted amazing.', 'Pune', true),
  ('Ananya Desai', 4, 'Love the choco chunk brownies! Super fudgy and the chocolate chunks are generous. Will definitely order again.', 'Mumbai', true),
  ('Karan Patel', 5, 'These cookies are unreal. The brown butter choco chip cookie has ruined all other cookies for me. So good!', 'Bangalore', true),
  ('Sneha Reddy', 5, 'Same-day delivery and everything was perfectly fresh. The walnut brownie is my new favorite treat.', 'Mumbai', true),
  ('Arjun Nair', 4, 'Great quality and taste. The packaging is beautiful too. My only wish is that they had more flavors!', 'Hyderabad', true),
  ('Meera Iyer', 5, 'I''ve tried so many bakeries but The Bittersweet Co. is on another level. You can taste the love in every bite.', 'Mumbai', true),
  ('Vikram Singh', 5, 'Ordered for a corporate event and everyone was raving about the brownies. Professional packaging and on-time delivery!', 'Delhi', true);

-- Test coupon
INSERT INTO public.coupons (code, discount_type, discount_value, min_order, active, expires_at) VALUES
  ('SWEET10', 'percent', 10, 300, true, '2027-12-31T23:59:59Z'),
  ('FIRST50', 'flat', 50, 200, true, '2027-12-31T23:59:59Z');
