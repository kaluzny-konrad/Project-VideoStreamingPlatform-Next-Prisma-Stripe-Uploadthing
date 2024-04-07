# Video Streaming Platform on Next.js

## Tech stack

1. Next.js
2. Video hosting: Uploadthing
3. Video player: Video.js
4. Authentication: NextAuth.js
5. Database: Prisma, Mongo, Supabase
6. Styling: Tailwind CSS
7. Deployment: Vercel
8. Cache: Redis, Upstash
9. Payments: Stripe
10. GUI: Shadcn/ui, Sonner
11. Testing: Jest, Cypress
12. CI/CD: Github Actions
13. Mailing: SendGrid
14. State management: Zustand, TanStack Query, Zod, TRPC

## Work progress

- [x] Setup Next.js
- [x] SetUp Files infra: Prisma, Mongo, PlanetScale, UploadThing with Image component for start
- [x] SetUp Video infra: UploadThing with Video component
- [x] SetUp Deployment: Vercel
- [X] SetUp Auth: NextAuth.js
- [X] SetUp State: Trpc, Zod, Tanstack Query
- [X] SetUp GUI: Shadcn/ui, Sonner (Toasts), Tailwind CSS, Swiper
- [X] SetUp Payments: Stripe
- [X] Fix: Decimal price type issue (price should be Int * 100, not decimal)
- [X] Features: Login/Logout context
- [X] Features: Layout (Navbar, Footer)
- [X] Features: Meta data
- [X] Refactor: Change Database provider to Supabase https://supabase.com/partners/integrations/prisma
- [X] Features: Some headers Main Page
- [X] Features: Admin access control
- [X] Features: Upload Course admin page
- [X] Features: Upload Courses list
- [X] Features: Courses list row
- [X] Security: Add Auth Guards to Creator and Admin Pages.
- [X] Features: Uploaded Course - edit course - backend
- [X] Features: Courses Page - backend MVP
- [X] Features: Course page - video - backend MVP
- [X] Features: Course page - list of videos - backend MVP
- [X] Features: Admin Panel - delete owned courses
- [X] Fix: Fixed currency
- [X] Features: Marketplace - create session for buying course
- [X] Features: Create Course - change video name, description and order
- [X] Features: Delete data in uploadthing
- [X] Features: Course page - dont load video, if subchapter has no video
- [ ] Features: Course page - reviews - backend
- [ ] Features: nav - fix gap between mobile and desktop version
- [ ] Features: Course page - questions to subChapters - backend
- [ ] Features: Uploaded Course - stats - backend
- [ ] Features: Creator Panel - List of courses - backend
- [ ] Features: Admin Panel - deep delete backend
- [ ] Features: Delete data in stripe
- [ ] Styling: all pages
- [ ] SetUp Testing: Jest, Cypress
- [ ] SetUp CI/CD: Github Actions
- [ ] SetUp Mailing: SendGrid
- [ ] SetUp Cache: Redis, Upstash (?)
- [ ] SetUp Logs: Add logs to the app
- [ ] The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
- [ ] Update all dependencies

## Providers config:

### Prisma db on PlanetScale:

<https://app.planetscale.com/>

effect: DATABASE_URL in .env

### Uploadthing

1. <https://uploadthing.com/>
   then .env

### NextAuth.js:

1. Google Cloud Console secrets to .env:
   <https://console.cloud.google.com/>

- new project
- oauth client id:
  <https://console.cloud.google.com/apis/credentials/oauthclient>
- Web Application
- Javascript origin: <http://localhost:3000> (for local development)
- Redirect URI: <http://localhost:3000/api/auth/callback/google>

effect: secret to .env.local

### Stripe:

1. Create account and secret key:
<https://dashboard.stripe.com/>

2. Create webhook for `checkout.session.completed`

3. Test webhook with localtunnel.

effect: secret and webhook secret to .env.local