// Arabic Programming - Batch 5 (Articles 41-50) - FINAL
export const programmingArBatch5 = [
    {
        title: 'Zustand لإدارة الحالة في React',
        slug: 'zustand-state-management-ar',
        tags: ['Zustand', 'React', 'State', 'JavaScript', 'Frontend'],
        excerpt: 'بديل بسيط وخفيف لـ Redux لإدارة الحالة في React.',
        content: `<h2>لماذا Zustand؟</h2>
<p>Zustand أبسط من Redux وأخف. لا providers ولا boilerplate. API صغير وقوي.</p>

<h2>إنشاء Store</h2>
<pre><code class="language-javascript">import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  user: null,
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
  reset: () => set({ count: 0, user: null }),
}));</code></pre>

<h2>استخدام في Components</h2>
<pre><code class="language-javascript">function Counter() {
  // جلب قيم محددة فقط - يعيد render عند تغيرها
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <button onClick={increment}>
      العداد: {count}
    </button>
  );
}</code></pre>

<h2>Async Actions</h2>
<pre><code class="language-javascript">const useStore = create((set) => ({
  users: [],
  loading: false,
  
  fetchUsers: async () => {
    set({ loading: true });
    const users = await api.getUsers();
    set({ users, loading: false });
  },
}));</code></pre>

<h2>الخلاصة</h2>
<p>Zustand مثالي للمشاريع الصغيرة والمتوسطة. البساطة هي قوته.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 9,
    },
    {
        title: 'Astro لمواقع سريعة',
        slug: 'astro-fast-websites-ar',
        tags: ['Astro', 'Static', 'Performance', 'Frontend', 'SSG'],
        excerpt: 'تعلم Astro لبناء مواقع ثابتة سريعة مع JavaScript أقل.',
        content: `<h2>ما هو Astro؟</h2>
<p>Astro يبني مواقع سريعة جداً. يُرسل HTML فقط بدون JavaScript إلا عند الحاجة. "Islands Architecture".</p>

<h2>Component أساسي</h2>
<pre><code class="language-astro">---
// الكود يعمل على السيرفر فقط
const posts = await fetchPosts();
const title = "مدونتي";
---

<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <ul>
      {posts.map(post => (
        <li><a href={post.url}>{post.title}</a></li>
      ))}
    </ul>
  </body>
</html>

<style>
  h1 { color: blue; }
</style></code></pre>

<h2>استخدام React/Vue Inside</h2>
<pre><code class="language-astro">---
import ReactCounter from './Counter.jsx';
---

<h1>صفحة ثابتة</h1>
<!-- Island: يُحمّل JavaScript هنا فقط -->
<ReactCounter client:visible /></code></pre>

<h2>client Directives</h2>
<pre><code>client:load    - يحمّل فوراً
client:visible - عند الظهور
client:idle    - عند فراغ المتصفح
client:media   - عند media query</code></pre>

<h2>الخلاصة</h2>
<p>Astro ممتاز للمدونات والتوثيق والمواقع المعتمدة على المحتوى. أداء خيالي.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Deno بديل Node.js الحديث',
        slug: 'deno-nodejs-alternative-ar',
        tags: ['Deno', 'JavaScript', 'TypeScript', 'Runtime', 'Backend'],
        excerpt: 'تعرف على Deno الـ runtime الحديث لـ JavaScript وTypeScript.',
        content: `<h2>ما هو Deno؟</h2>
<p>Deno runtime من مبتكر Node.js. يدعم TypeScript أصلاً، آمن بالافتراضي، وأدوات مدمجة.</p>

<h2>الفروقات عن Node</h2>
<pre><code>Node.js:
- يحتاج npm و node_modules
- CommonJS و ESM
- scripts في package.json

Deno:
- URLs للاستيراد مباشرة
- ESM فقط
- deno.json اختياري
- TypeScript بدون إعداد</code></pre>

<h2>مثال بسيط</h2>
<pre><code class="language-typescript">// server.ts
const handler = (req: Request): Response => {
  return new Response("مرحباً من Deno!");
};

Deno.serve({ port: 3000 }, handler);</code></pre>

<h2>الاستيراد</h2>
<pre><code class="language-typescript">// من URL
import { serve } from "https://deno.land/std/http/server.ts";

// مع import map (deno.json)
{
  "imports": {
    "std/": "https://deno.land/std@0.200.0/"
  }
}

import { join } from "std/path/mod.ts";</code></pre>

<h2>الأمان</h2>
<pre><code class="language-bash"># يحتاج صلاحيات صريحة
deno run --allow-net server.ts
deno run --allow-read --allow-write app.ts</code></pre>

<h2>الخلاصة</h2>
<p>Deno حديث وأنظف. يناسب المشاريع الجديدة. Node لا يزال أقوى في النظام البيئي.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'تعلم Algorithms الأساسية',
        slug: 'basic-algorithms-guide-ar',
        tags: ['Algorithms', 'Data Structures', 'Coding', 'مقابلات', 'أساسيات'],
        excerpt: 'أساسيات الخوارزميات وهياكل البيانات للمقابلات والبرمجة.',
        content: `<h2>لماذا الخوارزميات؟</h2>
<p>الخوارزميات تحسن تفكيرك البرمجي. ضرورية للمقابلات وتحسين أداء الكود.</p>

<h2>Big O Notation</h2>
<pre><code>O(1)      - ثابت      - الوصول لعنصر في array
O(log n)  - لوغاريتمي - Binary Search
O(n)      - خطي       - البحث في قائمة
O(n log n)- n log n   - Merge Sort
O(n²)     - تربيعي    - Bubble Sort</code></pre>

<h2>Binary Search</h2>
<pre><code class="language-javascript">function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}</code></pre>

<h2>Two Pointers</h2>
<pre><code class="language-javascript">// هل يوجد زوج يساوي المجموع؟
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}</code></pre>

