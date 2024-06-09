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
- [x] SetUp Auth: NextAuth.js
- [x] SetUp State: Trpc, Zod, Tanstack Query
- [x] SetUp GUI: Shadcn/ui, Sonner (Toasts), Tailwind CSS, Swiper
- [x] SetUp Payments: Stripe
- [x] Fix: Decimal price type issue (price should be Int \* 100, not decimal)
- [x] Features: Login/Logout context
- [x] Features: Layout (Navbar, Footer)
- [x] Features: Meta data
- [x] Refactor: Change Database provider to Supabase https://supabase.com/partners/integrations/prisma
- [x] Features: Some headers Main Page
- [x] Features: Admin access control
- [x] Features: Upload Course admin page
- [x] Features: Upload Courses list
- [x] Features: Courses list row
- [x] Security: Add Auth Guards to Creator and Admin Pages.
- [x] Features: Uploaded Course - edit course - backend
- [x] Features: Courses Page - backend MVP
- [x] Features: Course page - video - backend MVP
- [x] Features: Course page - list of videos - backend MVP
- [x] Features: Admin Panel - delete owned courses
- [x] Fix: Fixed currency
- [x] Features: Marketplace - create session for buying course
- [x] Features: Create Course - change video name, description and order
- [x] Features: Delete data in uploadthing
- [x] Features: Course page - dont load video, if subchapter has no video
- [x] Features: Course page - reviews - backend
- [x] Features: Course page - reviews - add info about reviewer
- [x] Bug: Fix apos bug
- [x] Refactor: Fix json types in trpc
- [x] Styles: Add basic styles to all pages
- [x] Features: Auth with login and password and email confirmation
- [x] Bug: Adding chapters error
- [x] SetUp Testing: Jest, Playwright
- [x] Features: Course page - reviews - create use context for reviews
- [x] Refactor: Undo all strings to correct types
- [x] Features: nav - fix gap between mobile and desktop version
- [x] Update all dependencies

### V 0.2

- [-] Refactor: Clerk: The prop "afterSignInUrl" is deprecated and should be replaced with the new "fallbackRedirectUrl" or "forceRedirectUrl" props instead.
Reason: Clerk bug
- [-] Refactor: Third-party cookie will be blocked. Learn more in the Issues tab.
Reason: Clerk bug
- [x] Refactor: The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
- [x] Feature: auto upload image to course
- [x] Feature: Save course Loading icon

### V 0.3
- [x] Feature: Edit modals should be closed after save
- [x] Features: Edit SubChapter as modals
- [x] Cleanup: Delete subchapter edit page
- [x] Features: Add sub nav to admin and creator layout in mobile version
- [ ] Deploy: Check build on Vercel

### V 0.X
- [ ] Features: vercel speed-insights
- [ ] Features: vercel analytics

- [ ] Features: Walk by site and fix Styles

- [ ] Features: Creator Panel - List of courses - as table
- [ ] Styles: Fix font colors
- [ ] Features: Admin - list of courses should be table and should be deletable (deep delete)
- [ ] Features: Tables with pagination
- [ ] Features: Universal Delete and Edit buttons with modals
- [ ] Features: Courses List with pagination
- [ ] Features: Delete data in stripe, when course is deleted
- [ ] Fix: Images should have default ratio 16:9
- [ ] Fix: Video ratio for fill page
- [ ] Fix: Creator Dashboard correct rating calculate
- [ ] SetUp Cache: Redis, Upstash (?)
- [ ] SetUp Logs: Add logs to the app
- [ ] Feature: when u end one subchapter, then is auto redirect to next after X seconds.
- [ ] Feature: Adding files to Course
- [ ] Feature: Subchapter edited by modal
- [ ] Feature: Subchapter - add video modal
- [ ] Big Feature: Add user progress in course

### V 0.X

- [ ] Features: Self implemented auth to be unreliant on third party
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

## Dont update:

## Wait with updates:

- @uploadthing/react": "^6.6.0" -> wait for fix first bugs
-  uploadthing@latest -> wait for fix first bugs
- "eslint": "^8.57.0", -> wait for fix bugs from version 9

## @next updates

```
bun add @vidstack/react@next
```

## Deps

```
bun add @clerk/localizations@latest @clerk/nextjs@latest @hello-pangea/dnd@latest @hookform/resolvers@latest @next-auth/prisma-adapter@latest @next/bundle-analyzer@latest @prisma/client@latest @radix-ui/react-avatar@latest @radix-ui/react-checkbox@latest @radix-ui/react-dialog@latest @radix-ui/react-dropdown-menu@latest @radix-ui/react-label@latest @radix-ui/react-progress@latest @radix-ui/react-radio-group@latest @radix-ui/react-select@latest @radix-ui/react-slot@latest @radix-ui/react-switch@latest @radix-ui/react-tabs@latest @trpc/client@latest @trpc/next@latest @trpc/react-query@latest @trpc/server@latest bcrypt@latest class-variance-authority@latest clsx@latest date-fns@latest lucide-react@latest next@latest next-themes@latest react@latest react-beautiful-dnd@latest react-dom@latest react-hook-form@latest recoil@latest sonner@latest stripe@latest superjson@latest svix@latest swiper@latest tailwind-merge@latest tailwindcss-animate@latest  zod@latest
```

## DevDeps

```
bun add --dev @playwright/test@latest @testing-library/react@latest @types/bcrypt@latest @types/bun@latest @types/node@latest @types/react@latest @types/react-beautiful-dnd@latest @types/react-dom@latest @vitejs/plugin-react@latest autoprefixer@latest eslint@latest eslint-config-next@latest jsdom@latest postcss@latest prisma@latest tailwindcss@latest typescript@latest vite-tsconfig-paths@latest vitest@latest
```
