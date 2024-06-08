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

## Examples

## Work progress

### V 0.1
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
- [X] Features: Course page - reviews - backend
- [X] Features: Course page - reviews - add info about reviewer
- [X] Bug: Fix apos bug
- [X] Refactor: Fix json types in trpc
- [X] Styles: Add basic styles to all pages
- [X] Features: Auth with login and password and email confirmation
- [X] Bug: Adding chapters error
- [X] SetUp Testing: Jest, Playwright
- [X] Features: Course page - reviews - create use context for reviews
- [X] Refactor: Undo all strings to correct types
- [X] Features: nav - fix gap between mobile and desktop version
- [X] Update all dependencies

### V 0.2
- [ ] Refactor: Clerk: The prop "afterSignInUrl" is deprecated and should be replaced with the new "fallbackRedirectUrl" or "forceRedirectUrl" props instead.
- [ ] Refactor: Third-party cookie will be blocked. Learn more in the Issues tab.
- [X] Refactor: The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
- [ ] Feature: auto upload image to course

### V 0.X
- [ ] Features: Creator Panel - List of courses - as table
- [ ] Features: Admin - list of courses should be table and should be deletable (deep delete)
- [ ] Features: Delete data in stripe, when course is deleted
- [ ] Fix: Images should have default ratio 16:9
- [ ] Fix: Creator Dashboard correct rating calculate
- [ ] SetUp Cache: Redis, Upstash (?)
- [ ] SetUp Logs: Add logs to the app
- [ ] Feature: when u end one subchapter, then is auto redirect to next after X seconds.
- [ ] Feature: Edit modals should be closed after save
- [ ] Feature: Adding files to Course
- [ ] Feature: Subchapter edited by modal
- [ ] Feature: Subchapter - add video modal
- [ ] Big Feature: Add user progress in course

### V 0.X
- [ ] Features: Course page - questions to subChapters - backend
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


# Tests

## Playright

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - .\playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭


# Updates bun
## Deps

```
bun add @clerk/localizations@latest @clerk/nextjs@latest @hello-pangea/dnd@latest @hookform/resolvers@latest @next-auth/prisma-adapter@latest @next/bundle-analyzer@latest @prisma/client@latest @radix-ui/react-avatar@latest @radix-ui/react-checkbox@latest @radix-ui/react-dialog@latest @radix-ui/react-dropdown-menu@latest @radix-ui/react-label@latest @radix-ui/react-progress@latest @radix-ui/react-radio-group@latest @radix-ui/react-select@latest @radix-ui/react-slot@latest @radix-ui/react-switch@latest @radix-ui/react-tabs@latest @trpc/client@latest @trpc/next@latest @trpc/react-query@latest @trpc/server@latest @uploadthing/react@latest @vidstack/react@latest bcrypt@latest class-variance-authority@latest clsx@latest date-fns@latest lucide-react@latest next@latest next-themes@latest react@latest react-beautiful-dnd@latest react-dom@latest react-hook-form@latest recoil@latest sonner@latest stripe@latest superjson@latest svix@latest swiper@latest tailwind-merge@latest tailwindcss-animate@latest uploadthing@latest zod@latest
```

## DevDeps

```
bun add --dev @playwright/test@latest @testing-library/react@latest @types/bcrypt@latest @types/bun@latest @types/node@latest @types/react@latest @types/react-beautiful-dnd@latest @types/react-dom@latest @vitejs/plugin-react@latest autoprefixer@latest eslint@latest eslint-config-next@latest jsdom@latest postcss@latest prisma@latest tailwindcss@latest typescript@latest vite-tsconfig-paths@latest vitest@latest
```