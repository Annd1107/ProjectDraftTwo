# Next.js Migration Guide for TemtseenPortal

## ✅ What's Been Completed

### 1. Core Next.js Structure
- `/app/layout.tsx` - Root layout with all context providers
- `/app/page.tsx` - Home page
- `/app/about/page.tsx` - About page  
- `/app/login/page.tsx` - Login page
- `/components/Navigation.tsx` - Main navigation component
- `/next.config.js` - Next.js configuration

### 2. Updated Context Providers
All context files in `/lib` now have `"use client"` directive:
- `auth-context.tsx`
- `tournament-context.tsx`
- `language-context.tsx`
- `theme-context.tsx`
- `achievement-context.tsx`

### 3. Logo Updated
- Changed from figma:asset to Unsplash PNG image
- Applied to Navigation and Home page
- URL: `https://images.unsplash.com/photo-1640356872989-e5a9cdcdd653...`

## 🔄 Remaining Pages to Convert

For each of the following pages, follow this pattern:

### Pattern for Creating Next.js Pages:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// ... other imports from the original file

export default function PageName() {
  const router = useRouter();
  // ... copy component logic from original file
  
  // Replace navigate("/path") with router.push("/path")
  // Replace <Link to="/path"> with <Link href="/path">
  
  return (
    // ... copy JSX from original file
  );
}
```

### Pages Needed:

1. **`/app/signup/page.tsx`**
   - Source: `/components/Signup.tsx`
   - Changes: Add "use client", use `useRouter` instead of `useNavigate`, `Link href` instead of `to`

2. **`/app/student/page.tsx`**
   - Source: `/components/StudentDashboard.tsx`
   - Changes: Same as above

3. **`/app/organizer/page.tsx`**
   - Source: `/components/OrganizerDashboard.tsx`
   - Changes: Same as above

4. **`/app/tournament/[id]/page.tsx`**
   - Source: `/components/TournamentDetail.tsx`
   - Changes: Use `useParams()` from "next/navigation" to get the `id` parameter
   - Example:
   ```tsx
   "use client";
   import { useParams } from "next/navigation";
   
   export default function TournamentDetail() {
     const params = useParams();
     const id = params.id as string;
     // ... rest of component
   }
   ```

5. **`/app/profile/page.tsx`**
   - Source: `/components/Profile.tsx`

6. **`/app/notifications/page.tsx`**
   - Source: `/components/Notifications.tsx`

7. **`/app/achievements/page.tsx`**
   - Source: `/components/Achievements.tsx`

8. **`/app/not-found.tsx`**
   - Source: `/components/NotFound.tsx`
   - This is a special Next.js file for 404 pages

## 🔍 Find & Replace Checklist

For each component file being converted to a page:

### 1. Add at the top:
```tsx
"use client";
```

### 2. Update imports:
```tsx
// OLD:
import { Link, useNavigate } from "react-router";

// NEW:
import Link from "next/link";
import { useRouter } from "next/navigation";
```

### 3. Update hooks:
```tsx
// OLD:
const navigate = useNavigate();

// NEW:
const router = useRouter();
```

### 4. Update navigation calls:
```tsx
// OLD:
navigate("/dashboard");

// NEW:
router.push("/dashboard");
```

### 5. Update Link components:
```tsx
// OLD:
<Link to="/about">About</Link>

// NEW:
<Link href="/about">About</Link>
```

### 6. For dynamic routes (e.g., tournament detail):
```tsx
// OLD:
import { useParams } from "react-router";
const { id } = useParams();

// NEW:
import { useParams } from "next/navigation";
const params = useParams();
const id = params.id as string;
```

### 7. Remove figma:asset imports:
```tsx
// OLD:
import logo from "figma:asset/f903ce71512caff8e98ba718ecc02ebdf4aae725.png";

// NEW:
// Use the Unsplash URL directly or Next.js Image component
const logoUrl = "https://images.unsplash.com/photo-1640356872989-e5a9cdcdd653...";
```

## 🗂️ File Structure Comparison

### Before (React Router):
```
/App.tsx
/routes.tsx
/components/
  Root.tsx
  Home.tsx
  Login.tsx
  Signup.tsx
  StudentDashboard.tsx
  OrganizerDashboard.tsx
  TournamentDetail.tsx
  About.tsx
  Profile.tsx
  Notifications.tsx
  Achievements.tsx
  NotFound.tsx
```

### After (Next.js):
```
/app/
  layout.tsx (replaces Root.tsx wrapper)
  page.tsx (Home)
  about/page.tsx
  login/page.tsx
  signup/page.tsx
  student/page.tsx
  organizer/page.tsx
  tournament/[id]/page.tsx
  profile/page.tsx
  notifications/page.tsx
  achievements/page.tsx
  not-found.tsx
/components/
  Navigation.tsx (extracted from Root.tsx)
  PaymentModal.tsx (unchanged)
  ... other reusable components
```

## 📦 Package.json Dependencies

Your package.json should include:

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "latest"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## 🎨 Styling

- Tailwind CSS configuration remains unchanged
- `/styles/globals.css` works as-is
- All dark mode classes continue to work

## ✨ Features Preserved

- ✅ Bilingual support (Mongolian/English)
- ✅ Dark/Light mode
- ✅ User authentication (Student/Organizer)
- ✅ Tournament management
- ✅ Payment modal with QPay
- ✅ PDF upload for preparation materials
- ✅ Achievements system
- ✅ Notifications
- ✅ Profile management
- ✅ All data persistence (localStorage/cookies)

## 🚀 Running the App

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## ⚠️ Important Notes

1. All context providers MUST have "use client" directive
2. Any component using hooks MUST have "use client" directive
3. Server components don't need "use client" (but we're using client components for interactivity)
4. The Navigation component is imported in layout.tsx and rendered for all pages
5. Delete old `/App.tsx` and `/routes.tsx` files after migration is complete

## 📝 Testing Checklist

After converting all pages, test:
- [ ] Home page loads
- [ ] Navigation works (all links)
- [ ] Login/Signup flow
- [ ] Student dashboard
- [ ] Organizer dashboard
- [ ] Tournament creation
- [ ] Tournament registration
- [ ] Payment modal
- [ ] PDF upload/download
- [ ] Profile editing
- [ ] Notifications
- [ ] Achievements page
- [ ] Dark mode toggle
- [ ] Language switcher
- [ ] Data persistence (refresh page)

## 🎯 Next Steps

1. Create the remaining 6 page files listed above
2. Test all functionality
3. Delete old React Router files (`/App.tsx`, `/routes.tsx`, `/components/Root.tsx`)
4. Update README with Next.js instructions
5. Deploy to Vercel or your preferred hosting
