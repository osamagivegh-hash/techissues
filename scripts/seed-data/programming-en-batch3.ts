// English Programming - Batch 3 (Articles 21-30)
export const programmingEnBatch3 = [
    {
        title: 'Testing JavaScript with Jest',
        slug: 'jest-javascript-testing-en',
        tags: ['Jest', 'Testing', 'JavaScript', 'TDD', 'Unit Tests'],
        excerpt: 'Learn to write reliable tests with Jest testing framework.',
        content: `<h2>Why Testing Matters</h2>
<p>Tests catch bugs early and provide confidence when refactoring. Investment in testing saves debugging time later.</p>

<h2>Getting Started</h2>
<pre><code class="language-bash">npm install --save-dev jest

# In package.json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}</code></pre>

<h2>Basic Tests</h2>
<pre><code class="language-javascript">// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// math.test.js
const { add } = require('./math');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

describe('add function', () => {
  it('handles negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});</code></pre>

<h2>Mocking</h2>
<pre><code class="language-javascript">const fetchData = jest.fn().mockResolvedValue({ data: 'test' });

test('fetches data', async () => {
  const result = await fetchData();
  expect(result.data).toBe('test');
  expect(fetchData).toHaveBeenCalled();
});</code></pre>

<h2>Conclusion</h2>
<p>Start with simple unit tests and expand coverage gradually. Even 50% coverage is better than none.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'GraphQL vs REST: Complete Comparison',
        slug: 'graphql-vs-rest-comparison-en',
        tags: ['GraphQL', 'REST', 'API', 'Backend', 'Apollo'],
        excerpt: 'Compare GraphQL and REST to choose the right API approach for your project.',
        content: `<h2>What Is GraphQL?</h2>
<p>GraphQL is a query language for APIs. Clients request exactly the data they need. Solves over-fetching and under-fetching problems.</p>

<h2>REST Approach</h2>
<pre><code class="language-javascript">// Multiple endpoints needed
GET /users/1
GET /users/1/posts
GET /users/1/followers

// Often returns too much or too little data</code></pre>

<h2>GraphQL Approach</h2>
<pre><code class="language-graphql">query {
  user(id: 1) {
    name
    posts { title }
    followers { name }
  }
}

// One request, exact data needed</code></pre>

<h2>Apollo Server Setup</h2>
<pre><code class="language-javascript">const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    users: [User]
    user(id: ID!): User
  }
\`;

const resolvers = {
  Query: {
    users: () => db.getUsers(),
    user: (_, { id }) => db.getUser(id)
  }
};</code></pre>

<h2>Conclusion</h2>
<p>Use REST for simple APIs and easy caching. Choose GraphQL for complex, interconnected data and mobile apps.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Regular Expressions Practical Guide',
        slug: 'regex-practical-guide-en',
        tags: ['Regex', 'JavaScript', 'Python', 'Pattern Matching', 'Basics'],
        excerpt: 'Master regular expressions for powerful text processing.',
        content: `<h2>What Is Regex?</h2>
<p>Regular expressions are patterns for matching text. Powerful for validation, search, and text manipulation.</p>

<h2>Basic Patterns</h2>
<pre><code class="language-javascript">// Literal matching
/hello/         // Matches "hello"

// Character classes
/[abc]/         // a or b or c
/[a-z]/         // any lowercase letter
/[0-9]/         // any digit
/\\d/            // any digit (shorthand)
/\\w/            // word character (letter, digit, _)
/\\s/            // whitespace</code></pre>

<h2>Quantifiers</h2>
<pre><code class="language-javascript">/a+/            // one or more a's
/a*/            // zero or more a's
/a?/            // zero or one a
/a{3}/          // exactly 3 a's
/a{2,5}/        // 2 to 5 a's</code></pre>

<h2>Practical Examples</h2>
<pre><code class="language-javascript">// Email validation
const emailRegex = /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i;
emailRegex.test('test@email.com'); // true

// Phone number
const phoneRegex = /^\\d{3}-\\d{3}-\\d{4}$/;
phoneRegex.test('123-456-7890'); // true

// Extract numbers
'Price: $150'.match(/\\d+/g); // ['150']</code></pre>

<h2>Conclusion</h2>
<p>Regex is powerful but can be hard to read. Use tools like regex101.com to test and understand patterns.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'WebSocket Real-Time Communication',
        slug: 'websocket-realtime-guide-en',
        tags: ['WebSocket', 'Socket.io', 'Real-time', 'Node.js', 'Chat'],
        excerpt: 'Build real-time applications with WebSocket and Socket.io.',
        content: `<h2>What Is WebSocket?</h2>
<p>WebSocket enables persistent bidirectional communication. Perfect for chat apps, notifications, live updates, and games.</p>

<h2>Socket.io Server</h2>
<pre><code class="language-javascript">const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast to all
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});</code></pre>

<h2>Socket.io Client</h2>
<pre><code class="language-javascript">import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
});

socket.emit('chat message', 'Hello!');

socket.on('chat message', (msg) => {
  displayMessage(msg);
});</code></pre>

<h2>Rooms for Groups</h2>
<pre><code class="language-javascript">// Join a room
socket.join('room-123');

// Send to room only
io.to('room-123').emit('message', 'Room message');

// Leave room
socket.leave('room-123');</code></pre>

<h2>Conclusion</h2>
<p>Socket.io simplifies real-time development significantly. Consider alternatives like Pusher for managed solutions.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Kubernetes Basics for Developers',
        slug: 'kubernetes-basics-developers-en',
        tags: ['Kubernetes', 'K8s', 'DevOps', 'Docker', 'Containers'],
        excerpt: 'Introduction to Kubernetes for managing containerized applications.',
        content: `<h2>What Is Kubernetes?</h2>
<p>Kubernetes (K8s) orchestrates containerized applications at scale. Handles deployment, scaling, and management automatically.</p>

<h2>Core Concepts</h2>
<pre><code>Pod       = Smallest unit, one or more containers
Deployment = Manages multiple identical Pods
Service    = Exposes Pods to network
Ingress    = Routes external traffic</code></pre>

<h2>Deployment YAML</h2>
<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:v1
        ports:
        - containerPort: 3000</code></pre>

<h2>kubectl Commands</h2>
<pre><code class="language-bash">kubectl apply -f deployment.yaml   # Apply configuration
kubectl get pods                   # List pods
kubectl logs pod-name              # View logs
kubectl delete -f deployment.yaml  # Delete resources</code></pre>

<h2>Conclusion</h2>
<p>Kubernetes has a learning curve but provides powerful orchestration. Start with minikube for local development.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Redux Toolkit Modern State Management',
        slug: 'redux-toolkit-state-management-en',
        tags: ['Redux', 'React', 'State', 'Redux Toolkit', 'Frontend'],
        excerpt: 'Learn modern Redux with Redux Toolkit for simpler state management.',
        content: `<h2>Why Redux Toolkit?</h2>
<p>Redux Toolkit simplifies Redux significantly. Reduces boilerplate, includes best practices by default, and handles immutable updates automatically.</p>

<h2>Setting Up Store</h2>
<pre><code class="language-javascript">import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});</code></pre>

<h2>Creating a Slice</h2>
<pre><code class="language-javascript">import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    addBy: (state, action) => { state.value += action.payload; },
  },
});

export const { increment, decrement, addBy } = counterSlice.actions;
export default counterSlice.reducer;</code></pre>

<h2>Using in Components</h2>
<pre><code class="language-javascript">import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}</code></pre>

<h2>Conclusion</h2>
<p>Redux Toolkit is the modern way to use Redux. createSlice dramatically reduces the code needed.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Building CLI Tools with Node.js',
        slug: 'nodejs-cli-tools-en',
        tags: ['Node.js', 'CLI', 'Command Line', 'npm', 'Tools'],
        excerpt: 'Create powerful command-line tools using Node.js.',
        content: `<h2>Why Build CLI Tools?</h2>
<p>CLI tools automate repetitive tasks. Build custom utilities for your projects or share them with the community.</p>

<h2>Project Setup</h2>
<pre><code class="language-json">// package.json
{
  "name": "my-cli",
  "version": "1.0.0",
  "bin": {
    "my-cli": "./index.js"
  }
}</code></pre>

<h2>Main File</h2>
<pre><code class="language-javascript">#!/usr/bin/env node
const { program } = require('commander');

program
  .name('my-cli')
  .version('1.0.0')
  .description('My custom CLI tool');

program
  .command('greet <name>')
  .description('Greet someone')
  .option('-l, --loud', 'Say it loudly')
  .action((name, options) => {
    const greeting = \`Hello \${name}!\`;
    console.log(options.loud ? greeting.toUpperCase() : greeting);
  });

program.parse();</code></pre>

<h2>Adding Colors and Prompts</h2>
<pre><code class="language-javascript">const chalk = require('chalk');
const inquirer = require('inquirer');

console.log(chalk.green.bold('Success!'));
console.log(chalk.red('Error!'));

const answers = await inquirer.prompt([
  { type: 'input', name: 'name', message: 'Your name?' },
  { type: 'confirm', name: 'sure', message: 'Are you sure?' }
]);</code></pre>

<h2>Conclusion</h2>
<p>Commander for commands, chalk for colors, inquirer for interactivity—a powerful combination for CLI tools.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'OAuth 2.0 Authentication Guide',
        slug: 'oauth2-authentication-guide-en',
        tags: ['OAuth', 'Authentication', 'Security', 'JWT', 'API'],
        excerpt: 'Implement secure OAuth 2.0 authentication in your applications.',
        content: `<h2>What Is OAuth 2.0?</h2>
<p>OAuth 2.0 is an authorization standard. It allows apps to access user resources without exposing passwords.</p>

<h2>Key Terms</h2>
<pre><code>Resource Owner = The user
Client         = Your application
Authorization Server = Issues tokens (Google, Facebook)
Resource Server = The API protecting resources
Access Token   = Key to access resources</code></pre>

<h2>Authorization Code Flow</h2>
<pre><code class="language-javascript">// 1. Redirect user to authorization
const authUrl = \`https://auth.example.com/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code&
  scope=read:profile\`;

// 2. Exchange code for token
const response = await fetch('https://auth.example.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  })
});
const { access_token } = await response.json();</code></pre>

<h2>Using Passport.js</h2>
<pre><code class="language-javascript">const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));</code></pre>

<h2>Conclusion</h2>
<p>OAuth 2.0 is the industry standard for secure authorization. Passport.js simplifies integration with multiple providers.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Prisma ORM Database Guide',
        slug: 'prisma-orm-database-guide-en',
        tags: ['Prisma', 'ORM', 'Database', 'TypeScript', 'Node.js'],
        excerpt: 'Master Prisma ORM for type-safe database access.',
        content: `<h2>What Is Prisma?</h2>
<p>Prisma is a modern ORM for Node.js and TypeScript. Type-safe queries, auto-completion, and migrations make database work enjoyable.</p>

<h2>Setup</h2>
<pre><code class="language-bash">npm install prisma @prisma/client
npx prisma init</code></pre>

<h2>Schema Definition</h2>
<pre><code class="language-prisma">// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}</code></pre>

<h2>Migrations</h2>
<pre><code class="language-bash">npx prisma migrate dev --name init
npx prisma generate</code></pre>

<h2>CRUD Operations</h2>
<pre><code class="language-typescript">import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: { email: 'a@b.c', name: 'John' }
});

// Read with relations
const users = await prisma.user.findMany({
  include: { posts: true }
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' }
});</code></pre>

<h2>Conclusion</h2>
<p>Prisma makes database work enjoyable and type-safe. Migrations and auto-generated types prevent many errors.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Clean Architecture Design Principles',
        slug: 'clean-architecture-design-en',
        tags: ['Architecture', 'Clean Code', 'Design Patterns', 'Backend', 'Advanced'],
        excerpt: 'Learn Clean Architecture principles for maintainable, scalable applications.',
        content: `<h2>What Is Clean Architecture?</h2>
<p>Clean Architecture organizes code into independent layers. Makes applications testable, maintainable, and adaptable to change.</p>

<h2>The Layers</h2>
<pre><code>Entities      = Business Objects (core, most independent)
Use Cases     = Application Logic
Controllers   = Interface Adapters
Frameworks    = External (DB, Web, etc.)</code></pre>

<h2>Entity Example</h2>
<pre><code class="language-typescript">// entities/User.ts
class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string
  ) {}
  
  changeName(newName: string): void {
    if (!newName.trim()) throw new Error('Invalid name');
    this.name = newName;
  }
}</code></pre>

<h2>Use Case Example</h2>
<pre><code class="language-typescript">// useCases/CreateUser.ts
interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}
  
  async execute(data: CreateUserDTO): Promise<User> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error('Email exists');
    
    const user = new User(uuid(), data.name, data.email);
    await this.userRepo.save(user);
    return user;
  }
}</code></pre>

<h2>Dependency Rule</h2>
<p>Dependencies point inward only. Entities know nothing about outer layers. This isolation enables flexibility and testing.</p>

<h2>Conclusion</h2>
<p>Clean Architecture is an investment for long-term projects. The structure enables adaptability as requirements evolve.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 13,
    },
];
