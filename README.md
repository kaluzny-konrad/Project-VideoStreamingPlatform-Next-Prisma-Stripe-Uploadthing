# Video Streaming Platform on Next.js

## Tech stack

1. Next.js
2. Video hosting: Uploadthing
3. Video player: Video.js
4. Authentication: NextAuth.js
5. Database: Prisma, Mongo, PlanetScale
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
- [ ] SetUp Auth: NextAuth.js
- [ ] SetUp State: Trpc, Zod, Tanstack Query
- [ ] SetUp GUI: Shadcn/ui, Sonner (Toasts), Tailwind CSS
- [ ] SetUp Payments: Stripe
- [ ] SetUp Cache: Redis, Upstash
- [ ] SetUp Mailing: SendGrid
- [ ] Features: Layout
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

## Upgrade commands:

### @next:

`npm install @vidstack/react@next`

### @latest:

`npm install @prisma/client@latest @uploadthing/react@latest next@latest react@latest react-dom@latest tailwindcss-animate@latest uploadthing@latest @next/bundle-analyzer@latest @next-auth/prisma-adapter@latest`

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
