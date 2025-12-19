// Premium English Programming Posts with Code Examples - Part 2
export const premiumProgrammingEn2 = [
    {
        title: 'Building Full-Stack Apps with Next.js 14 App Router',
        slug: 'nextjs-14-app-router-full-stack',
        tags: ['Next.js', 'React', 'Full-stack', 'App Router'],
        excerpt: 'Complete practical guide to building full-stack web applications with Next.js 14 latest features.',
        content: `<h2>Project Structure with App Router</h2>
<pre><code>my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── api/
│   │   └── users/
│   │       └── route.ts
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── posts/
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
├── components/
├── lib/
└── public/</code></pre>

<h2>1. Root Layout with Metadata</h2>
<pre><code class="language-typescript">// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'My App',
    template: '%s | My App'
  },
  description: 'Amazing app built with Next.js 14',
  openGraph: {
    title: 'My App',
    description: 'Amazing app built with Next.js 14',
    url: 'https://myapp.com',
    siteName: 'My App',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    &lt;html lang="en"&gt;
      &lt;body className={inter.className}&gt;
        &lt;header&gt;&lt;nav&gt;{/* Navigation */}&lt;/nav&gt;&lt;/header&gt;
        &lt;main&gt;{children}&lt;/main&gt;
        &lt;footer&gt;{/* Footer */}&lt;/footer&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}</code></pre>

<h2>2. Server Components with Data Fetching</h2>
<pre><code class="language-typescript">// app/posts/page.tsx
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

async function getPosts(): Promise&lt;Post[]&gt; {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    &lt;div className="container"&gt;
      &lt;h1&gt;Blog Posts&lt;/h1&gt;
      &lt;div className="grid"&gt;
        {posts.map(post => (
          &lt;article key={post.id}&gt;
            &lt;h2&gt;{post.title}&lt;/h2&gt;
            &lt;p&gt;{post.excerpt}&lt;/p&gt;
            &lt;Link href={\`/posts/\${post.id}\`}&gt;Read more&lt;/Link&gt;
          &lt;/article&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>3. Server Actions with Form Handling</h2>
<pre><code class="language-typescript">// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };
  
  const validated = PostSchema.safeParse(rawData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }
  
  const post = await db.post.create({ data: validated.data });
  revalidatePath('/posts');
  redirect(\`/posts/\${post.id}\`);
}

// Client Component using the action
'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return &lt;button disabled={pending}&gt;{pending ? 'Creating...' : 'Create'}&lt;/button&gt;;
}

export default function NewPostForm() {
  const [state, formAction] = useFormState(createPost, null);
  
  return (
    &lt;form action={formAction}&gt;
      &lt;input name="title" placeholder="Title" required /&gt;
      {state?.errors?.title && &lt;p&gt;{state.errors.title}&lt;/p&gt;}
      &lt;textarea name="content" placeholder="Content" required /&gt;
      &lt;SubmitButton /&gt;
    &lt;/form&gt;
  );
}</code></pre>

<h2>Conclusion</h2>
<p>Next.js 14 with App Router provides a modern, integrated development experience. Leverage Server Components for better performance and Server Actions for simplified code.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        readingTime: 18,
    },
    {
        title: 'Python for AI and Machine Learning: Complete Guide',
        slug: 'python-ai-machine-learning-complete',
        tags: ['Python', 'AI', 'Machine Learning', 'Data Science'],
        excerpt: 'Practical guide to using Python in AI projects with real code examples and best practices.',
        content: `<h2>1. NumPy: Numerical Operations</h2>
<pre><code class="language-python">import numpy as np

# Creating arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Matrix operations
print(matrix.shape)  # (3, 3)
print(matrix.T)      # transpose
print(np.dot(matrix, matrix))  # matrix multiplication

# Special matrices
zeros = np.zeros((3, 3))
ones = np.ones((2, 4))
identity = np.eye(4)
random = np.random.randn(3, 3)

# Statistical operations
data = np.random.randn(1000)
print(f"Mean: {np.mean(data):.4f}")
print(f"Std: {np.std(data):.4f}")</code></pre>

<h2>2. Pandas: Data Analysis</h2>
<pre><code class="language-python">import pandas as pd

# Read and explore data
df = pd.read_csv('data.csv')
print(df.head())
print(df.describe())

# Data cleaning
df = df.dropna()
df = df.drop_duplicates()

# Aggregation
summary = df.groupby('category').agg({
    'sales': ['sum', 'mean'],
    'profit': 'sum'
})

# Filtering
high_sales = df[df['sales'] > 1000]</code></pre>

<h2>3. Scikit-learn: Machine Learning</h2>
<pre><code class="language-python">from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Prepare data
X = df.drop('target', axis=1)
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")</code></pre>

<h2>4. TensorFlow: Neural Networks</h2>
<pre><code class="language-python">import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Build CNN model
model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train
history = model.fit(X_train, y_train, epochs=20, validation_split=0.2)</code></pre>

<h2>Conclusion</h2>
<p>Python is the go-to language for AI thanks to its powerful libraries. Start with NumPy and Pandas for data handling, then move to Scikit-learn and TensorFlow for building models.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        readingTime: 16,
    },
    {
        title: 'Docker and Kubernetes: Complete DevOps Guide',
        slug: 'docker-kubernetes-devops-complete',
        tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
        excerpt: 'Master containerization and orchestration with practical examples and production-ready configurations.',
        content: `<h2>1. Dockerfile Best Practices</h2>
<pre><code class="language-dockerfile"># Multi-stage build for Node.js
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER appuser
EXPOSE 3000

CMD ["node", "dist/server.js"]</code></pre>

<h2>2. Docker Compose for Development</h2>
<pre><code class="language-yaml"># docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mongo_data:</code></pre>

<h2>3. Kubernetes Deployment</h2>
<pre><code class="language-yaml"># deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer</code></pre>

<h2>4. Kubernetes Ingress</h2>
<pre><code class="language-yaml"># ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.com
    secretName: myapp-tls
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80</code></pre>

<h2>Conclusion</h2>
<p>Docker and Kubernetes are essential tools for modern DevOps. Master containerization first, then move to orchestration for scalable deployments.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
        readingTime: 18,
    },
];
