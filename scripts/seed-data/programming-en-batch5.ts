// English Programming - Batch 5 (Articles 41-50) - FINAL
export const programmingEnBatch5 = [
    {
        title: 'Zustand State Management for React',
        slug: 'zustand-react-state-en',
        tags: ['Zustand', 'React', 'State', 'JavaScript', 'Frontend'],
        excerpt: 'Simple, lightweight state management alternative to Redux.',
        content: `<h2>Why Zustand?</h2>
<p>Zustand is simpler than Redux with minimal boilerplate. No providers needed, small API surface, powerful capabilities.</p>

<h2>Creating a Store</h2>
<pre><code class="language-javascript">import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  user: null,
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
  reset: () => set({ count: 0, user: null }),
}));</code></pre>

<h2>Using in Components</h2>
<pre><code class="language-javascript">function Counter() {
  // Select only what you need
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <button onClick={increment}>
      Count: {count}
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

<h2>Conclusion</h2>
<p>Zustand is perfect for small to medium projects. Simplicity is its greatest strength.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 9,
    },
    {
        title: 'Astro for Lightning-Fast Websites',
        slug: 'astro-fast-websites-en',
        tags: ['Astro', 'Static', 'Performance', 'Frontend', 'SSG'],
        excerpt: 'Build incredibly fast static websites with Astro.',
        content: `<h2>What Is Astro?</h2>
<p>Astro builds fast websites by sending zero JavaScript by default. Islands Architecture loads JavaScript only where needed.</p>

<h2>Basic Component</h2>
<pre><code class="language-astro">---
// This code runs on the server only
const posts = await fetchPosts();
const title = "My Blog";
---

&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;{title}&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;{title}&lt;/h1&gt;
    &lt;ul&gt;
      {posts.map(post =&gt; (
        &lt;li&gt;&lt;a href={post.url}&gt;{post.title}&lt;/a&gt;&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  &lt;/body&gt;
&lt;/html&gt;

&lt;style&gt;
  h1 { color: blue; }
&lt;/style&gt;</code></pre>

<h2>Using React/Vue Inside</h2>
<pre><code class="language-astro">---
import ReactCounter from './Counter.jsx';
---

&lt;h1&gt;Static Page&lt;/h1&gt;
&lt;!-- Island: JavaScript loads only here --&gt;
&lt;ReactCounter client:visible /&gt;</code></pre>

<h2>client Directives</h2>
<pre><code>client:load    - Load immediately
client:visible - Load when visible
client:idle    - Load when browser idle
client:media   - Load on media query match</code></pre>

<h2>Conclusion</h2>
<p>Astro is perfect for blogs, documentation, and content-heavy sites. Incredible performance out of the box.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Deno: Modern Node.js Alternative',
        slug: 'deno-nodejs-alternative-en',
        tags: ['Deno', 'JavaScript', 'TypeScript', 'Runtime', 'Backend'],
        excerpt: 'Explore Deno, the modern JavaScript and TypeScript runtime.',
        content: `<h2>What Is Deno?</h2>
<p>Deno is a runtime from Node.js creator. Native TypeScript support, secure by default, built-in tooling.</p>

<h2>Key Differences from Node</h2>
<pre><code>Node.js:
- Requires npm and node_modules
- CommonJS and ESM
- package.json for scripts

Deno:
- Import from URLs directly
- ESM only
- deno.json optional
- TypeScript without configuration</code></pre>

<h2>Simple Server</h2>
<pre><code class="language-typescript">// server.ts
const handler = (req: Request): Response => {
  return new Response("Hello from Deno!");
};

Deno.serve({ port: 3000 }, handler);</code></pre>

<h2>Imports</h2>
<pre><code class="language-typescript">// From URL
import { serve } from "https://deno.land/std/http/server.ts";

// With import map (deno.json)
{
  "imports": {
    "std/": "https://deno.land/std@0.200.0/"
  }
}

import { join } from "std/path/mod.ts";</code></pre>

<h2>Security</h2>
<pre><code class="language-bash"># Requires explicit permissions
deno run --allow-net server.ts
deno run --allow-read --allow-write app.ts</code></pre>

<h2>Conclusion</h2>
<p>Deno is modern and clean. Node.js still has the better ecosystem, but Deno is ideal for new projects.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Essential Algorithms for Developers',
        slug: 'essential-algorithms-developers-en',
        tags: ['Algorithms', 'Data Structures', 'Coding', 'Interviews', 'Basics'],
        excerpt: 'Core algorithms and data structures every developer should know.',
        content: `<h2>Why Learn Algorithms?</h2>
<p>Algorithms improve problem-solving skills. Essential for interviews and optimizing code performance.</p>

<h2>Big O Notation</h2>
<pre><code>O(1)      - Constant   - Array access
O(log n)  - Logarithmic - Binary Search
O(n)      - Linear     - Loop through array
O(n log n)- Linearithmic - Merge Sort
O(n²)     - Quadratic  - Bubble Sort</code></pre>

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
<pre><code class="language-javascript">// Pair that equals target sum?
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

<h2>Hash Map for Duplicates</h2>
<pre><code class="language-javascript">function findDuplicate(arr) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
  return null;
}</code></pre>

<h2>Conclusion</h2>
<p>Learn core algorithms and practice on LeetCode. Consistent practice is the key to mastery.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'RabbitMQ Message Queues',
        slug: 'rabbitmq-message-queues-en',
        tags: ['RabbitMQ', 'Messaging', 'Queue', 'Backend', 'Microservices'],
        excerpt: 'Learn RabbitMQ for asynchronous processing and service communication.',
        content: `<h2>What Is RabbitMQ?</h2>
<p>RabbitMQ is a message broker for sending messages between applications. Decouples senders from receivers, ensures delivery.</p>

<h2>Core Concepts</h2>
<pre><code>Producer  - Sends messages
Queue     - Stores messages
Consumer  - Receives and processes
Exchange  - Routes messages to queues</code></pre>

<h2>Sending Messages</h2>
<pre><code class="language-javascript">const amqp = require('amqplib');

async function send(message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  await channel.assertQueue('tasks');
  channel.sendToQueue('tasks', Buffer.from(JSON.stringify(message)));
  
  await channel.close();
  await connection.close();
}</code></pre>

<h2>Receiving Messages</h2>
<pre><code class="language-javascript">async function consume() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  await channel.assertQueue('tasks');
  
  channel.consume('tasks', (msg) => {
    const task = JSON.parse(msg.content.toString());
    processTask(task);
    channel.ack(msg);  // Acknowledge processing
  });
}</code></pre>

<h2>Use Cases</h2>
<pre><code>- Email sending
- Image processing
- Microservice communication
- Task distribution to workers</code></pre>

<h2>Conclusion</h2>
<p>RabbitMQ excels for long-running tasks and service communication. Increases reliability and scalability.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Building Chrome Extensions',
        slug: 'building-chrome-extensions-en',
        tags: ['Chrome', 'Extensions', 'JavaScript', 'Browser', 'Tools'],
        excerpt: 'Create powerful Chrome browser extensions.',
        content: `<h2>Extension Structure</h2>
<pre><code>extension/
├── manifest.json    # Main config file
├── popup.html       # Extension UI
├── popup.js         # UI logic
├── content.js       # Runs in pages
├── background.js    # Service Worker
└── icons/</code></pre>

<h2>manifest.json</h2>
<pre><code class="language-json">{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0",
  "description": "Extension description",
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

<h2>Popup Script</h2>
<pre><code class="language-javascript">// popup.js
document.getElementById('btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.style.backgroundColor = 'red'
  });
});</code></pre>

<h2>Content Script</h2>
<pre><code class="language-javascript">// content.js - Runs in every matching page
const links = document.querySelectorAll('a');
links.forEach(link => {
  link.style.color = 'green';
});</code></pre>

<h2>Storage API</h2>
<pre><code class="language-javascript">// Save
await chrome.storage.local.set({ key: 'value' });

// Get
const { key } = await chrome.storage.local.get('key');</code></pre>

<h2>Conclusion</h2>
<p>Chrome extensions are powerful and useful. Manifest V3 is the new standard. Start simple and expand.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Drizzle ORM: Modern TypeScript ORM',
        slug: 'drizzle-orm-typescript-en',
        tags: ['Drizzle', 'ORM', 'TypeScript', 'Database', 'SQL'],
        excerpt: 'Learn Drizzle ORM, the lightweight Prisma alternative.',
        content: `<h2>Why Drizzle?</h2>
<p>Drizzle is lightweight and type-safe. Produces readable SQL, faster than Prisma, no code generation needed.</p>

<h2>Schema Definition</h2>
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

<h2>Query Examples</h2>
<pre><code class="language-typescript">import { db } from './db';
import { users, posts } from './schema';
import { eq } from 'drizzle-orm';

// Insert
const user = await db.insert(users)
  .values({ name: 'John', email: 'j@e.com' })
  .returning();

// Select
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, 1));

// Join
const usersWithPosts = await db.select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId));</code></pre>

<h2>Migrations</h2>
<pre><code class="language-bash">npx drizzle-kit generate:pg
npx drizzle-kit push:pg</code></pre>

<h2>Conclusion</h2>
<p>Drizzle is excellent for SQL-lovers. Lightweight, fast, and flexible alternative to Prisma.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'JavaScript Debugging Techniques',
        slug: 'javascript-debugging-techniques-en',
        tags: ['Debugging', 'JavaScript', 'DevTools', 'Tools', 'Basics'],
        excerpt: 'Master debugging techniques using browser DevTools.',
        content: `<h2>Advanced Console</h2>
<pre><code class="language-javascript">// Basic
console.log('message');

// Styled
console.log('%cStyled text', 'color: red; font-size: 20px');

// Table
console.table([{ name: 'John', age: 25 }]);

// Grouping
console.group('Group');
console.log('Inside group');
console.groupEnd();

// Timing
console.time('operation');
// ...code
console.timeEnd('operation');</code></pre>

<h2>Breakpoints</h2>
<pre><code class="language-javascript">// In code
debugger;  // Pauses execution here

// Or from DevTools:
// Sources > Click line number

// Conditional breakpoint
// Right-click > Add conditional breakpoint
// x > 10</code></pre>

<h2>Watch Expressions</h2>
<p>In DevTools > Sources > Watch panel. Add variables or expressions to monitor during execution.</p>

<h2>Network Debugging</h2>
<pre><code class="language-javascript">// Catch request errors
fetch('/api/data')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error('Failed:', err));</code></pre>

<h2>Error Stack Traces</h2>
<pre><code class="language-javascript">try {
  riskyOperation();
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}</code></pre>

<h2>Conclusion</h2>
<p>DevTools is the most powerful debugging tool. Learn keyboard shortcuts to accelerate your workflow.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Nginx Configuration for Developers',
        slug: 'nginx-configuration-developers-en',
        tags: ['Nginx', 'Web Server', 'Reverse Proxy', 'DevOps', 'Deployment'],
        excerpt: 'Configure Nginx as web server and reverse proxy.',
        content: `<h2>What Is Nginx?</h2>
<p>Nginx is a fast, lightweight web server. Used for serving static files, reverse proxy, and load balancing.</p>

<h2>Installation</h2>
<pre><code class="language-bash"># Ubuntu
sudo apt update
sudo apt install nginx
sudo systemctl start nginx</code></pre>

<h2>Basic Site Configuration</h2>
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

<h2>SSL with Let's Encrypt</h2>
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

<h2>Conclusion</h2>
<p>Nginx is essential for production deployments. Reverse proxy with SSL is the most common setup.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Framer Motion React Animations',
        slug: 'framer-motion-react-animations-en',
        tags: ['Framer Motion', 'Animation', 'React', 'UI', 'Frontend'],
        excerpt: 'Add beautiful animations to React apps with Framer Motion.',
        content: `<h2>Why Framer Motion?</h2>
<p>Framer Motion is a powerful animation library for React. Declarative API, gesture support, layout animations.</p>

<h2>Basic Animation</h2>
<pre><code class="language-javascript">import { motion } from 'framer-motion';

function Box() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Animated box
    </motion.div>
  );
}</code></pre>

<h2>Hover and Tap</h2>
<pre><code class="language-javascript">&lt;motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
&gt;
  Interactive button
&lt;/motion.button&gt;</code></pre>

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

&lt;motion.ul variants={containerVariants} initial="hidden" animate="visible"&gt;
  {items.map(item =&gt; (
    &lt;motion.li key={item.id} variants={itemVariants}&gt;
      {item.text}
    &lt;/motion.li&gt;
  ))}
&lt;/motion.ul&gt;</code></pre>

<h2>AnimatePresence</h2>
<pre><code class="language-javascript">import { AnimatePresence } from 'framer-motion';

&lt;AnimatePresence&gt;
  {isVisible && (
    &lt;motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    &gt;
      Appears and disappears smoothly
    &lt;/motion.div&gt;
  )}
&lt;/AnimatePresence&gt;</code></pre>

<h2>Conclusion</h2>
<p>Framer Motion makes animations simple and beautiful. Start with basics and learn Variants for advanced control.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 10,
    },
];
