// Arabic Programming - Batch 1 (Articles 1-10)
export const programmingArBatch1 = [
    {
        title: 'دليل React Hooks الشامل للمبتدئين',
        slug: 'react-hooks-guide-beginners-ar',
        tags: ['React', 'Hooks', 'JavaScript', 'Frontend', 'تعليم'],
        excerpt: 'تعلم React Hooks من الصفر مع أمثلة عملية وشرح مفصل.',
        content: `<h2>ما هي React Hooks؟</h2>
<p>Hooks هي دوال تسمح باستخدام state وميزات React الأخرى في Functional Components بدلاً من Class Components. أضيفت في React 16.8.</p>

<h2>useState Hook</h2>
<p>أبسط Hook لإدارة الحالة المحلية. يرجع قيمة ودالة لتحديثها.</p>
<pre><code class="language-javascript">const [count, setCount] = useState(0);

// استخدام
setCount(count + 1);
setCount(prev => prev + 1); // أفضل للقيم المعتمدة على السابقة</code></pre>

<h2>useEffect Hook</h2>
<p>للتعامل مع الـ side effects مثل API calls والاشتراكات.</p>
<pre><code class="language-javascript">useEffect(() => {
  fetchData();
  return () => cleanup(); // تنظيف عند unmount
}, [dependency]); // يعمل عند تغير dependency</code></pre>

<h2>قواعد استخدام Hooks</h2>
<p>استخدمها في المستوى الأعلى فقط، ليس داخل شروط أو حلقات. استخدمها في React Functions فقط.</p>

<h2>الخلاصة</h2>
<p>useState و useEffect أساسيان. ابدأ بهما ثم تعلم useContext و useReducer للحالات المتقدمة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'بناء REST API احترافي بـ Node.js و Express',
        slug: 'nodejs-express-rest-api-ar',
        tags: ['Node.js', 'Express', 'API', 'Backend', 'JavaScript'],
        excerpt: 'دليل شامل لبناء واجهة برمجية RESTful باستخدام Node.js و Express.',
        content: `<h2>إعداد المشروع</h2>
<p>ابدأ بتثبيت Express وإنشاء هيكل واضح للمشروع.</p>
<pre><code class="language-bash">npm init -y
npm install express mongoose dotenv cors</code></pre>

<h2>إعداد السيرفر</h2>
<pre><code class="language-javascript">const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log('Server running'));</code></pre>

<h2>إنشاء Routes</h2>
<pre><code class="language-javascript">// routes/users.js
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);</code></pre>

<h2>أفضل الممارسات</h2>
<p>استخدم middleware للمصادقة. افصل الـ routes عن الـ controllers. استخدم try-catch للأخطاء.</p>

<h2>الخلاصة</h2>
<p>Express يجعل بناء API سهلاً. الهيكل الجيد والـ middleware يضمنان قابلية الصيانة والتوسع.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'TypeScript المتقدم: Generics والأنواع',
        slug: 'advanced-typescript-generics-ar',
        tags: ['TypeScript', 'Generics', 'Types', 'JavaScript', 'متقدم'],
        excerpt: 'إتقان الـ Generics وأنواع TypeScript المتقدمة لكتابة كود أكثر مرونة.',
        content: `<h2>ما هي Generics؟</h2>
<p>Generics تسمح بكتابة مكونات تعمل مع أنواع مختلفة مع الحفاظ على type safety.</p>
<pre><code class="language-typescript">function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");</code></pre>

<h2>Generic Interfaces</h2>
<pre><code class="language-typescript">interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserResponse = ApiResponse<User>;
type PostsResponse = ApiResponse<Post[]>;</code></pre>

<h2>Utility Types</h2>
<pre><code class="language-typescript">// Partial - كل الخصائص اختيارية
type UpdateUser = Partial<User>;

// Pick - اختيار خصائص محددة
type UserName = Pick<User, 'firstName' | 'lastName'>;

// Omit - استبعاد خصائص
type PublicUser = Omit<User, 'password'>;</code></pre>

<h2>الخلاصة</h2>
<p>Generics تجعل الكود مرناً وآمناً. Utility Types توفر الوقت وتقلل التكرار.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'أساسيات Python للمبتدئين',
        slug: 'python-basics-beginners-ar',
        tags: ['Python', 'مبتدئين', 'برمجة', 'تعليم', 'أساسيات'],
        excerpt: 'تعلم أساسيات لغة Python من الصفر مع أمثلة عملية بسيطة.',
        content: `<h2>لماذا Python؟</h2>
<p>Python سهلة التعلم وقوية ومتعددة الاستخدامات. مثالية للمبتدئين ومستخدمة في الويب والـ AI وتحليل البيانات.</p>

