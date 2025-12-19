// Premium Arabic Programming Posts with Code Examples - Part 2
export const premiumProgrammingAr2 = [
    {
        title: 'بناء تطبيق كامل بـ Next.js 14 و App Router',
        slug: 'nextjs-14-app-router-complete-app',
        tags: ['Next.js', 'React', 'Full-stack', 'App Router'],
        excerpt: 'دليل عملي شامل لبناء تطبيق ويب متكامل باستخدام أحدث ميزات Next.js 14.',
        content: `<h2>هيكل المشروع مع App Router</h2>
<pre><code>my-app/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (/)
│   ├── loading.tsx       # Loading UI
│   ├── error.tsx         # Error UI
│   ├── globals.css
│   ├── api/
│   │   └── users/
│   │       └── route.ts  # API Route
│   ├── dashboard/
│   │   ├── layout.tsx    # Dashboard layout
│   │   ├── page.tsx      # /dashboard
│   │   └── settings/
│   │       └── page.tsx  # /dashboard/settings
│   └── posts/
│       ├── page.tsx      # /posts
│       └── [id]/
│           └── page.tsx  # /posts/:id
├── components/
├── lib/
└── public/</code></pre>

<h2>1. Root Layout مع Metadata</h2>
<pre><code class="language-typescript">// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'موقعي',
    template: '%s | موقعي'
  },
  description: 'موقع رائع مبني بـ Next.js 14',
  keywords: ['Next.js', 'React', 'تطوير ويب'],
  authors: [{ name: 'اسمك' }],
  openGraph: {
    title: 'موقعي',
    description: 'موقع رائع مبني بـ Next.js 14',
    url: 'https://mysite.com',
    siteName: 'موقعي',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    &lt;html lang="ar" dir="rtl"&gt;
      &lt;body className={inter.className}&gt;
        &lt;header&gt;
          &lt;nav&gt;{/* Navigation */}&lt;/nav&gt;
        &lt;/header&gt;
        &lt;main&gt;{children}&lt;/main&gt;
        &lt;footer&gt;{/* Footer */}&lt;/footer&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}</code></pre>

<h2>2. Server Components و Data Fetching</h2>
<pre><code class="language-typescript">// app/posts/page.tsx
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

// هذه الدالة تعمل على السيرفر
async function getPosts(): Promise&lt;Post[]&gt; {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // إعادة التحقق كل ساعة
  });
  
  if (!res.ok) {
    throw new Error('فشل في جلب المقالات');
  }
  
  return res.json();
}

// Server Component - no 'use client'
export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    &lt;div className="container"&gt;
      &lt;h1&gt;المقالات&lt;/h1&gt;
      &lt;div className="grid"&gt;
        {posts.map(post => (
          &lt;article key={post.id} className="card"&gt;
            &lt;h2&gt;{post.title}&lt;/h2&gt;
            &lt;p&gt;{post.excerpt}&lt;/p&gt;
            &lt;Link href={\`/posts/\${post.id}\`}&gt;
              اقرأ المزيد
            &lt;/Link&gt;
          &lt;/article&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>3. Dynamic Routes مع generateStaticParams</h2>
<pre><code class="language-typescript">// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

// Generate static pages at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  return posts.map((post: { id: string }) => ({
    id: post.id,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise&lt;Metadata&gt; {
  const post = await getPost(params.id);
  
  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      title: post?.title,
      images: [post?.coverImage],
    },
  };
}

async function getPost(id: string) {
  const res = await fetch(\`https://api.example.com/posts/\${id}\`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);
  
  if (!post) {
    notFound();
  }
  
  return (
    &lt;article&gt;
      &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;div dangerouslySetInnerHTML={{ __html: post.content }} /&gt;
    &lt;/article&gt;
  );
}</code></pre>

<h2>4. Server Actions</h2>
<pre><code class="language-typescript">// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  content: z.string().min(10, 'المحتوى قصير جداً'),
});

export async function createPost(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  
  // التحقق من البيانات
  const validatedData = PostSchema.safeParse(rawData);
  
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  
  // حفظ في قاعدة البيانات
  const post = await db.post.create({
    data: validatedData.data,
  });
  
  // تحديث الـ cache
  revalidatePath('/posts');
  
  // إعادة التوجيه
  redirect(\`/posts/\${post.id}\`);
}

// app/posts/new/page.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    &lt;button type="submit" disabled={pending}&gt;
      {pending ? 'جاري الإنشاء...' : 'إنشاء المقال'}
    &lt;/button&gt;
  );
}

export default function NewPostPage() {
  const [state, formAction] = useFormState(createPost, null);
  
  return (
    &lt;form action={formAction}&gt;
      &lt;div&gt;
        &lt;label htmlFor="title"&gt;العنوان&lt;/label&gt;
        &lt;input id="title" name="title" required /&gt;
        {state?.errors?.title && (
          &lt;p className="error"&gt;{state.errors.title}&lt;/p&gt;
        )}
      &lt;/div&gt;
      
      &lt;div&gt;
        &lt;label htmlFor="content"&gt;المحتوى&lt;/label&gt;
        &lt;textarea id="content" name="content" required /&gt;
        {state?.errors?.content && (
          &lt;p className="error"&gt;{state.errors.content}&lt;/p&gt;
        )}
      &lt;/div&gt;
      
      &lt;SubmitButton /&gt;
    &lt;/form&gt;
  );
}</code></pre>

<h2>5. API Routes</h2>
<pre><code class="language-typescript">// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const posts = await db.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  
  return NextResponse.json({
    data: posts,
    page,
    limit,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const post = await db.post.create({
      data: body,
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'فشل في إنشاء المقال' },
      { status: 500 }
    );
  }
}

// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({
    where: { id: params.id },
  });
  
  if (!post) {
    return NextResponse.json(
      { error: 'المقال غير موجود' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(post);
}</code></pre>

<h2>الخلاصة</h2>
<p>Next.js 14 مع App Router يقدم تجربة تطوير متكاملة وحديثة. استفد من Server Components لأداء أفضل و Server Actions لتبسيط الكود.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        readingTime: 22,
    },
    {
        title: 'CSS المتقدم: Grid و Flexbox و Animations',
        slug: 'advanced-css-grid-flexbox-animations',
        tags: ['CSS', 'Grid', 'Flexbox', 'Animations', 'Frontend'],
        excerpt: 'إتقان تقنيات CSS الحديثة لبناء تصاميم مذهلة ومتجاوبة.',
        content: `<h2>CSS Grid: نظام التخطيط ثنائي الأبعاد</h2>

<h3>1. إنشاء Grid أساسي</h3>
<pre><code class="language-css">/* Container */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  padding: 20px;
}

/* Responsive Grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Named Grid Areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive with areas */
@media (max-width: 768px) {
  .page-layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}</code></pre>

<h3>2. Grid المتقدم</h3>
<pre><code class="language-css">/* Masonry-like layout */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 15px;
}

