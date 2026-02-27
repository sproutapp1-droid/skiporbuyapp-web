# Skip Or Buy - Project Notes

## App Status

The app is **live on iOS**. The App Store link is: `https://apps.apple.com/us/app/skip-or-buy-cost-per-use/id6759465475`

**Android is NOT released yet.** The website maintains an **Android waitlist** (via `/api/interest` endpoint) for users interested in the Android version. The Android waitlist appears in:
- The **Hero** and **CTA** sections (below the iOS App Store badge)
- The **Header** (secondary "Android Waitlist" button with dropdown form)
- The **ComingSoon** popup (auto-shows after 3s, Android-specific messaging)

The `StoreBadges` component shows the iOS App Store badge (real link) and a dimmed Google Play "Coming Soon" badge. The `WaitlistForm` component still exists but is no longer used in Hero/CTA (they have inline Android waitlist forms instead).

### On Android Release TODO
- Hook up the **Google Play Store** link in `StoreBadges` (`src/components/StoreBadges.tsx`) — currently shows as "Coming Soon" with no link.
- Remove or repurpose the Android waitlist forms in Hero, CTA, and Header.
- Remove or repurpose the `ComingSoon` popup.
- Update dictionary `comingSoon.*` and `hero.androidComingSoon` keys across all 8 language files.
- The `WaitlistForm` component can be removed if no longer needed.

## App Description & Features

### What Skip Or Buy Does
You're in the store. You're holding something. You're thinking: "Is this actually worth it?" Skip Or Buy gives you the answer in seconds. Enter the price, pick a category, and instantly see the real cost per use — with a clear Buy, Think Twice, or Skip verdict. No guesswork. No guilt. Just the math.

### How It Works
1. Enter the price
2. Pick a category (clothes, tech, kitchen, fitness, furniture, or your own)
3. See your cost per use, a 0-100 value score, and a clear verdict

### What Makes It Different
Most budgeting apps ask: "Can you afford this?" Skip Or Buy asks: "Is this worth what you'll pay per use?"
- A £200 jacket worn 3x/week for 2 years = £0.64 per wear (less than a coffee — Buy it)
- A £50 gadget used twice then forgotten = £25 per use (Skip it)
- The price tag lies. The cost per use tells the truth.

### Features
- **Cost Per Use Calculator** — Enter any price, frequency, and lifespan. Get the real number instantly.
- **Usage Logging** — Log every time you use an item. Watch your real cost per use drop with each use.
- **"Worth It By" Date** — See exactly when a purchase pays for itself based on your actual usage rate.
- **Item Photos** — Add photos to your saved items so you always know what you're tracking.
- **Smart Benchmarks** — Built-in data for clothing, electronics, kitchen, fitness, furniture, and more.
- **Buy / Think Twice / Skip** — A clear, colour-coded verdict so you never second-guess.
- **Value Score** — 0 to 100 scale. See exactly how good (or bad) a purchase is at a glance.
- **Side-by-Side Compare** — Torn between two options? Compare them head to head and see which one wins on value.
- **Value Diary** — Save every purchase. Log uses, add photos, and track your cost per use as it changes over time.
- **Share Cards** — Generate beautiful cards with your verdict to share with friends or post on social media.
- **Custom Benchmarks** — Edit thresholds for any category. Set your own standards for what counts as a good deal.
- **Works Offline** — No internet needed. No account required. No data ever leaves your device.
- **Dark & Light Mode** — Automatic or manual.
- **8 Languages** — English, French, German, Spanish, Italian, Japanese, Simplified Chinese, Traditional Chinese.

### Pricing & Privacy
- One-time purchase. No subscriptions. No in-app purchases. No ads. No tracking.
- Everything is stored locally on your device. Nothing is uploaded, shared, or tracked.

### App Store Pricing by Region (source: `.claude/Current Price May Adjust Automatically.csv`)
Key markets:
| Region | Currency | Price |
|--------|----------|-------|
| United States | USD | $4.99 |
| United Kingdom | GBP | £4.99 |
| EU (Germany, France, Italy, Spain, etc.) | EUR | €5.99 |
| Canada | CAD | C$6.99 |
| Australia | AUD | A$7.99 |
| Japan | JPY | ¥800 |
| China mainland | CNY | ¥38 |
| India | INR | ₹499 |
| Brazil | BRL | R$29.90 |
| South Korea | KRW | ₩6,600 |
| Mexico | MXN | $99 |
| Taiwan | TWD | NT$150 |
| Switzerland | CHF | CHF 4.00 |
| Sweden | SEK | 69 kr |
| Norway | NOK | 59 kr |
| Denmark | DKK | 39 kr |
| New Zealand | NZD | NZ$9.99 |
| Singapore | SGD | S$6.98 |
| Hong Kong | HKD | HK$38 |
| South Africa | ZAR | R99.99 |
| Turkey | TRY | ₺249.99 |
| Poland | PLN | 24.99 zł |

