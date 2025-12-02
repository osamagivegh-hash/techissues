# How to Add Posts That Show on Home Page

## ✅ FIXED: Posts Now Appear on Home Page!

### The Problem
Posts created through the admin dashboard weren't showing on the home page.

### The Cause
The admin forms were missing the **language field**. Posts were being created without a language (`ar` or `en`), and the home page filters posts by language, so they didn't appear.

---

## 📝 How to Create Posts (Step-by-Step)

### 1. **Login to Admin**
- Go to: `/admin/login`
- Enter your credentials

### 2. **Create New Post**
- Go to: `/admin/posts`
- Click **"مقال جديد"** (New Post)

### 3. **Fill in ALL Required Fields**

#### ✅ **Language (اللغة)** - **NEW FIELD!**
- **العربية** (Arabic) - For Arabic posts
- **English** - For English posts
- **Default**: Arabic

#### ✅ **Title (العنوان)**
- Enter your post title
- Slug will be auto-generated

#### ✅ **Category (القسم)**
Choose one of:
- **البرمجة** (Programming) - `programming`
- **المشاكل التقنية** (Tech Issues) - `tech-issues`
- **مراجعات الأجهزة** (Device Reviews) - `device-reviews`

#### ✅ **Excerpt (الملخص)**
- Short summary (max 300 characters)
- This appears on the home page cards

#### ✅ **Cover Image (صورة الغلاف)**
- Enter image URL
- Example: `https://images.unsplash.com/photo-...`

#### ✅ **Content (المحتوى)**
- Full article content
- You can use HTML for formatting

#### ✅ **Status (الحالة)** - **IMPORTANT!**
- **مسودة** (Draft) - Won't show on home page
- **منشور** (Published) - **SELECT THIS** to show on home page

### 4. **Click "حفظ المقال" (Save Post)**

---

## 🏠 Where Posts Appear

Posts will appear on the home page in their respective sections:

### Arabic Posts (`/ar`)
- **Programming Section**: Shows latest 3 Arabic programming posts
- **Tech Issues Section**: Shows latest 3 Arabic tech issues posts
- **Device Reviews Section**: Shows latest 3 Arabic device reviews posts

### English Posts (`/en`)
- **Programming Section**: Shows latest 3 English programming posts
- **Tech Issues Section**: Shows latest 3 English tech issues posts
- **Device Reviews Section**: Shows latest 3 English device reviews posts

---

## ✅ Checklist for Posts to Appear

Make sure your post has:
- [x] **Language** selected (ar or en)
- [x] **Category** selected (programming, tech-issues, or device-reviews)
- [x] **Status** set to "منشور" (published)
- [x] **Title** filled in
- [x] **Excerpt** filled in
- [x] **Content** filled in
- [x] **Cover Image** URL provided

---

## 🔧 Editing Existing Posts

If you have posts that aren't showing:

1. Go to `/admin/posts`
2. Click **"تعديل"** (Edit) on the post
3. **Set the Language** (ar or en)
4. **Set Status** to "منشور" (published)
5. **Save**

The post will now appear on the home page!

---

## 📊 Quick Reference

| Field | Required | Options | Default |
|-------|----------|---------|---------|
| Language | ✅ Yes | ar, en | ar |
| Category | ✅ Yes | programming, tech-issues, device-reviews | - |
| Status | ✅ Yes | draft, published | draft |
| Title | ✅ Yes | Text | - |
| Excerpt | ✅ Yes | Max 300 chars | - |
| Content | ✅ Yes | HTML supported | - |
| Cover Image | ✅ Yes | Image URL | - |
| Tags | ❌ No | Comma-separated | - |

---

## 🎯 Example: Creating an Arabic Programming Post

1. **Language**: العربية (ar)
2. **Category**: البرمجة (programming)
3. **Title**: "مقدمة إلى React"
4. **Excerpt**: "تعلم أساسيات React في هذا المقال الشامل"
5. **Content**: Full article in Arabic
6. **Cover Image**: https://images.unsplash.com/photo-...
7. **Status**: منشور (published)
8. **Save**

✅ This post will appear in the **Programming section** on `/ar` (Arabic home page)

---

**Status**: ✅ **FIXED AND DEPLOYED**

All new posts created with the language field will now appear correctly on the home page!
