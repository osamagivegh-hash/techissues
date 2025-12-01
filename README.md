# مدونة التقنية - Tech Issues Blog

موقع محتوى كامل مع لوحة تحكم لإدارة المقالات والصور، متخصص في البرمجة والمشاكل التقنية ومراجعات الأجهزة.

## المميزات

### الموقع العام
- ✅ تصميم حديث ومتجاوب
- ✅ دعم كامل للغة العربية مع RTL
- ✅ صفحة رئيسية مع 3 أقسام (البرمجة، المشاكل التقنية، مراجعات الأجهزة)
- ✅ صفحات الأقسام مع ترقيم الصفحات
- ✅ صفحة المقال الفردي مع مقالات ذات صلة
- ✅ بحث في المقالات
- ✅ صفحات ثابتة (من نحن، اتصل بنا، سياسة الخصوصية، شروط الاستخدام)
- ✅ SEO محسّن (meta tags, Open Graph, sitemap, robots.txt)
- ✅ جاهز لـ Google AdSense

### لوحة التحكم
- ✅ تسجيل دخول آمن (JWT + HTTP-only cookies)
- ✅ لوحة تحكم مع إحصائيات
- ✅ إدارة كاملة للمقالات (CRUD)
- ✅ إدارة الأقسام (CRUD)
- ✅ إدارة الصور
- ✅ محرر نصوص لكتابة المقالات
- ✅ حالة المقال (مسودة / منشور)
- ✅ إنشاء slug تلقائي
- ✅ حساب وقت القراءة تلقائياً

## التقنيات المستخدمة

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Language**: العربية (RTL)

## المتطلبات

- Node.js 18 أو أحدث
- MongoDB (محلي أو MongoDB Atlas)

## التثبيت

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. إعداد قاعدة البيانات

تأكد من تشغيل MongoDB محلياً أو استخدم MongoDB Atlas.

قم بتحديث ملف `.env.local` بمعلومات الاتصال:

```env
MONGODB_URI=mongodb://localhost:27017/techissues
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. ملء قاعدة البيانات بالبيانات الأولية

```bash
npm run seed
```

هذا سينشئ:
- مستخدم مدير: `admin@techissues.com` / `admin123`
- 3 أقسام (البرمجة، المشاكل التقنية، مراجعات الأجهزة)
- 9 مقالات نموذجية

### 4. تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: `http://localhost:3000`

## الاستخدام

### الموقع العام
- الصفحة الرئيسية: `/`
- صفحة القسم: `/category/programming`
- صفحة المقال: `/posts/[slug]`
- البحث: `/search`
- الصفحات الثابتة: `/about`, `/contact`, `/privacy-policy`, `/terms`

### لوحة التحكم
- تسجيل الدخول: `/admin/login`
- لوحة التحكم: `/admin`
- المقالات: `/admin/posts`
- الأقسام: `/admin/categories`
- الصور: `/admin/images`

**بيانات الدخول الافتراضية:**
- البريد الإلكتروني: `admin@techissues.com`
- كلمة المرور: `admin123`

⚠️ **مهم**: غيّر كلمة المرور بعد أول تسجيل دخول!

## البنية

```
techissues/
├── app/
│   ├── admin/              # صفحات لوحة التحكم
│   ├── api/                # API Routes
│   ├── category/           # صفحات الأقسام
│   ├── posts/              # صفحات المقالات
│   ├── search/             # صفحة البحث
│   ├── about/              # صفحة من نحن
│   ├── contact/            # صفحة اتصل بنا
│   ├── privacy-policy/     # سياسة الخصوصية
│   ├── terms/              # شروط الاستخدام
│   ├── layout.tsx          # Layout رئيسي
│   ├── page.tsx            # الصفحة الرئيسية
│   ├── globals.css         # CSS عام
│   ├── sitemap.ts          # Sitemap ديناميكي
│   └── robots.ts           # Robots.txt
├── components/             # مكونات React
├── lib/                    # مكتبات مساعدة
│   ├── db.ts              # اتصال MongoDB
│   ├── auth.ts            # وظائف المصادقة
│   ├── middleware.ts      # Middleware للحماية
│   └── utils.ts           # وظائف مساعدة
├── models/                 # نماذج Mongoose
│   ├── User.ts
│   ├── Category.ts
│   ├── Post.ts
│   └── Image.ts
├── scripts/
│   └── seed.ts            # سكريبت ملء البيانات
└── public/                 # ملفات ثابتة
```

## API Routes

### المصادقة
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج

### المقالات
- `GET /api/posts` - قائمة المقالات
- `POST /api/posts` - إنشاء مقال
- `GET /api/posts/[id]` - مقال واحد
- `PUT /api/posts/[id]` - تحديث مقال
- `DELETE /api/posts/[id]` - حذف مقال

### الأقسام
- `GET /api/categories` - قائمة الأقسام
- `POST /api/categories` - إنشاء قسم
- `PUT /api/categories/[id]` - تحديث قسم
- `DELETE /api/categories/[id]` - حذف قسم

### الصور
- `GET /api/images` - قائمة الصور
- `POST /api/images` - إضافة صورة
- `DELETE /api/images/[id]` - حذف صورة

## النشر

### Vercel (موصى به)

1. ارفع المشروع على GitHub
2. اربط المشروع مع Vercel
3. أضف متغيرات البيئة في Vercel:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
4. انشر المشروع

### متغيرات البيئة للإنتاج

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techissues
JWT_SECRET=your-very-secure-random-string-here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## التطوير المستقبلي

- [ ] رفع الصور مباشرة (Cloudinary)
- [ ] محرر نصوص غني (Rich Text Editor)
- [ ] التعليقات على المقالات
- [ ] نظام الإشعارات
- [ ] تحليلات الزوار
- [ ] نشرة بريدية
- [ ] مشاركة على وسائل التواصل
- [ ] وضع القراءة الليلي

## الترخيص

MIT License

## الدعم

للأسئلة والدعم، تواصل معنا على: info@techissues.com
