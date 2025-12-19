// Arabic Programming - Batch 4 (Articles 31-40)
export const programmingArBatch4 = [
    {
        title: 'تحسين أداء React Applications',
        slug: 'react-performance-optimization-ar',
        tags: ['React', 'Performance', 'Optimization', 'Frontend', 'متقدم'],
        excerpt: 'تقنيات وأساليب لتحسين أداء تطبيقات React.',
        content: `<h2>لماذا الأداء مهم؟</h2>
<p>تطبيق بطيء يفقد المستخدمين. كل 100ms تأخير يقلل التحويلات. الأداء ليس رفاهية.</p>

<h2>React.memo</h2>
<pre><code class="language-javascript">// يمنع re-render إذا لم تتغير الـ props
const ExpensiveComponent = React.memo(function Component({ data }) {
  return <div>{/* محتوى ثقيل */}</div>;
});

// مع custom comparison
const Item = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});</code></pre>

<h2>useMemo و useCallback</h2>
<pre><code class="language-javascript">// حفظ نتيجة حساب ثقيل
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);

// حفظ دالة لمنع re-render الأبناء
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);</code></pre>

<h2>Code Splitting</h2>
<pre><code class="language-javascript">import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}</code></pre>

<h2>الخلاصة</h2>
<p>قِس أولاً ثم حسّن. لا تُبالغ في التحسين المبكر. React DevTools Profiler أداتك.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'GitHub Actions للـ CI/CD',
        slug: 'github-actions-cicd-ar',
        tags: ['GitHub Actions', 'CI/CD', 'DevOps', 'Automation', 'Testing'],
        excerpt: 'أتمتة الاختبار والنشر باستخدام GitHub Actions.',
        content: `<h2>ما هو CI/CD؟</h2>
<p>CI = دمج التغييرات باستمرار مع اختبار تلقائي. CD = نشر تلقائي للإنتاج. يسرّعان التطوير ويقللان الأخطاء.</p>

<h2>Workflow أساسي</h2>
<pre><code class="language-yaml"># .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run build</code></pre>

<h2>النشر التلقائي</h2>
<pre><code class="language-yaml">deploy:
  needs: test
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  steps:
    - uses: actions/checkout@v4
    - name: Deploy to Production
      env:
        DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
      run: |
        npm run build
        npm run deploy</code></pre>

<h2>Matrix Testing</h2>
<pre><code class="language-yaml">strategy:
  matrix:
    node-version: [18, 20, 22]
    os: [ubuntu-latest, windows-latest]</code></pre>

<h2>الخلاصة</h2>
<p>GitHub Actions مجاني للمشاريع العامة. ابدأ ببسيط وتوسع تدريجياً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Svelte Framework الحديث',
        slug: 'svelte-modern-framework-ar',
        tags: ['Svelte', 'Frontend', 'JavaScript', 'Framework', 'Reactive'],
        excerpt: 'تعرف على Svelte الـ framework الذي يختلف عن الباقين.',
        content: `<h2>ما الذي يميز Svelte؟</h2>
<p>Svelte compiler يحول الكود لـ vanilla JavaScript. لا virtual DOM ولا runtime كبير. أسرع وأصغر.</p>

<h2>Component أساسي</h2>
<pre><code class="language-svelte"><!-- Counter.svelte -->
<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
  
  // Reactive declaration
  $: doubled = count * 2;
</script>

<button on:click={increment}>
  العداد: {count} (الضعف: {doubled})
</button>

<style>
  button {
    padding: 10px 20px;
    font-size: 18px;
  }
</style></code></pre>

<h2>Props و Events</h2>
<pre><code class="language-svelte"><!-- Child.svelte -->
<script>
  export let name;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('greet', name)}>
  رحب بـ {name}
</button>

<!-- Parent.svelte -->
<Child name="أحمد" on:greet={(e) => alert(\`مرحباً \${e.detail}\`)} /></code></pre>

<h2>Stores</h2>
<pre><code class="language-javascript">// stores.js
import { writable } from 'svelte/store';
export const count = writable(0);

// Component
import { count } from './stores';
$count = 5; // اختصار للاشتراك والتحديث</code></pre>

<h2>الخلاصة</h2>
<p>Svelte بسيط وقوي وسريع. منحنى تعلم قصير. جرّبه لمشروعك القادم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'أساسيات الـ System Design',
        slug: 'system-design-basics-ar',
        tags: ['System Design', 'Architecture', 'Scalability', 'مقابلات', 'متقدم'],
        excerpt: 'مفاهيم أساسية في تصميم الأنظمة للمقابلات والمشاريع الكبيرة.',
        content: `<h2>لماذا System Design؟</h2>
<p>تطبيق يخدم 100 مستخدم يختلف عن ملايين. فهم المبادئ ضروري للتوسع والمقابلات.</p>

<h2>المفاهيم الأساسية</h2>
<pre><code>Scalability = التوسع مع زيادة الحمل
Availability = العمل بدون توقف
Consistency = البيانات متسقة
Partition Tolerance = يعمل رغم فشل جزئي</code></pre>

<h2>Horizontal vs Vertical Scaling</h2>
<pre><code>Vertical (Scale Up):
- زيادة قوة السيرفر الواحد
- محدود ومكلف

Horizontal (Scale Out):
- إضافة سيرفرات أكثر
- مرن ويتطلب تصميم مختلف</code></pre>

<h2>Load Balancing</h2>
<pre><code>Client → Load Balancer → Server 1
                       → Server 2
                       → Server 3

Algorithms:
- Round Robin
- Least Connections
- IP Hash</code></pre>

<h2>Caching</h2>
<pre><code>Client → CDN → Load Balancer → App → Cache → DB

Cache Strategies:
- Cache-Aside: التطبيق يدير الـ cache
- Write-Through: كتابة للـ cache والـ DB معاً
- Write-Behind: كتابة للـ cache، والـ DB لاحقاً</code></pre>

<h2>الخلاصة</h2>
<p>System Design مهارة تتطور بالممارسة. ادرس أنظمة حقيقية كـ Twitter وNetflix.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 13,
    },
    {
        title: 'AWS للمطورين - S3 و Lambda',
        slug: 'aws-developers-s3-lambda-ar',
        tags: ['AWS', 'S3', 'Lambda', 'Cloud', 'Serverless'],
        excerpt: 'تعلم خدمات AWS الأساسية للمطورين: S3 للتخزين و Lambda للحوسبة.',
        content: `<h2>ما هو AWS؟</h2>
<p>Amazon Web Services أكبر مزود خدمات سحابية. مئات الخدمات للحوسبة والتخزين والشبكات والذكاء الاصطناعي.</p>

<h2>S3 - التخزين</h2>
<pre><code class="language-javascript">const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// رفع ملف
await s3.putObject({
  Bucket: 'my-bucket',
  Key: 'images/photo.jpg',
  Body: fileBuffer,
  ContentType: 'image/jpeg'
}).promise();

// تحميل ملف
const data = await s3.getObject({
  Bucket: 'my-bucket',
  Key: 'images/photo.jpg'
}).promise();</code></pre>

<h2>Lambda - Serverless</h2>
<pre><code class="language-javascript">// handler.js
exports.handler = async (event) => {
  const name = event.queryStringParameters?.name || 'World';
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: \`Hello \${name}!\` })
  };
};</code></pre>

<h2>Serverless Framework</h2>
<pre><code class="language-yaml"># serverless.yml
service: my-api
provider:
  name: aws
  runtime: nodejs18.x
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: get</code></pre>

<h2>الخلاصة</h2>
<p>S3 وLambda أساسيان في AWS. Serverless يوفر التكلفة ويقلل maintenance.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'تطوير PWA تطبيقات ويب تقدمية',
        slug: 'pwa-progressive-web-apps-ar',
        tags: ['PWA', 'Web', 'Service Worker', 'Offline', 'Mobile'],
        excerpt: 'تعلم بناء Progressive Web Apps التي تعمل كتطبيقات أصلية.',
        content: `<h2>ما هي PWA؟</h2>
<p>PWA تطبيقات ويب تعمل Offline وتُثبت على الجهاز وترسل إشعارات. أفضل ما في الويب والموبايل.</p>

<h2>Web App Manifest</h2>
<pre><code class="language-json">// manifest.json
{
  "name": "تطبيقي",
  "short_name": "تطبيقي",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0066cc",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}</code></pre>

<h2>Service Worker</h2>
<pre><code class="language-javascript">// sw.js
const CACHE_NAME = 'v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});</code></pre>

<h2>التسجيل</h2>
<pre><code class="language-javascript">if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}</code></pre>

<h2>الخلاصة</h2>
<p>PWA توفر تجربة أصلية عبر الويب. Workbox يسهل إنشاء Service Workers.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Golang للمبتدئين',
        slug: 'golang-beginners-guide-ar',
        tags: ['Go', 'Golang', 'Backend', 'Concurrency', 'أساسيات'],
        excerpt: 'تعلم لغة Go البسيطة والقوية للتطبيقات السريعة.',
        content: `<h2>لماذا Go؟</h2>
<p>Go لغة بسيطة من Google. سريعة التجميع، عالية الأداء، ممتازة للـ concurrency. تُستخدم في Docker وKubernetes.</p>

<h2>الأساسيات</h2>
<pre><code class="language-go">package main

import "fmt"

func main() {
    // المتغيرات
    var name string = "أحمد"
    age := 25  // type inference
    
    // الطباعة
    fmt.Printf("الاسم: %s، العمر: %d\\n", name, age)
}</code></pre>

<h2>الدوال</h2>
<pre><code class="language-go">// دالة تُرجع قيمتين
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}</code></pre>

<h2>Structs</h2>
<pre><code class="language-go">type User struct {
    Name  string
    Email string
    Age   int
}

func (u *User) Greet() string {
    return fmt.Sprintf("مرحباً %s", u.Name)
}

user := User{Name: "أحمد", Email: "a@b.c", Age: 25}
fmt.Println(user.Greet())</code></pre>

<h2>Goroutines</h2>
<pre><code class="language-go">go func() {
    fmt.Println("تعمل بالتوازي!")
}()</code></pre>

<h2>الخلاصة</h2>
<p>Go بسيطة وسريعة وعملية. مثالية للـ APIs وأدوات CLI والـ microservices.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'ElasticSearch للبحث المتقدم',
        slug: 'elasticsearch-advanced-search-ar',
        tags: ['ElasticSearch', 'Search', 'Database', 'Full-text', 'Backend'],
        excerpt: 'تعلم ElasticSearch لبناء محركات بحث قوية ومرنة.',
        content: `<h2>ما هو ElasticSearch؟</h2>
<p>محرك بحث وتحليل موزع. يتعامل مع JSON documents. سريع جداً في البحث النصي الكامل.</p>

<h2>المفاهيم الأساسية</h2>
<pre><code>Index    = مثل Database
Document = مثل Row (JSON)
Field    = مثل Column
Mapping  = مثل Schema</code></pre>

<h2>الاتصال من Node.js</h2>
<pre><code class="language-javascript">const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

// فهرسة document
await client.index({
  index: 'posts',
  body: {
    title: 'مقال عن البرمجة',
    content: 'محتوى المقال هنا...',
    author: 'أحمد',
    date: new Date()
  }
});</code></pre>

<h2>البحث</h2>
<pre><code class="language-javascript">const result = await client.search({
  index: 'posts',
  body: {
    query: {
      multi_match: {
        query: 'برمجة',
        fields: ['title^2', 'content'] // title أهم
      }
    },
    highlight: {
      fields: { content: {} }
    }
  }
});</code></pre>

<h2>Aggregations</h2>
<pre><code class="language-javascript">const stats = await client.search({
  index: 'posts',
  body: {
    aggs: {
      authors: { terms: { field: 'author.keyword' } },
      avg_views: { avg: { field: 'views' } }
    }
  }
});</code></pre>

<h2>الخلاصة</h2>
<p>ElasticSearch قوي للبحث والتحليل. يحتاج موارد لكنه يستحق للتطبيقات الكبيرة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Rust للمبرمجين',
        slug: 'rust-programmers-intro-ar',
        tags: ['Rust', 'Systems', 'Performance', 'Safety', 'متقدم'],
        excerpt: 'مقدمة في Rust لغة أنظمة آمنة وسريعة.',
        content: `<h2>لماذا Rust؟</h2>
<p>Rust تجمع سرعة C++ مع أمان الذاكرة. لا garbage collection ولا memory leaks. محبوبة من المطورين.</p>

<h2>الأساسيات</h2>
<pre><code class="language-rust">fn main() {
    // Immutable بافتراضي
    let name = "أحمد";
    let mut age = 25;  // mutable
    age = 26;
    
    println!("الاسم: {}, العمر: {}", name, age);
}</code></pre>

<h2>Ownership</h2>
<pre><code class="language-rust">fn main() {
    let s1 = String::from("مرحباً");
    let s2 = s1;  // s1 لم يعد صالحاً (move)
    
    // println!("{}", s1);  // خطأ!
    
    let s3 = s2.clone();  // نسخة حقيقية
    println!("{} {}", s2, s3);  // ✓
}</code></pre>

<h2>Borrowing</h2>
<pre><code class="language-rust">fn print_length(s: &String) {
    println!("Length: {}", s.len());
}

fn main() {
    let s = String::from("مرحباً");
    print_length(&s);  // نستعير، لا ننقل
    println!("{}", s); // لا يزال صالحاً
}</code></pre>

<h2>Structs و impl</h2>
<pre><code class="language-rust">struct User {
    name: String,
    age: u32,
}

impl User {
    fn greet(&self) -> String {
        format!("مرحباً {}", self.name)
    }
}</code></pre>

<h2>الخلاصة</h2>
<p>Rust صعبة لكنها تستحق التعلم. الـ compiler صديقك يعلمك الأنماط الصحيحة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'تصميم RESTful APIs أفضل الممارسات',
        slug: 'restful-api-best-practices-ar',
        tags: ['REST', 'API', 'Design', 'Backend', 'Best Practices'],
        excerpt: 'أفضل الممارسات لتصميم RESTful APIs محترفة ومتسقة.',
        content: `<h2>مبادئ REST</h2>
<p>REST ليس بروتوكول بل نمط معماري. يعتمد على موارد (Resources) وأفعال HTTP والحالة عديمة (Stateless).</p>

<h2>تسمية الـ Endpoints</h2>
<pre><code>✓ الصحيح:
GET    /users          جلب كل المستخدمين
GET    /users/:id      جلب مستخدم واحد
POST   /users          إنشاء مستخدم
PUT    /users/:id      تحديث كامل
PATCH  /users/:id      تحديث جزئي
DELETE /users/:id      حذف

✗ الخاطئ:
GET /getUser
POST /createNewUser
DELETE /removeUser/:id</code></pre>

<h2>رموز الحالة</h2>
<pre><code>200 OK          - نجاح
201 Created     - تم الإنشاء
204 No Content  - حذف ناجح
400 Bad Request - خطأ في الطلب
401 Unauthorized - غير مصادق
403 Forbidden   - غير مصرح
404 Not Found   - غير موجود
500 Server Error - خطأ السيرفر</code></pre>

<h2>Pagination</h2>
<pre><code class="language-javascript">// GET /posts?page=2&limit=10

{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}</code></pre>

<h2>Error Handling</h2>
<pre><code class="language-javascript">{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "البريد الإلكتروني غير صحيح",
    "details": [
      { "field": "email", "message": "صيغة غير صالحة" }
    ]
  }
}</code></pre>

<h2>الخلاصة</h2>
<p>الاتساق أهم من الكمال. وثّق API جيداً واتبع المعايير المعروفة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
];
