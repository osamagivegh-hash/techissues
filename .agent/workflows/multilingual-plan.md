---
description: Multilingual Tech Blog - Implementation Plan
---

# Multilingual Tech Blog Implementation Plan

## Phase 1: Database Model Updates
1. Add `language` field to Post model ("ar" | "en")
2. Add `language` field to Category model
3. Update seed script to create AR and EN content
4. Create migration/update existing data

## Phase 2: Routing Restructure
1. Create `/app/[lang]` dynamic segment
2. Move all public pages under `[lang]`:
   - `/app/[lang]/page.tsx` (home)
   - `/app/[lang]/category/[slug]/page.tsx`
   - `/app/[lang]/posts/[slug]/page.tsx`
   - `/app/[lang]/search/page.tsx`
   - `/app/[lang]/about/page.tsx`
   - etc.
3. Create middleware to redirect `/` to `/ar`
4. Create language detection/switching logic

## Phase 3: Admin Dashboard Updates
1. Split posts management:
   - `/admin/posts/ar` (Arabic posts)
   - `/admin/posts/en` (English posts)
2. Split categories management:
   - `/admin/categories/ar`
   - `/admin/categories/en`
3. Update dashboard stats to show per-language metrics
4. Update all CRUD operations to filter by language

## Phase 4: Components & UI
1. Create LanguageSwitcher component
2. Update Header to accept language prop
3. Create language-aware navigation links
4. Ensure RTL/LTR switching works properly
5. Update all client components for language context

## Phase 5: SEO & Metadata
1. Update sitemap.ts to generate per-language sitemaps
2. Add hreflang tags for alternate languages
3. Update meta tags per language
4. Create language-specific robots.txt rules

## Phase 6: Content & Translations
1. Seed database with sample AR and EN content
2. Create translation helper utilities
3. Update all static text to support both languages

## Phase 7: Testing & Polish
1. Test all routes in both languages
2. Verify RTL/LTR switching
3. Test admin CRUD for both languages
4. Verify SEO implementation
5. Test language switching functionality
