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
- [ ] Features: Some headers Main Page
- [ ] Features: Upload Courses list
- [ ] Features: Upload Course
- [ ] Features: Uploaded Course - stats
- [ ] Features: Uploaded Course - edit course
- [ ] Features: Courses list row
- [ ] Features: Courses Page
- [ ] Features: Course page - video
- [ ] Features: Course page - list of videos
- [ ] Features: Course page - comments
- [ ] Improve GUI: Styling
- [ ] SetUp Testing: Jest, Cypress
- [ ] SetUp CI/CD: Github Actions
- [ ] SetUp Mailing: SendGrid
- [ ] SetUp Cache: Redis, Upstash (?)

## Upgrade commands:

### @next:

`npm install @vidstack/react@next`

### @latest:

`npm install @prisma/client@latest @uploadthing/react@latest next@latest react@latest react-dom@latest tailwindcss-animate@latest uploadthing@latest @next/bundle-analyzer@latest @next-auth/prisma-adapter@latest @trpc/client@latest @trpc/next@latest @trpc/react-query@latest @trpc/server@latest`

### dev with @latest:

`npm install --save-dev @types/node@latest @types/react@latest @types/react-dom@latest autoprefixer@latest eslint@latest eslint-config-next@latest postcss@latest prisma@latest tailwindcss@latest typescript@latest`

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