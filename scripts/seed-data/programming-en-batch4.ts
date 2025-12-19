// English Programming - Batch 4 (Articles 31-40)
export const programmingEnBatch4 = [
    {
        title: 'React Performance Optimization Techniques',
        slug: 'react-performance-optimization-en',
        tags: ['React', 'Performance', 'Optimization', 'Frontend', 'Advanced'],
        excerpt: 'Optimize React applications for better performance and user experience.',
        content: `<h2>Why Performance Matters</h2>
<p>Slow applications lose users. Every 100ms delay reduces conversions. Performance is not optional.</p>

<h2>React.memo</h2>
<p>Prevents re-renders when props haven't changed.</p>
<pre><code class="language-javascript">// Memoize component
const ExpensiveComponent = React.memo(function Component({ data }) {
  return <div>{/* expensive rendering */}</div>;
});

// Custom comparison
const Item = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});</code></pre>

<h2>useMemo and useCallback</h2>
<pre><code class="language-javascript">// Cache expensive computations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);

// Cache functions to prevent child re-renders
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

<h2>Conclusion</h2>
<p>Measure before optimizing. React DevTools Profiler identifies actual bottlenecks. Don't prematurely optimize.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'GitHub Actions CI/CD Pipeline',
        slug: 'github-actions-cicd-en',
        tags: ['GitHub Actions', 'CI/CD', 'DevOps', 'Automation', 'Testing'],
        excerpt: 'Automate testing and deployment with GitHub Actions workflows.',
        content: `<h2>What Is CI/CD?</h2>
<p>CI = Continuous Integration (automated testing). CD = Continuous Deployment (automated deployment). Accelerates development and reduces errors.</p>

<h2>Basic Workflow</h2>
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

<h2>Deployment Job</h2>
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

<h2>Conclusion</h2>
<p>GitHub Actions is free for public repositories. Start simple and expand as needed.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Svelte Modern Web Framework',
        slug: 'svelte-web-framework-en',
        tags: ['Svelte', 'Frontend', 'JavaScript', 'Framework', 'Reactive'],
        excerpt: 'Discover Svelte, the framework that compiles away.',
        content: `<h2>What Makes Svelte Different?</h2>
<p>Svelte compiles components to vanilla JavaScript. No runtime library needed. Faster, smaller bundles compared to React or Vue.</p>

<h2>Basic Component</h2>
<pre><code class="language-svelte">&lt;!-- Counter.svelte --&gt;
&lt;script&gt;
  let count = 0;
  
  function increment() {
    count += 1;
  }
  
  // Reactive declaration
  $: doubled = count * 2;
&lt;/script&gt;

&lt;button on:click={increment}&gt;
  Count: {count} (Doubled: {doubled})
&lt;/button&gt;

&lt;style&gt;
  button {
    padding: 10px 20px;
    font-size: 18px;
  }
&lt;/style&gt;</code></pre>

<h2>Props and Events</h2>
<pre><code class="language-svelte">&lt;!-- Child.svelte --&gt;
&lt;script&gt;
  export let name;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
&lt;/script&gt;

&lt;button on:click={() => dispatch('greet', name)}&gt;
  Greet {name}
&lt;/button&gt;

&lt;!-- Parent.svelte --&gt;
&lt;Child name="John" on:greet={(e) => alert(\`Hello \${e.detail}\`)} /&gt;</code></pre>

<h2>Stores</h2>
<pre><code class="language-javascript">// stores.js
import { writable } from 'svelte/store';
export const count = writable(0);

// In component
import { count } from './stores';
$count = 5; // Shorthand for subscription and update</code></pre>

<h2>Conclusion</h2>
<p>Svelte is fast, simple, and powerful. Short learning curve for developers familiar with HTML, CSS, JavaScript.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'System Design Fundamentals',
        slug: 'system-design-fundamentals-en',
        tags: ['System Design', 'Architecture', 'Scalability', 'Interviews', 'Advanced'],
        excerpt: 'Essential system design concepts for interviews and real projects.',
        content: `<h2>Why Learn System Design?</h2>
<p>Applications serving 100 users differ fundamentally from those serving millions. Understanding principles is crucial for scalability and interviews.</p>

<h2>Key Concepts</h2>
<pre><code>Scalability = Handling increased load
Availability = Running without downtime
Consistency = Data accuracy across system
Partition Tolerance = Operating despite failures</code></pre>

<h2>Horizontal vs Vertical Scaling</h2>
<pre><code>Vertical (Scale Up):
- Increase single server power
- Limited and expensive

Horizontal (Scale Out):
- Add more servers
- Flexible, requires different architecture</code></pre>

<h2>Load Balancing</h2>
<pre><code>Client → Load Balancer → Server 1
                       → Server 2
                       → Server 3

Algorithms:
- Round Robin
- Least Connections
- IP Hash</code></pre>

<h2>Caching Strategies</h2>
<pre><code>Client → CDN → Load Balancer → App → Cache → DB

Strategies:
- Cache-Aside: App manages cache
- Write-Through: Write to cache and DB
- Write-Behind: Write cache, async DB</code></pre>

<h2>Conclusion</h2>
<p>System design experience comes from practice. Study real systems like Twitter, Netflix, and Uber architectures.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 13,
    },
    {
        title: 'AWS for Developers: S3 and Lambda',
        slug: 'aws-s3-lambda-developers-en',
        tags: ['AWS', 'S3', 'Lambda', 'Cloud', 'Serverless'],
        excerpt: 'Learn essential AWS services: S3 for storage and Lambda for compute.',
        content: `<h2>What Is AWS?</h2>
<p>Amazon Web Services is the leading cloud provider. Hundreds of services for compute, storage, networking, AI, and more.</p>

<h2>S3 - Cloud Storage</h2>
<pre><code class="language-javascript">const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Upload file
await s3.putObject({
  Bucket: 'my-bucket',
  Key: 'images/photo.jpg',
  Body: fileBuffer,
  ContentType: 'image/jpeg'
}).promise();

// Download file
const data = await s3.getObject({
  Bucket: 'my-bucket',
  Key: 'images/photo.jpg'
}).promise();</code></pre>

<h2>Lambda - Serverless Functions</h2>
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

<h2>Conclusion</h2>
<p>S3 and Lambda are foundational AWS services. Serverless reduces costs and operational burden significantly.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Progressive Web Apps (PWA) Guide',
        slug: 'progressive-web-apps-guide-en',
        tags: ['PWA', 'Web', 'Service Worker', 'Offline', 'Mobile'],
        excerpt: 'Build Progressive Web Apps that work offline and feel native.',
        content: `<h2>What Is a PWA?</h2>
<p>PWAs are web apps that work offline, can be installed, and send notifications. Best of web and native combined.</p>

<h2>Web App Manifest</h2>
<pre><code class="language-json">// manifest.json
{
  "name": "My App",
  "short_name": "App",
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

<h2>Registration</h2>
<pre><code class="language-javascript">if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}</code></pre>

<h2>Conclusion</h2>
<p>PWAs deliver native-like experiences through the web. Workbox simplifies Service Worker creation.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Introduction to Go Programming',
        slug: 'go-programming-introduction-en',
        tags: ['Go', 'Golang', 'Backend', 'Concurrency', 'Basics'],
        excerpt: 'Learn Go, the simple yet powerful language for fast backends.',
        content: `<h2>Why Go?</h2>
<p>Go is simple, fast, and concurrent. Created by Google for large-scale systems. Powers Docker, Kubernetes, and many cloud tools.</p>

<h2>Basic Syntax</h2>
<pre><code class="language-go">package main

import "fmt"

func main() {
    // Variables
    var name string = "John"
    age := 25  // type inference
    
    // Print
    fmt.Printf("Name: %s, Age: %d\\n", name, age)
}</code></pre>

<h2>Functions</h2>
<pre><code class="language-go">// Return multiple values
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
    return fmt.Sprintf("Hello %s", u.Name)
}

user := User{Name: "John", Email: "j@e.com", Age: 25}
fmt.Println(user.Greet())</code></pre>

<h2>Goroutines</h2>
<pre><code class="language-go">go func() {
    fmt.Println("Running concurrently!")
}()</code></pre>

<h2>Conclusion</h2>
<p>Go is simple, fast, and practical. Excellent for APIs, CLI tools, and microservices.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'ElasticSearch Full-Text Search',
        slug: 'elasticsearch-full-text-search-en',
        tags: ['ElasticSearch', 'Search', 'Database', 'Full-text', 'Backend'],
        excerpt: 'Build powerful search functionality with ElasticSearch.',
        content: `<h2>What Is ElasticSearch?</h2>
<p>ElasticSearch is a distributed search and analytics engine. Extremely fast full-text search with JSON documents.</p>

<h2>Core Concepts</h2>
<pre><code>Index    = Like a Database
Document = Like a Row (JSON)
Field    = Like a Column
Mapping  = Like a Schema</code></pre>

<h2>Node.js Client</h2>
<pre><code class="language-javascript">const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

// Index a document
await client.index({
  index: 'posts',
  body: {
    title: 'Programming Article',
    content: 'Article content here...',
    author: 'John',
    date: new Date()
  }
});</code></pre>

<h2>Searching</h2>
<pre><code class="language-javascript">const result = await client.search({
  index: 'posts',
  body: {
    query: {
      multi_match: {
        query: 'programming',
        fields: ['title^2', 'content'] // title weighted higher
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

<h2>Conclusion</h2>
<p>ElasticSearch excels at search and analytics. Resource-intensive but worth it for search-heavy applications.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Rust Programming Fundamentals',
        slug: 'rust-programming-fundamentals-en',
        tags: ['Rust', 'Systems', 'Performance', 'Safety', 'Advanced'],
        excerpt: 'Introduction to Rust, the safe and fast systems language.',
        content: `<h2>Why Rust?</h2>
<p>Rust combines C++ speed with memory safety. No garbage collection, no memory leaks. Consistently loved by developers.</p>

<h2>Basic Syntax</h2>
<pre><code class="language-rust">fn main() {
    // Immutable by default
    let name = "John";
    let mut age = 25;  // mutable
    age = 26;
    
    println!("Name: {}, Age: {}", name, age);
}</code></pre>

<h2>Ownership</h2>
<pre><code class="language-rust">fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 no longer valid (move)
    
    // println!("{}", s1);  // Error!
    
    let s3 = s2.clone();  // Explicit copy
    println!("{} {}", s2, s3);  // ✓
}</code></pre>

<h2>Borrowing</h2>
<pre><code class="language-rust">fn print_length(s: &String) {
    println!("Length: {}", s.len());
}

fn main() {
    let s = String::from("hello");
    print_length(&s);  // Borrow, don't move
    println!("{}", s); // Still valid
}</code></pre>

<h2>Structs and impl</h2>
<pre><code class="language-rust">struct User {
    name: String,
    age: u32,
}

impl User {
    fn greet(&self) -> String {
        format!("Hello {}", self.name)
    }
}</code></pre>

<h2>Conclusion</h2>
<p>Rust has a steep learning curve but provides unique safety guarantees. The compiler is your teacher.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'RESTful API Best Practices',
        slug: 'restful-api-best-practices-en',
        tags: ['REST', 'API', 'Design', 'Backend', 'Best Practices'],
        excerpt: 'Design professional RESTful APIs following industry best practices.',
        content: `<h2>REST Principles</h2>
<p>REST is an architectural style, not a protocol. Based on resources, HTTP methods, and stateless communication.</p>

<h2>Endpoint Naming</h2>
<pre><code>✓ Correct:
GET    /users          Get all users
GET    /users/:id      Get single user
POST   /users          Create user
PUT    /users/:id      Full update
PATCH  /users/:id      Partial update
DELETE /users/:id      Delete user

✗ Wrong:
GET /getUser
POST /createNewUser
DELETE /removeUser/:id</code></pre>

<h2>Status Codes</h2>
<pre><code>200 OK          - Success
201 Created     - Resource created
204 No Content  - Successful deletion
400 Bad Request - Client error
401 Unauthorized - Not authenticated
403 Forbidden   - Not authorized
404 Not Found   - Resource missing
500 Server Error - Internal error</code></pre>

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
    "message": "Invalid email format",
    "details": [
      { "field": "email", "message": "Invalid format" }
    ]
  }
}</code></pre>

<h2>Conclusion</h2>
<p>Consistency matters more than perfection. Document your API well and follow established conventions.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
];
