# Skip Or Buy - Project Notes

## App Status

The app has NOT been released yet. It is currently in pre-launch / coming soon mode. The website uses a **waitlist signup** (via `/api/interest` endpoint) instead of app store download links. The "Join Waitlist" button is in the header. The `WaitlistForm` component is used in the Hero and CTA sections. The `ComingSoon` popup also collects interest signups. Do not add direct download links or treat the app as live.

### On Release TODO
- Hook up the **App Store** and **Google Play Store** links. The `StoreBadges` component (`src/components/StoreBadges.tsx`) has placeholder `href="#"` links that need real URLs.
- Replace `WaitlistForm` in Hero and CTA with `StoreBadges` (or show both).
- Consider removing or repurposing the `ComingSoon` popup and the header waitlist dropdown.

## Blog Posts (35 articles)

All blog posts are in `src/content/blog/` as markdown files. The custom markdown renderer is in `src/components/blog/BlogRenderer.tsx` and supports: headings, bold/italic, links, lists, blockquotes, inline code, horizontal rules, tables, and custom blocks (:::stats, :::takeaway, :::blogcta, :::calculator, :::checklist).

### Cost Per Use (7 posts)
- `what-is-cost-per-use.md` - What Is Cost Per Use? The Simple Formula That Changes How You Shop
- `how-to-calculate-cost-per-use.md` - How to Calculate Cost Per Use for Anything: Step-by-Step
- `cost-per-use-vs-price-tag.md` - Cost Per Use vs Price Tag: Why Cheap Isn't Always Better
- `cost-per-use-benchmarks.md` - Cost Per Use Benchmarks: What Is Good Value for Every Category?
- `cost-per-use-electronics.md` - Cost Per Use for Electronics: Is That Gadget Really Worth It?
- `cost-per-wear-calculator.md` - Cost Per Wear: How to Calculate Whether That Outfit Is Worth It
- `best-cost-per-use-items.md` - The Best Cost Per Use Items: 20 Purchases That Pay for Themselves

### Impulse Buying (7 posts)
- `how-to-stop-impulse-buying.md` - How to Stop Impulse Buying: 12 Proven Strategies That Actually Work
- `psychology-of-impulse-buying.md` - The Psychology of Impulse Buying: Why We Buy Things We Don't Need
- `signs-you-are-impulse-buyer.md` - 10 Signs You Are an Impulse Buyer (and How to Fix It)
- `true-cost-of-impulse-buying.md` - The True Cost of Impulse Buying: How Small Purchases Add Up
- `impulse-buying-vs-emotional-spending.md` - Impulse Buying vs Emotional Spending: Understanding the Difference
- `social-media-impulse-buying.md` - How Social Media Fuels Impulse Buying (and How to Protect Your Wallet)
- `72-hour-rule-impulse-buying.md` - The 72-Hour Rule: How a Simple Waiting Period Saves You Thousands

### No Spend Challenges (6 posts)
- `no-spend-january-guide.md` - No Spend January: The Complete Guide to Starting Your Year Right
- `no-spend-february-2026.md` - No Spend February 2026: Short Month, Big Savings
- `no-spend-week-challenge.md` - No Spend Week Challenge for Beginners: Save Money in 7 Days
- `no-spend-challenge-rules.md` - No Spend Challenge Rules: How to Set Up Your Own Money-Free Month
- `30-day-no-spend-challenge.md` - 30-Day No Spend Challenge: Day-by-Day Guide
- `lessons-from-no-spend-challenges.md` - What I Learned from 6 Months of No Spend Challenges

### Budgeting & Saving (5 posts)
- `50-30-20-budget-rule.md` - 50/30/20 Budget Rule: A Simple Framework for Your Money
- `save-money-everyday-purchases.md` - How to Save Money on Everyday Purchases Without Feeling Deprived
- `money-saving-challenges.md` - 15 Money-Saving Challenges to Try This Year
- `sinking-fund-method.md` - The Sinking Fund Method: How to Budget for Big Purchases
- `new-year-financial-reset.md` - New Year Financial Reset: Audit Your Spending and Start Fresh

### Smart Shopping (6 posts)
- `mindful-spending-guide.md` - Mindful Spending: How to Buy Less but Better
- `how-much-spend-on-clothes.md` - How Much Should You Spend on Clothes? A Cost Per Use Approach
- `how-to-compare-products.md` - How to Compare Products Before You Buy: A Smarter Framework
- `sale-psychology-discounts.md` - Sale Psychology: Why 70% Off Doesn't Always Mean a Good Deal
- `black-friday-survival-guide.md` - Black Friday Survival Guide: How to Spot Real Deals and Avoid Traps
- `minimalist-shopping-list.md` - The Minimalist Shopping List: Buy Only What Adds Value

### App Features (4 posts)
- `introducing-skip-or-buy-app.md` - Introducing Skip or Buy: The App That Calculates the Real Cost of Everything
- `5-ways-use-skip-or-buy.md` - 5 Ways to Use Skip or Buy to Save Money Every Week
- `compare-mode-guide.md` - Compare Mode: How to Put Two Products Head to Head
- `worth-it-date-feature-explained.md` - How the Worth It Date Feature Helps You Track Purchase Value