<h2>Hash Map للتكرار</h2>
<pre><code class="language-javascript">function findDuplicate(arr) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
  return null;
}</code></pre>

<h2>الخلاصة</h2>
<p>تعلم الخوارزميات الأساسية وحل مسائل على LeetCode. الممارسة هي المفتاح.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'RabbitMQ للرسائل والـ Queues',
        slug: 'rabbitmq-message-queues-ar',
        tags: ['RabbitMQ', 'Messaging', 'Queue', 'Backend', 'Microservices'],
        excerpt: 'تعلم RabbitMQ للتواصل بين الخدمات والمعالجة غير المتزامنة.',
        content: `<h2>ما هو RabbitMQ؟</h2>
<p>RabbitMQ message broker لإرسال الرسائل بين التطبيقات. يفصل المُرسل عن المستقبل ويضمن وصول الرسائل.</p>

<h2>المفاهيم</h2>
<pre><code>Producer  - يرسل الرسائل
Queue     - يخزن الرسائل
Consumer  - يستقبل ويعالج
Exchange  - يوجه الرسائل للـ queues</code></pre>

<h2>الإرسال</h2>
<pre><code class="language-javascript">const amqp = require('amqplib');

async function send(message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  await channel.assertQueue('tasks');
  channel.sendToQueue('tasks', Buffer.from(JSON.stringify(message)));
  
  await channel.close();
  await connection.close();
}</code></pre>

<h2>الاستقبال</h2>
<pre><code class="language-javascript">async function consume() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  await channel.assertQueue('tasks');
  
  channel.consume('tasks', (msg) => {
    const task = JSON.parse(msg.content.toString());
    processTask(task);
    channel.ack(msg);  // تأكيد المعالجة
  });
}</code></pre>

<h2>حالات الاستخدام</h2>
<pre><code>- إرسال الإيميلات
- معالجة الصور
- التواصل بين Microservices
- توزيع المهام على Workers</code></pre>

<h2>الخلاصة</h2>
<p>RabbitMQ ممتاز للعمليات الطويلة والتواصل بين الخدمات. يزيد الموثوقية والتوسع.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'تطوير Chrome Extensions',
        slug: 'chrome-extensions-development-ar',
        tags: ['Chrome', 'Extensions', 'JavaScript', 'Browser', 'أدوات'],
        excerpt: 'تعلم بناء إضافات Chrome لتحسين تجربة المتصفح.',
        content: `<h2>هيكل الإضافة</h2>