.masonry-item.small { grid-row: span 20; }
.masonry-item.medium { grid-row: span 30; }
.masonry-item.large { grid-row: span 40; }

/* Grid with subgrid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* header, content, footer */
}</code></pre>

<h2>Flexbox: نظام التخطيط أحادي البعد</h2>
<pre><code class="language-css">/* Navbar with Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a2e;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

/* Card Layout */
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-content {
  flex: 1; /* Takes remaining space */
}

.card-footer {
  margin-top: auto; /* Pushes to bottom */
}

/* Centering */
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Responsive flex */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px; /* grow shrink basis */
}</code></pre>

<h2>CSS Animations</h2>
<pre><code class="language-css">/* Keyframe Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Staggered animation */
.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }
.stagger-item:nth-child(4) { animation-delay: 0.4s; }

/* Pulse Animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Loading Spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Hover Effects */
.button {
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.button:hover::before {
  left: 100%;
}

/* Gradient Animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}</code></pre>

<h2>الخلاصة</h2>
<p>CSS الحديث يوفر أدوات قوية للتصميم. استخدم Grid للتخطيطات المعقدة، Flexbox للمحاذاة، والـ Animations لإضفاء الحياة على تصاميمك.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 16,
    },
    {
        title: 'Python للذكاء الاصطناعي: مكتبات وأمثلة عملية',
        slug: 'python-ai-libraries-examples',
        tags: ['Python', 'AI', 'Machine Learning', 'Data Science'],
        excerpt: 'دليل عملي لاستخدام Python في مشاريع الذكاء الاصطناعي مع أمثلة كود حقيقية.',
        content: `<h2>1. NumPy: العمليات الرياضية</h2>
<pre><code class="language-python">import numpy as np

# إنشاء مصفوفات
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# عمليات المصفوفات
print(matrix.shape)  # (3, 3)
print(matrix.T)      # transpose
print(np.dot(matrix, matrix))  # ضرب المصفوفات

# إنشاء مصفوفات خاصة
zeros = np.zeros((3, 3))
ones = np.ones((2, 4))
identity = np.eye(4)
random = np.random.randn(3, 3)  # توزيع طبيعي

# عمليات إحصائية
data = np.random.randn(1000)
print(f"المتوسط: {np.mean(data):.4f}")
print(f"الانحراف المعياري: {np.std(data):.4f}")
print(f"الحد الأقصى: {np.max(data):.4f}")</code></pre>

<h2>2. Pandas: تحليل البيانات</h2>
<pre><code class="language-python">import pandas as pd

# قراءة البيانات
df = pd.read_csv('data.csv')

# استكشاف البيانات
print(df.head())
print(df.info())
print(df.describe())

# تنظيف البيانات
df = df.dropna()  # حذف القيم الفارغة
df = df.drop_duplicates()  # حذف المكررات

# تحويل البيانات
df['date'] = pd.to_datetime(df['date'])
df['year'] = df['date'].dt.year

# التجميع والتحليل
summary = df.groupby('category').agg({
    'sales': ['sum', 'mean', 'count'],
    'profit': ['sum', 'mean']
})

# الفلترة
high_sales = df[df['sales'] > 1000]
filtered = df[(df['category'] == 'Electronics') & (df['year'] == 2024)]

# Pivot Table
pivot = pd.pivot_table(
    df,
    values='sales',
    index='category',
    columns='month',
    aggfunc='sum'
)</code></pre>

<h2>3. Scikit-learn: التعلم الآلي</h2>
<pre><code class="language-python">from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd

# تحميل وتحضير البيانات
df = pd.read_csv('dataset.csv')
X = df.drop('target', axis=1)
y = df['target']

# تقسيم البيانات
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# تطبيع البيانات
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# بناء وتدريب النموذج
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)
model.fit(X_train_scaled, y_train)

# التنبؤ والتقييم
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"الدقة: {accuracy:.4f}")
print(classification_report(y_test, y_pred))

# أهمية الميزات
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)</code></pre>

<h2>4. TensorFlow/Keras: الشبكات العصبية</h2>
<pre><code class="language-python">import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# بناء نموذج CNN لتصنيف الصور
model = keras.Sequential([
    # طبقة الإدخال
    layers.InputLayer(input_shape=(224, 224, 3)),
    
    # طبقات Convolution
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    
    # تسطيح وطبقات Dense
    layers.Flatten(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

# تجميع النموذج
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# ملخص النموذج
model.summary()

# التدريب
history = model.fit(
    X_train, y_train,
    epochs=20,
    batch_size=32,
    validation_split=0.2,
    callbacks=[
        keras.callbacks.EarlyStopping(patience=3),
        keras.callbacks.ModelCheckpoint('best_model.h5', save_best_only=True)
    ]
)

# رسم منحنى التعلم
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Training')
plt.plot(history.history['val_accuracy'], label='Validation')
plt.title('Model Accuracy')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Training')
plt.plot(history.history['val_loss'], label='Validation')
plt.title('Model Loss')
plt.legend()
plt.show()</code></pre>

<h2>الخلاصة</h2>
<p>Python هي اللغة الأولى للذكاء الاصطناعي بفضل مكتباتها القوية. ابدأ بـ NumPy و Pandas للتعامل مع البيانات، ثم انتقل إلى Scikit-learn و TensorFlow لبناء النماذج.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        readingTime: 20,
    },
];