<h2>المتغيرات والأنواع</h2>
<pre><code class="language-python"># المتغيرات لا تحتاج تحديد النوع
name = "أحمد"           # نص
age = 25               # رقم صحيح
height = 1.75          # رقم عشري
is_student = True      # قيمة منطقية</code></pre>

<h2>الشروط</h2>
<pre><code class="language-python">if age >= 18:
    print("بالغ")
elif age >= 13:
    print("مراهق")
else:
    print("طفل")</code></pre>

<h2>الحلقات</h2>
<pre><code class="language-python"># for loop
for i in range(5):
    print(i)

# while loop
while count < 10:
    count += 1</code></pre>

<h2>الدوال</h2>
<pre><code class="language-python">def greet(name):
    return f"مرحباً {name}!"

message = greet("سارة")  # مرحباً سارة!</code></pre>

<h2>الخلاصة</h2>
<p>Python بسيطة ومقروءة. تعلم الأساسيات ثم انتقل للمشاريع العملية لتثبيت المفاهيم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'بناء تطبيقات مع Next.js 14 App Router',
        slug: 'nextjs-14-app-router-ar',
        tags: ['Next.js', 'React', 'App Router', 'Frontend', 'SSR'],
        excerpt: 'تعلم بناء تطبيقات ويب حديثة باستخدام Next.js 14 و App Router الجديد.',
        content: `<h2>ما الجديد في App Router؟</h2>
<p>Next.js 14 يستخدم App Router افتراضياً. يدعم Server Components ويحسن الأداء بشكل كبير.</p>

<h2>هيكل المشروع</h2>
<pre><code>app/
├── layout.tsx      # Layout مشترك
├── page.tsx        # الصفحة الرئيسية
├── about/
│   └── page.tsx    # /about
└── blog/
    ├── page.tsx    # /blog
    └── [slug]/
        └── page.tsx  # /blog/:slug</code></pre>

<h2>Server vs Client Components</h2>
<pre><code class="language-typescript">// Server Component (افتراضي)
async function ProductList() {
  const products = await fetchProducts();
  return <ul>{products.map(p => <li>{p.name}</li>)}</ul>;
}

// Client Component
'use client';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}</code></pre>

<h2>Data Fetching</h2>
<p>Server Components تجلب البيانات مباشرة بدون useEffect. أسرع وأبسط.</p>

<h2>الخلاصة</h2>
<p>App Router يغير طريقة بناء تطبيقات React. Server Components تحسن الأداء بشكل كبير.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'دليل Git و GitHub للمبتدئين',
        slug: 'git-github-beginners-guide-ar',
        tags: ['Git', 'GitHub', 'Version Control', 'أساسيات', 'تعاون'],
        excerpt: 'تعلم Git و GitHub من الصفر للتحكم في إصدارات الكود والتعاون مع فريقك.',
        content: `<h2>ما هو Git؟</h2>
<p>Git نظام للتحكم في الإصدارات. يتتبع التغييرات في الكود ويسمح بالتعاون والعودة لإصدارات قديمة.</p>

<h2>الأوامر الأساسية</h2>
<pre><code class="language-bash"># بدء مستودع جديد
git init

# إضافة الملفات للـ staging
git add .

# حفظ التغييرات
git commit -m "رسالة واضحة تصف التغيير"

# رفع للـ remote
git push origin main</code></pre>

<h2>الفروع Branches</h2>
<pre><code class="language-bash"># إنشاء فرع جديد
git branch feature-login

# التبديل للفرع
git checkout feature-login
# أو
git switch feature-login

# دمج الفرع
git merge feature-login</code></pre>

<h2>GitHub</h2>
<p>GitHub منصة لاستضافة المستودعات والتعاون. Clone للتحميل، Fork للنسخ، Pull Request للمساهمة.</p>

