// English Programming - Batch 1 (Articles 1-10)
export const programmingEnBatch1 = [
    {
        title: 'Complete React Hooks Guide for Beginners',
        slug: 'react-hooks-guide-beginners-en',
        tags: ['React', 'Hooks', 'JavaScript', 'Frontend', 'Tutorial'],
        excerpt: 'Master React Hooks from scratch with practical examples and best practices.',
        content: `<h2>What Are React Hooks?</h2>
<p>Hooks let you use state and other React features in functional components. Introduced in React 16.8, they eliminate the need for class components in most cases.</p>

<h2>useState Hook</h2>
<p>The most basic hook for managing local state in components.</p>
<pre><code class="language-javascript">const [count, setCount] = useState(0);

// Usage
setCount(count + 1);
setCount(prev => prev + 1); // Preferred for dependent updates</code></pre>

<h2>useEffect Hook</h2>
<p>Handle side effects like API calls, subscriptions, and DOM manipulation.</p>
<pre><code class="language-javascript">useEffect(() => {
  fetchData();
  return () => cleanup(); // Cleanup on unmount
}, [dependency]); // Runs when dependency changes</code></pre>

<h2>Rules of Hooks</h2>
<p>Only call hooks at the top level—never inside loops or conditions. Only call hooks in React function components or custom hooks.</p>

<h2>Conclusion</h2>
<p>useState and useEffect cover most use cases. Learn useContext and useReducer for advanced state management scenarios.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Building RESTful APIs with Node.js and Express',
        slug: 'nodejs-express-rest-api-en',
        tags: ['Node.js', 'Express', 'API', 'Backend', 'JavaScript'],
        excerpt: 'Comprehensive guide to building professional REST APIs using Node.js and Express.',
        content: `<h2>Project Setup</h2>
<p>Start by installing Express and structuring your project properly.</p>
<pre><code class="language-bash">npm init -y
npm install express mongoose dotenv cors</code></pre>

<h2>Server Configuration</h2>
<pre><code class="language-javascript">const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log('Server running on port 3000'));</code></pre>

<h2>Creating Routes</h2>
<pre><code class="language-javascript">// routes/users.js
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);</code></pre>

<h2>Best Practices</h2>
<p>Use middleware for authentication. Separate routes from controllers. Implement proper error handling with try-catch blocks.</p>

<h2>Conclusion</h2>
<p>Express makes building APIs straightforward. Good architecture and middleware ensure maintainability and scalability.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Advanced TypeScript: Generics and Types',
        slug: 'advanced-typescript-generics-en',
        tags: ['TypeScript', 'Generics', 'Types', 'JavaScript', 'Advanced'],
        excerpt: 'Master TypeScript Generics and advanced types for flexible, type-safe code.',
        content: `<h2>What Are Generics?</h2>
<p>Generics allow writing components that work with various types while maintaining type safety throughout your code.</p>
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
<pre><code class="language-typescript">// Partial - all properties optional
type UpdateUser = Partial<User>;

// Pick - select specific properties
type UserName = Pick<User, 'firstName' | 'lastName'>;

// Omit - exclude properties
type PublicUser = Omit<User, 'password'>;</code></pre>

<h2>Conclusion</h2>
<p>Generics make code flexible and type-safe simultaneously. Utility Types reduce repetition and improve maintainability.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Python Fundamentals for Beginners',
        slug: 'python-basics-beginners-en',
        tags: ['Python', 'Beginners', 'Programming', 'Tutorial', 'Basics'],
        excerpt: 'Learn Python programming basics with simple, practical examples.',
        content: `<h2>Why Python?</h2>
<p>Python is beginner-friendly yet powerful. Used for web development, AI, data science, and automation. One of the most versatile languages to learn.</p>

<h2>Variables and Types</h2>
<pre><code class="language-python"># Python infers types automatically
name = "John"              # String
age = 25                   # Integer
height = 5.9               # Float
is_student = True          # Boolean</code></pre>

<h2>Conditionals</h2>
<pre><code class="language-python">if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")</code></pre>

<h2>Loops</h2>
<pre><code class="language-python"># for loop
for i in range(5):
    print(i)

# while loop
while count < 10:
    count += 1</code></pre>

<h2>Functions</h2>
<pre><code class="language-python">def greet(name):
    return f"Hello, {name}!"

message = greet("Sarah")  # "Hello, Sarah!"</code></pre>

<h2>Conclusion</h2>
<p>Python's simple syntax makes it ideal for beginners. Practice with small projects to reinforce concepts.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Building Apps with Next.js 14 App Router',
        slug: 'nextjs-14-app-router-en',
        tags: ['Next.js', 'React', 'App Router', 'Frontend', 'SSR'],
        excerpt: 'Learn to build modern web applications using Next.js 14 App Router.',
        content: `<h2>What's New in App Router?</h2>
<p>Next.js 14 uses App Router by default. It supports React Server Components and dramatically improves performance.</p>

<h2>Project Structure</h2>
<pre><code>app/
├── layout.tsx      # Shared layout
├── page.tsx        # Home page
├── about/
│   └── page.tsx    # /about route
└── blog/
    ├── page.tsx    # /blog route
    └── [slug]/
        └── page.tsx  # /blog/:slug dynamic route</code></pre>

<h2>Server vs Client Components</h2>
<pre><code class="language-typescript">// Server Component (default)
async function ProductList() {
  const products = await fetchProducts();
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// Client Component (opt-in)
'use client';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}</code></pre>

<h2>Conclusion</h2>
<p>App Router changes how we build React applications. Server Components deliver better performance and simpler data fetching.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Git and GitHub Beginner\'s Guide',
        slug: 'git-github-beginners-guide-en',
        tags: ['Git', 'GitHub', 'Version Control', 'Basics', 'Collaboration'],
        excerpt: 'Learn Git and GitHub from scratch for version control and team collaboration.',
        content: `<h2>What Is Git?</h2>