<pre><code>extension/
├── manifest.json    # الملف الرئيسي
├── popup.html       # واجهة الإضافة
├── popup.js         # منطق الواجهة
├── content.js       # يعمل في الصفحات
├── background.js    # Service Worker
└── icons/</code></pre>

<h2>manifest.json</h2>
<pre><code class="language-json">{
  "manifest_version": 3,
  "name": "إضافتي",
  "version": "1.0",
  "description": "وصف الإضافة",
  "permissions": ["activeTab", "storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon.png"
  },
  "content_scripts": [{
    "matches": ["*://*/*"],
    "js": ["content.js"]
  }]
}</code></pre>

<h2>Popup</h2>
<pre><code class="language-javascript">// popup.js
document.getElementById('btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.style.backgroundColor = 'red'
  });
});</code></pre>

<h2>Content Script</h2>
<pre><code class="language-javascript">// content.js - يعمل في كل صفحة
const links = document.querySelectorAll('a');
links.forEach(link => {
  link.style.color = 'green';
});</code></pre>

<h2>التخزين</h2>
<pre><code class="language-javascript">// حفظ
await chrome.storage.local.set({ key: 'value' });

// جلب
const { key } = await chrome.storage.local.get('key');</code></pre>

<h2>الخلاصة</h2>
<p>إضافات Chrome قوية ومفيدة. Manifest V3 هو المعيار الجديد. ابدأ ببسيط وتوسع.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Drizzle ORM الحديث',
        slug: 'drizzle-orm-modern-ar',
        tags: ['Drizzle', 'ORM', 'TypeScript', 'Database', 'SQL'],
        excerpt: 'تعرف على Drizzle ORM البديل الخفيف والآمن لـ Prisma.',
        content: `<h2>لماذا Drizzle؟</h2>
<p>Drizzle ORM خفيف وtype-safe. يولد SQL قابل للقراءة. أسرع من Prisma ولا يحتاج code generation.</p>

<h2>التعريف</h2>
<pre><code class="language-typescript">import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  authorId: integer('author_id').references(() => users.id),
});</code></pre>

<h2>الاستعلامات</h2>
<pre><code class="language-typescript">import { db } from './db';
import { users, posts } from './schema';
import { eq } from 'drizzle-orm';

// إدراج
const user = await db.insert(users)
  .values({ name: 'أحمد', email: 'a@b.c' })
  .returning();

// قراءة
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// مع العلاقات
const usersWithPosts = await db.select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId));</code></pre>

<h2>Migrations</h2>
<pre><code class="language-bash">npx drizzle-kit generate:pg
npx drizzle-kit push:pg</code></pre>

<h2>الخلاصة</h2>
<p>Drizzle ممتاز لمن يفضل SQL. خفيف وسريع ومرن. بديل قوي لـ Prisma.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'تصحيح Debugging في JavaScript',
        slug: 'javascript-debugging-ar',
        tags: ['Debugging', 'JavaScript', 'DevTools', 'أدوات', 'أساسيات'],
        excerpt: 'تقنيات تصحيح الأخطاء في JavaScript باستخدام DevTools.',
        content: `<h2>console المتقدم</h2>
<pre><code class="language-javascript">// أساسي
console.log('رسالة');

// مع تنسيق
console.log('%cنص ملون', 'color: red; font-size: 20px');