Most other countries default to USD $4.99 or $5.99. Prices marked "May Adjust Automatically: Y" can change with exchange rates. UK price (£4.99) is fixed (N).

### Target Audience
- Impulse buyers who want to make smarter decisions
- Minimalists who only want to own things that earn their place
- Budget-conscious shoppers who want hard numbers, not feelings
- Anyone tired of buying things that collect dust

## Blog Posts (73 articles)

All blog posts are in `src/content/blog/` as markdown files. The custom markdown renderer is in `src/components/blog/BlogRenderer.tsx` and supports: headings, bold/italic, links, lists, blockquotes, inline code, horizontal rules, tables, and custom blocks (:::stats, :::takeaway, :::blogcta, :::calculator, :::checklist).

### Cost Per Use (8 posts)
- `what-is-cost-per-use.md` - What Is Cost Per Use? The Simple Formula That Changes How You Shop
- `how-to-calculate-cost-per-use.md` - How to Calculate Cost Per Use for Anything: Step-by-Step
- `cost-per-use-vs-price-tag.md` - Cost Per Use vs Price Tag: Why Cheap Isn't Always Better
- `cost-per-use-benchmarks.md` - Cost Per Use Benchmarks: What Is Good Value for Every Category?
- `cost-per-use-electronics.md` - Cost Per Use for Electronics: Is That Gadget Really Worth It?
- `cost-per-wear-calculator.md` - Cost Per Wear: How to Calculate Whether That Outfit Is Worth It
- `best-cost-per-use-items.md` - The Best Cost Per Use Items: 20 Purchases That Pay for Themselves
- `price-per-wear-shoes.md` - Price Per Wear for Shoes: How to Know If Those Shoes Are Actually Worth It

### Impulse Buying (13 posts)
- `how-to-stop-impulse-buying.md` - How to Stop Impulse Buying: 12 Proven Strategies That Actually Work
- `psychology-of-impulse-buying.md` - The Psychology of Impulse Buying: Why We Buy Things We Don't Need
- `signs-you-are-impulse-buyer.md` - 10 Signs You Are an Impulse Buyer (and How to Fix It)
- `true-cost-of-impulse-buying.md` - The True Cost of Impulse Buying: How Small Purchases Add Up
- `impulse-buying-vs-emotional-spending.md` - Impulse Buying vs Emotional Spending: Understanding the Difference
- `social-media-impulse-buying.md` - How Social Media Fuels Impulse Buying (and How to Protect Your Wallet)
- `72-hour-rule-impulse-buying.md` - The 72-Hour Rule: How a Simple Waiting Period Saves You Thousands
- `spending-triggers-identify-control.md` - Spending Triggers: How to Identify Yours and Take Control of Your Money
- `amazon-impulse-purchases-avoid.md` - How to Stop Buying Things You Don't Need on Amazon: 10 Practical Tips
- `shopping-addiction-signs-help.md` - Shopping Addiction: 12 Warning Signs and How to Get Your Spending Under Control
- `dopamine-shopping-retail-therapy.md` - Dopamine Shopping: Why Buying Feels So Good (and How to Break the Cycle)
- `haul-regret-fast-fashion.md` - Haul Regret: Why Your Shopping Hauls Are Costing More Than You Think
- `how-to-stop-buying-things.md` - How to Stop Buying Things You Don't Need: The Complete Guide

### No Spend Challenges (7 posts)
- `no-spend-january-guide.md` - No Spend January: The Complete Guide to Starting Your Year Right
- `no-spend-february-2026.md` - No Spend February 2026: Short Month, Big Savings
- `no-spend-week-challenge.md` - No Spend Week Challenge for Beginners: Save Money in 7 Days
- `no-spend-challenge-rules.md` - No Spend Challenge Rules: How to Set Up Your Own Money-Free Month
- `30-day-no-spend-challenge.md` - 30-Day No Spend Challenge: Day-by-Day Guide
- `lessons-from-no-spend-challenges.md` - What I Learned from 6 Months of No Spend Challenges
- `no-spend-challenge-results.md` - No Spend Challenge Results: How Much Do People Actually Save?