<p>Git is a version control system that tracks changes in code. It enables collaboration and lets you revert to previous versions when needed.</p>

<h2>Essential Commands</h2>
<pre><code class="language-bash"># Initialize new repository
git init

# Stage files for commit
git add .

# Commit changes
git commit -m "Clear message describing the change"

# Push to remote
git push origin main</code></pre>

<h2>Working with Branches</h2>
<pre><code class="language-bash"># Create new branch
git branch feature-login

# Switch to branch
git checkout feature-login
# or
git switch feature-login

# Merge branch
git merge feature-login</code></pre>

<h2>GitHub Workflow</h2>
<p>Clone to download, Fork to copy, and Pull Requests to contribute. GitHub makes collaboration seamless.</p>

<h2>Conclusion</h2>
<p>Git is essential for every developer. Start with add, commit, and push, then learn branching gradually.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'CSS Grid Complete Tutorial',
        slug: 'css-grid-complete-guide-en',
        tags: ['CSS', 'Grid', 'Layout', 'Frontend', 'Design'],
        excerpt: 'Master CSS Grid for building flexible, modern web layouts.',
        content: `<h2>What Is CSS Grid?</h2>
<p>CSS Grid is a two-dimensional layout system. Control rows and columns simultaneously. More powerful than Flexbox for complex layouts.</p>

<h2>Creating a Grid</h2>
<pre><code class="language-css">.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 columns */
  grid-template-rows: auto 1fr auto;  /* 3 rows */
  gap: 20px; /* spacing between items */
}</code></pre>

<h2>Placing Items</h2>
<pre><code class="language-css">.header {
  grid-column: 1 / -1; /* spans all columns */
}

.sidebar {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}

.main {
  grid-area: 2 / 2 / 3 / 4; /* row-start/col-start/row-end/col-end */
}</code></pre>

<h2>Grid Template Areas</h2>
<pre><code class="language-css">.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }</code></pre>

<h2>Conclusion</h2>
<p>CSS Grid simplifies complex layouts. Combine with Flexbox for best results in different scenarios.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Modern JavaScript ES6+ Features',
        slug: 'javascript-es6-features-en',
        tags: ['JavaScript', 'ES6', 'Modern JS', 'Frontend', 'Basics'],
        excerpt: 'Discover essential modern JavaScript features from ES6 and beyond.',
        content: `<h2>const and let</h2>
<p>Use const for constants and let for variables. Avoid var entirely in modern code.</p>
<pre><code class="language-javascript">const PI = 3.14159;    // Constant
let count = 0;         // Variable
count = 1;             // ✓ Allowed
PI = 3;                // ✗ Error</code></pre>

<h2>Arrow Functions</h2>
<pre><code class="language-javascript">// Traditional
const add = function(a, b) { return a + b; };

// ES6 Arrow
const add = (a, b) => a + b;
const greet = name => \`Hello, \${name}\`;</code></pre>

<h2>Destructuring</h2>
<pre><code class="language-javascript">// Objects
const { name, age } = user;

// Arrays
const [first, second, ...rest] = numbers;

// Parameters
function greet({ name, greeting = "Hello" }) {
  return \`\${greeting}, \${name}\`;
}</code></pre>

<h2>Spread and Rest</h2>
<pre><code class="language-javascript">// Spread
const merged = [...arr1, ...arr2];
const copy = { ...obj, newProp: value };

// Rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}</code></pre>

<h2>Conclusion</h2>
<p>ES6+ features make JavaScript cleaner and more powerful. Master these fundamentals for modern development.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Building APIs with FastAPI and Python',
        slug: 'fastapi-python-api-en',
        tags: ['Python', 'FastAPI', 'API', 'Backend', 'Async'],
        excerpt: 'Learn to build fast, modern APIs using FastAPI with Python.',
        content: `<h2>Why FastAPI?</h2>
<p>FastAPI is one of the fastest Python frameworks. Built-in async support, automatic docs generation, and native validation make development efficient.</p>

<h2>Quick Start</h2>
<pre><code class="language-python">from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

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
    return {"user": user, "message": "Created"}</code></pre>

<h2>Async Support</h2>
<pre><code class="language-python">@app.get("/async-items/")
async def get_items():
    items = await fetch_items_from_db()
    return items</code></pre>

<h2>Conclusion</h2>
<p>FastAPI combines speed and ease of use. Automatic Swagger documentation saves significant development time.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Docker Introduction for Developers',
        slug: 'docker-intro-developers-en',
        tags: ['Docker', 'DevOps', 'Containers', 'Deployment', 'Basics'],
        excerpt: 'Learn Docker basics to containerize your applications.',
        content: `<h2>What Is Docker?</h2>
<p>Docker packages your application with all dependencies into a container. Ensures consistent behavior across development, testing, and production environments.</p>

<h2>Dockerfile</h2>
<pre><code class="language-dockerfile">FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]</code></pre>

<h2>Essential Commands</h2>
<pre><code class="language-bash"># Build the image
docker build -t my-app .

# Run a container
docker run -p 3000:3000 my-app

# List containers
docker ps

# Stop container
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

<h2>Conclusion</h2>
<p>Docker eliminates "works on my machine" problems forever. Essential for modern development and deployment workflows.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
        readingTime: 11,
    },
];