// جدول
console.table([{ name: 'أحمد', age: 25 }]);

// مجموعة
console.group('مجموعة');
console.log('داخل المجموعة');
console.groupEnd();

// وقت
console.time('عملية');
// ...كود
console.timeEnd('عملية');</code></pre>

<h2>Breakpoints</h2>
<pre><code class="language-javascript">// في الكود
debugger;  // يوقف هنا

// أو من DevTools:
// Sources > اضغط على رقم السطر

// Conditional breakpoint
// كليك يمين > Add conditional breakpoint
// x > 10</code></pre>

<h2>Watch Expressions</h2>
<p>في DevTools > Sources > Watch. أضف متغيرات أو تعبيرات لمراقبتها أثناء التنفيذ.</p>

<h2>Network Debugging</h2>
<pre><code class="language-javascript">// اعتراض الطلبات
fetch('/api/data')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error('فشل:', err));</code></pre>

<h2>Error Stack Trace</h2>
<pre><code class="language-javascript">try {
  riskyOperation();
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}</code></pre>

<h2>الخلاصة</h2>
<p>DevTools أقوى أداة للـ debugging. تعلم keyboard shortcuts لتسريع عملك.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Nginx للمطورين',
        slug: 'nginx-developers-guide-ar',
        tags: ['Nginx', 'Web Server', 'Reverse Proxy', 'DevOps', 'Deployment'],
        excerpt: 'تعلم إعداد Nginx كـ web server و reverse proxy.',
        content: `<h2>ما هو Nginx؟</h2>
<p>Nginx web server سريع وخفيف. يُستخدم لتقديم الملفات الثابتة، reverse proxy، وload balancing.</p>

<h2>التثبيت</h2>
<pre><code class="language-bash"># Ubuntu
sudo apt update
sudo apt install nginx
sudo systemctl start nginx</code></pre>

<h2>إعداد موقع</h2>
<pre><code class="language-nginx"># /etc/nginx/sites-available/mysite
server {
    listen 80;
    server_name example.com;
    root /var/www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}</code></pre>

<h2>Reverse Proxy</h2>
<pre><code class="language-nginx">server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}</code></pre>

<h2>SSL مع Let's Encrypt</h2>
<pre><code class="language-bash">sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com</code></pre>

<h2>Load Balancing</h2>
<pre><code class="language-nginx">upstream backend {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    location / {
        proxy_pass http://backend;
    }
}</code></pre>

<h2>الخلاصة</h2>
<p>Nginx ضروري لـ production. reverse proxy مع SSL إعداد شائع ومهم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Framer Motion للحركات في React',
        slug: 'framer-motion-react-ar',
        tags: ['Framer Motion', 'Animation', 'React', 'UI', 'Frontend'],
        excerpt: 'أضف حركات جميلة لتطبيقات React مع Framer Motion.',
        content: `<h2>لماذا Framer Motion؟</h2>
<p>Framer Motion مكتبة حركات قوية وسهلة لـ React. تعريفية وتدعم gestures والتخطيط.</p>

<h2>حركة أساسية</h2>
<pre><code class="language-javascript">import { motion } from 'framer-motion';

function Box() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      مربع متحرك
    </motion.div>
  );
}</code></pre>

<h2>Hover و Tap</h2>
<pre><code class="language-javascript"><motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  زر متفاعل
</motion.button></code></pre>

<h2>Variants</h2>
<pre><code class="language-javascript">const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.text}
    </motion.li>
  ))}
</motion.ul></code></pre>

<h2>AnimatePresence</h2>
<pre><code class="language-javascript">import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      يظهر ويختفي بسلاسة
    </motion.div>
  )}
</AnimatePresence></code></pre>

<h2>الخلاصة</h2>
<p>Framer Motion يجعل الحركات سهلة وجميلة. ابدأ ببسيط وتعلم Variants للتحكم الأفضل.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 10,
    },
];