### Budgeting & Saving (13 posts)
- `50-30-20-budget-rule.md` - 50/30/20 Budget Rule: A Simple Framework for Your Money
- `save-money-everyday-purchases.md` - How to Save Money on Everyday Purchases Without Feeling Deprived
- `money-saving-challenges.md` - 15 Money-Saving Challenges to Try This Year
- `sinking-fund-method.md` - The Sinking Fund Method: How to Budget for Big Purchases
- `new-year-financial-reset.md` - New Year Financial Reset: Audit Your Spending and Start Fresh
- `needs-vs-wants-how-to-tell.md` - Needs vs Wants: How to Tell the Difference and Make Better Spending Decisions
- `lifestyle-creep-how-to-avoid.md` - Lifestyle Creep: What It Is and How to Stop Spending More as You Earn More
- `debt-free-living-spend-less.md` - Debt-Free Living: How Spending Less on Things You Don't Use Accelerates Your Journey
- `financial-minimalism-guide.md` - Financial Minimalism: How to Own Less and Have More
- `zero-based-budgeting-guide.md` - Zero-Based Budgeting for Beginners: Every Dollar Has a Job
- `frugal-living-tips.md` - Frugal Living Tips: 30 Ways to Spend Less Without Feeling Deprived
- `fire-movement-cost-per-use.md` - FIRE Movement Spending: How Cost Per Use Fits Into Financial Independence
- `subscription-audit-guide.md` - Subscription Audit: How to Find and Cancel Subscriptions You Don't Actually Use

### Smart Shopping (14 posts)
- `mindful-spending-guide.md` - Mindful Spending: How to Buy Less but Better
- `how-much-spend-on-clothes.md` - How Much Should You Spend on Clothes? A Cost Per Use Approach
- `how-to-compare-products.md` - How to Compare Products Before You Buy: A Smarter Framework
- `sale-psychology-discounts.md` - Sale Psychology: Why 70% Off Doesn't Always Mean a Good Deal
- `black-friday-survival-guide.md` - Black Friday Survival Guide: How to Spot Real Deals and Avoid Traps
- `minimalist-shopping-list.md` - The Minimalist Shopping List: Buy Only What Adds Value
- `capsule-wardrobe-cost-savings.md` - Capsule Wardrobe: How Much It Costs, How Much It Saves, and How to Build One
- `fast-fashion-vs-quality-clothes.md` - Fast Fashion vs Quality Clothes: The Real Cost Comparison (With Numbers)
- `save-money-on-groceries.md` - How to Save Money on Groceries: 20 Tips That Actually Work in 2026
- `decluttering-cost-per-use.md` - Decluttering and Cost Per Use: What Your Unused Stuff Really Cost You
- `buy-it-for-life-reddit.md` - Buy It for Life: Reddit's Favorite Durable Items and Their Cost Per Use
- `generic-vs-brand-name.md` - Generic vs Brand Name: When the Store Brand Is Actually Better Value
- `fashion-rental-cost-per-wear.md` - Renting vs Buying Clothes: Fashion Rental Cost Per Wear Analysis
- `secondhand-vs-new-cost-per-use.md` - Buying Secondhand vs New: A Cost Per Use Framework

### Value Mindset & Boots Theory (6 posts)
- `boots-theory-cost-per-use.md` - The Boots Theory: Why Buying Cheap Costs More (And How to Break the Cycle)
- `reframe-price-to-cost-per-use.md` - Stop Thinking About Price, Start Thinking About Cost Per Use
- `buy-it-for-life-cost-per-use.md` - Buy It for Life: 15 Items Where Spending More Saves You Thousands
- `cost-per-use-mindset-shift.md` - The Cost Per Use Mindset: How One Simple Calculation Changes Everything
- `buyers-remorse-how-to-avoid.md` - Buyer's Remorse: What It Is, Why It Happens, and 9 Ways to Avoid It
- `one-in-one-out-rule-spending.md` - The One In, One Out Rule: A Simple System to Stop Accumulating Stuff You Don't Use

### In-Store Decision Making (3 posts)
- `should-i-buy-this-checklist.md` - Should I Buy This? The 60-Second Checklist for Every Purchase
- `in-store-impulse-buying-tricks.md` - 8 In-Store Tricks That Make You Impulse Buy (And How to Beat Them)
- `is-it-worth-it-quiz.md` - Is It Worth It? How to Know in Under a Minute

### Seasonal & Trending (5 posts)
- `spring-wardrobe-cost-per-wear.md` - Spring Wardrobe Refresh: A Cost Per Wear Approach to Seasonal Shopping
- `gym-equipment-cost-per-use.md` - Home Gym Equipment: Cost Per Use Breakdown (Is It Cheaper Than a Membership?)
- `subscription-vs-buying-cost-per-use.md` - Subscribe or Buy? How to Calculate the Real Cost of Subscriptions vs Ownership
- `kitchen-appliances-worth-it.md` - Are Expensive Kitchen Appliances Worth It? A Cost Per Use Breakdown
- `baby-gear-cost-per-use.md` - Baby Gear: What's Actually Worth Buying New vs. Secondhand (Cost Per Use Guide)

### App Features (4 posts)
- `introducing-skip-or-buy-app.md` - Introducing Skip or Buy: The App That Calculates the Real Cost of Everything
- `5-ways-use-skip-or-buy.md` - 5 Ways to Use Skip or Buy to Save Money Every Week
- `compare-mode-guide.md` - Compare Mode: How to Put Two Products Head to Head
- `worth-it-date-feature-explained.md` - How the Worth It Date Feature Helps You Track Purchase Value