<h2>الخلاصة</h2>
<p>Git ضروري لكل مبرمج. ابدأ بـ add, commit, push ثم تعلم الفروع تدريجياً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'تعلم CSS Grid من الصفر',
        slug: 'css-grid-complete-guide-ar',
        tags: ['CSS', 'Grid', 'Layout', 'Frontend', 'تصميم'],
        excerpt: 'دليل شامل لـ CSS Grid لبناء تخطيطات ويب مرنة وحديثة.',
        content: `<h2>ما هو CSS Grid؟</h2>
<p>CSS Grid نظام تخطيط ثنائي الأبعاد. يتحكم في الصفوف والأعمدة معاً. أقوى من Flexbox للتخطيطات المعقدة.</p>

<h2>إنشاء Grid</h2>
<pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 أعمدة */
  grid-template-rows: auto 1fr auto;  /* 3 صفوف */
  gap: 20px; /* مسافة بين العناصر */
}</code></pre>

<h2>وضع العناصر</h2>
<pre><code class="language-css">.header {
  grid-column: 1 / -1; /* يمتد على كل الأعمدة */
}

.sidebar {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

.main {
  grid-area: 2 / 2 / 3 / 4; /* row-start / col-start / row-end / col-end */
}</code></pre>

<h2>Grid Areas</h2>
<pre><code class="language-css">.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }</code></pre>

<h2>الخلاصة</h2>
<p>CSS Grid يجعل التخطيطات المعقدة سهلة. استخدمه مع Flexbox لأفضل النتائج.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'JavaScript ES6+ الميزات الحديثة',
        slug: 'javascript-es6-features-ar',
        tags: ['JavaScript', 'ES6', 'Modern JS', 'Frontend', 'أساسيات'],
        excerpt: 'تعرف على أهم ميزات JavaScript الحديثة من ES6 وما بعدها.',
        content: `<h2>const و let</h2>
<p>استخدم const للقيم الثابتة و let للمتغيرة. تجنب var.</p>
<pre><code class="language-javascript">const PI = 3.14159;    // ثابت
let count = 0;         // متغير
count = 1;             // ✓ مسموح
PI = 3;                // ✗ خطأ</code></pre>

<h2>Arrow Functions</h2>
<pre><code class="language-javascript">// قبل
const add = function(a, b) { return a + b; };

// ES6
const add = (a, b) => a + b;
const greet = name => \`مرحباً \${name}\`;</code></pre>

<h2>Destructuring</h2>
<pre><code class="language-javascript">// Objects
const { name, age } = user;

// Arrays
const [first, second, ...rest] = numbers;

// Parameters
function greet({ name, greeting = "مرحباً" }) {
  return \`\${greeting} \${name}\`;
}</code></pre>

<h2>Spread و Rest</h2>
<pre><code class="language-javascript">// Spread
const merged = [...arr1, ...arr2];
const copy = { ...obj, newProp: value };

// Rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}</code></pre>

<h2>الخلاصة</h2>
<p>ES6+ يجعل JavaScript أنظف وأقوى. تعلم هذه الميزات لكتابة كود حديث.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'بناء API مع FastAPI و Python',
        slug: 'fastapi-python-api-ar',
        tags: ['Python', 'FastAPI', 'API', 'Backend', 'Async'],
        excerpt: 'تعلم بناء APIs سريعة وحديثة باستخدام FastAPI مع Python.',
        content: `<h2>لماذا FastAPI؟</h2>
<p>FastAPI أسرع framework لـ Python. يدعم async بالكامل، توثيق تلقائي، وvalidation مدمج.</p>

<h2>البداية السريعة</h2>
<pre><code class="language-python">from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "مرحباً بالعالم"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}</code></pre>

<h2>Pydantic Models</h2>
<pre><code class="language-python">from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users/")
def create_user(user: User):
    return {"user": user, "message": "تم الإنشاء"}</code></pre>

<h2>Async Support</h2>
<pre><code class="language-python">@app.get("/async-items/")
async def get_items():
    items = await fetch_items_from_db()
    return items</code></pre>

<h2>الخلاصة</h2>
<p>FastAPI يجمع السرعة والسهولة. التوثيق التلقائي Swagger يوفر وقتاً كثيراً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'مقدمة في Docker للمطورين',
        slug: 'docker-intro-developers-ar',
        tags: ['Docker', 'DevOps', 'Containers', 'Deployment', 'أساسيات'],
        excerpt: 'تعلم أساسيات Docker وكيفية containerize تطبيقاتك.',
        content: `<h2>ما هو Docker؟</h2>
<p>Docker يحزم تطبيقك مع كل تبعياته في container واحد. يضمن أن التطبيق يعمل بنفس الطريقة في أي مكان.</p>

<h2>Dockerfile</h2>
<pre><code class="language-dockerfile">FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]</code></pre>

<h2>أوامر Docker الأساسية</h2>
<pre><code class="language-bash"># بناء الـ image
docker build -t my-app .

# تشغيل container
docker run -p 3000:3000 my-app

# عرض الـ containers
docker ps

# إيقاف container
docker stop container_id</code></pre>

<h2>docker-compose</h2>
<pre><code class="language-yaml">version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret</code></pre>

<h2>الخلاصة</h2>
<p>Docker يحل مشكلة "يعمل عندي!" للأبد. ضروري للتطوير والنشر الحديث.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
        readingTime: 11,
    },
];
