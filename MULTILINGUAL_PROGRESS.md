# Multilingual Rebuild Progress

## ✅ Completed

### Core Infrastructure
1. **Database Models Updated**
   - ✅ Category model with `language` field ('ar' | 'en')
   - ✅ Post model with `language` field ('ar' | 'en')
   - ✅ Compound indexes for unique slugs per language

2. **Language System**
   - ✅ Created `/lib/i18n.ts` with translations and utilities
   - ✅ Type-safe language handling
   - ✅ RTL/LTR direction detection
   - ✅ Translation function

3. **Routing**
   - ✅ Created `middleware.ts` for language detection
   - ✅ Automatic redirect from `/` to `/ar`
   - ✅ Language validation in URL

4. **Layouts & Components**
   - ✅ Language-specific layout (`/app/[lang]/layout.tsx`)
   - ✅ Updated `Header` component with language switcher
   - ✅ Updated `Footer` component with language support

## 🔄 In Progress / Next Steps

### Public Pages (Need to Create)
All pages need to be created under `/app/[lang]/`:

1. **Home Page** - `/app/[lang]/page.tsx`
2. **Category Pages** - `/app/[lang]/category/[slug]/page.tsx`
3. **Post Pages** - `/app/[lang]/posts/[slug]/page.tsx`
4. **Search Page** - `/app/[lang]/search/page.tsx`
5. **Static Pages**:
   - `/app/[lang]/about/page.tsx`
   - `/app/[lang]/contact/page.tsx`
   - `/app/[lang]/privacy-policy/page.tsx`
   - `/app/[lang]/terms/page.tsx`

### Admin Dashboard (Need to Update)
1. Split posts management:
   - Create `/admin/posts/ar/page.tsx`
   - Create `/admin/posts/ar/new/page.tsx`
   - Create `/admin/posts/ar/[id]/edit/page.tsx`
   - Create `/admin/posts/en/page.tsx`
   - Create `/admin/posts/en/new/page.tsx`
   - Create `/admin/posts/en/[id]/edit/page.tsx`

2. Split categories management:
   - Create `/admin/categories/ar/page.tsx`
   - Create `/admin/categories/en/page.tsx`

3. Update dashboard home to show per-language stats

### API Routes (Need to Update)
All API routes need to support language filtering:
1. `/api/posts` - Add language query parameter
2. `/api/categories` - Add language query parameter
3. Update all CRUD operations to handle language

### Components (Need to Update/Create)
1. Update `PostCard` to accept language prop
2. Update `Pagination` to work with new URLs
3. Create new components as needed

### Database Migration
1. Update existing data to include language field (default 'ar')
2. Create new seed script with AR and EN content
3. Run migration

###SEO
1. Update sitemap for multilingual
2. Add hreflang tags
3. Language-specific metadata

## 📝 Notes

- Old single-language files remain in place
- New multilingual structure lives alongside
- Need to clean up old files once migration is complete
- Current site will break until all pieces are in place

## 🎯 Priority Order

1. Create home page for both languages
2. Create category & post pages
3. Update API routes
4. Create new seed data
5. Test thoroughly
6. Update admin dashboard
7. Clean up old files
