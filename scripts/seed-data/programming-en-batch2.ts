// English Programming - Batch 2 (Articles 11-20)
export const programmingEnBatch2 = [
    {
        title: 'Building Mobile Apps with React Native',
        slug: 'react-native-mobile-apps-en',
        tags: ['React Native', 'Mobile', 'iOS', 'Android', 'JavaScript'],
        excerpt: 'Learn to build cross-platform mobile applications with React Native.',
        content: `<h2>Why React Native?</h2>
<p>React Native lets you build iOS and Android apps with one codebase. Write in JavaScript and React, deploy native apps. Used by Facebook, Instagram, and countless others.</p>

<h2>Getting Started</h2>
<pre><code class="language-bash">npx create-expo-app MyApp
cd MyApp
npx expo start</code></pre>

<h2>Creating Components</h2>
<pre><code class="language-javascript">import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#3498db', padding: 15, borderRadius: 8 },
  text: { color: 'white', fontWeight: 'bold' }
});</code></pre>

<h2>Navigation</h2>
<pre><code class="language-javascript">import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}</code></pre>

<h2>Conclusion</h2>
<p>React Native offers the best of both worlds—React knowledge plus native performance. Expo simplifies the development process.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'SQL Database Fundamentals',
        slug: 'sql-database-fundamentals-en',
        tags: ['SQL', 'Database', 'MySQL', 'PostgreSQL', 'Backend'],
        excerpt: 'Master SQL fundamentals for working with relational databases.',
        content: `<h2>What Is SQL?</h2>
<p>SQL (Structured Query Language) is the standard language for relational databases. Used to create, read, update, and delete data in MySQL, PostgreSQL, SQLite, and more.</p>

<h2>Basic Queries</h2>
<pre><code class="language-sql">-- Select all users
SELECT * FROM users;

-- Select specific columns with condition
SELECT name, email FROM users WHERE age > 18;

-- Order results
SELECT * FROM products ORDER BY price DESC;</code></pre>

<h2>Inserting and Updating</h2>
<pre><code class="language-sql">-- Insert new row
INSERT INTO users (name, email, age)
VALUES ('John', 'john@email.com', 25);

-- Update existing row
UPDATE users SET age = 26 WHERE id = 1;

-- Delete row
DELETE FROM users WHERE id = 1;</code></pre>

<h2>Joining Tables</h2>
<pre><code class="language-sql">-- Get users with their orders
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';</code></pre>

<h2>Conclusion</h2>
<p>SQL is essential for any backend developer. Master CRUD operations and JOINs first, then explore advanced features.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Introduction to AI and Machine Learning with Python',
        slug: 'ai-machine-learning-python-en',
        tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow', 'Data Science'],
        excerpt: 'Get started with AI and machine learning using Python and popular libraries.',
        content: `<h2>What Is Machine Learning?</h2>
<p>Machine Learning enables computers to learn from data without explicit programming. It powers recommendation systems, image recognition, and language translation.</p>

<h2>Essential Libraries</h2>
<pre><code class="language-python">import numpy as np        # Numerical computing
import pandas as pd       # Data manipulation
import matplotlib.pyplot as plt  # Visualization
from sklearn import datasets, model_selection, metrics</code></pre>

<h2>First ML Model</h2>
<pre><code class="language-python">from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Load and split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict and evaluate
predictions = model.predict(X_test)
accuracy = metrics.accuracy_score(y_test, predictions)</code></pre>

<h2>Learning Path</h2>
<p>Start with scikit-learn, then TensorFlow or PyTorch for deep learning. Practice with Kaggle competitions.</p>

<h2>Conclusion</h2>
<p>AI is accessible with Python and the right libraries. Start with simple models and increase complexity gradually.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Web Security Fundamentals for Developers',
        slug: 'web-security-fundamentals-en',
        tags: ['Security', 'Web', 'XSS', 'CSRF', 'Best Practices'],
        excerpt: 'Essential web security knowledge every developer must understand.',
        content: `<h2>Why Security Matters</h2>
<p>Security vulnerabilities can expose user data and damage trust. Understanding common attacks helps you prevent them.</p>

<h2>Cross-Site Scripting (XSS)</h2>
<pre><code class="language-javascript">// Vulnerable:
element.innerHTML = userInput; // Never do this!

// Safe:
element.textContent = userInput;
// Or use proper sanitization libraries</code></pre>

<h2>SQL Injection</h2>
<pre><code class="language-javascript">// Vulnerable:
query = "SELECT * FROM users WHERE id = " + userId;

// Safe - parameterized query:
query = "SELECT * FROM users WHERE id = ?";
db.execute(query, [userId]);</code></pre>

<h2>CSRF Protection</h2>
<pre><code class="language-html"><!-- Include token in forms -->
<form method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
</form></code></pre>

<h2>Best Practices</h2>
<p>Use HTTPS everywhere. Validate all input. Implement proper authentication. Keep dependencies updated. Use security headers.</p>

<h2>Conclusion</h2>
<p>Security should be considered from day one, not added later. Learn OWASP Top 10 for comprehensive coverage.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Vue.js 3 Composition API Guide',
        slug: 'vue3-composition-api-en',
        tags: ['Vue.js', 'Vue 3', 'Composition API', 'Frontend', 'JavaScript'],
        excerpt: 'Master Vue 3 Composition API for building reactive applications.',
        content: `<h2>Why Composition API?</h2>
<p>Composition API organizes code by feature instead of option type. Better TypeScript support and code reuse through composables.</p>

<h2>Reactive State</h2>
<pre><code class="language-javascript">import { ref, reactive, computed } from 'vue';

const count = ref(0);
const state = reactive({ name: 'Vue', version: 3 });

const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}</code></pre>

<h2>Component Example</h2>
<pre><code class="language-vue">&lt;script setup&gt;
import { ref } from 'vue';

const message = ref('Hello Vue 3!');
&lt;/script&gt;

&lt;template&gt;
  &lt;h1&gt;{{ message }}&lt;/h1&gt;
  &lt;input v-model="message" /&gt;
&lt;/template&gt;</code></pre>

<h2>Composables</h2>
<pre><code class="language-javascript">// composables/useMouse.js
export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  
  onMounted(() => {
    window.addEventListener('mousemove', update);
  });
  
  return { x, y };
}</code></pre>

<h2>Conclusion</h2>
<p>Composition API is the future of Vue development. It offers better organization and reusability for complex applications.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'MongoDB Complete Guide for Developers',
        slug: 'mongodb-complete-guide-en',
        tags: ['MongoDB', 'NoSQL', 'Database', 'Backend', 'Node.js'],
        excerpt: 'Learn MongoDB fundamentals and best practices for modern applications.',
        content: `<h2>Why MongoDB?</h2>
<p>MongoDB is a document database storing data as flexible JSON-like documents. Schema-less design allows rapid development and easy scaling.</p>

<h2>Basic Operations</h2>
<pre><code class="language-javascript">// Insert
db.users.insertOne({ name: "John", email: "john@email.com" });

// Find
db.users.find({ age: { $gte: 18 } });
db.users.findOne({ email: "john@email.com" });

// Update
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { age: 26 } }
);

// Delete
db.users.deleteOne({ _id: ObjectId("...") });</code></pre>

<h2>Mongoose with Node.js</h2>
<pre><code class="language-javascript">const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const user = await User.create({ name: 'John', email: 'j@e.com' });</code></pre>

<h2>Conclusion</h2>
<p>MongoDB excels for applications with evolving schemas and complex data relationships. Mongoose provides structure with flexibility.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Linux Command Line Essentials',
        slug: 'linux-command-line-en',
        tags: ['Linux', 'Command Line', 'Terminal', 'DevOps', 'Basics'],
        excerpt: 'Essential Linux commands every developer should master.',
        content: `<h2>Why Learn Command Line?</h2>
<p>Servers run Linux. Command line is faster for many tasks. Essential for DevOps, server administration, and automation.</p>

<h2>File Navigation</h2>
<pre><code class="language-bash">pwd                    # Print current directory
ls -la                 # List with details
cd /path/to/dir        # Change directory
cd ..                  # Go up one level
find . -name "*.js"    # Find files</code></pre>

<h2>File Operations</h2>
<pre><code class="language-bash">mkdir dirname          # Create directory
touch file.txt         # Create empty file
cp source dest         # Copy
mv source dest         # Move/rename
rm -rf directory       # Delete (careful!)</code></pre>

<h2>Text Processing</h2>
<pre><code class="language-bash">cat file.txt           # Display contents
head -n 20 file.txt    # First 20 lines
tail -f logfile        # Follow log updates
grep "pattern" file    # Search in file</code></pre>

<h2>Process Management</h2>
<pre><code class="language-bash">ps aux                 # List processes
kill PID               # Stop process
htop                   # Interactive process viewer</code></pre>

<h2>Conclusion</h2>
<p>Command line proficiency accelerates your workflow. Practice daily and learn one new command at a time.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Tailwind CSS Utility-First Guide',
        slug: 'tailwind-css-utility-guide-en',
        tags: ['Tailwind CSS', 'CSS', 'Frontend', 'Design', 'Utility'],
        excerpt: 'Master Tailwind CSS for rapid, utility-first web development.',
        content: `<h2>What Is Tailwind?</h2>
<p>Tailwind CSS uses utility classes for styling instead of custom CSS. Build designs directly in HTML without writing custom stylesheets.</p>

<h2>Basic Usage</h2>
<pre><code class="language-html">&lt;button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"&gt;
  Click Me
&lt;/button&gt;

&lt;div class="flex items-center justify-between p-4 bg-gray-100"&gt;
  &lt;h1 class="text-2xl font-bold text-gray-800"&gt;Title&lt;/h1&gt;
  &lt;p class="text-gray-600"&gt;Subtitle&lt;/p&gt;
&lt;/div&gt;</code></pre>

<h2>Responsive Design</h2>
<pre><code class="language-html">&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"&gt;
  &lt;!-- Responsive grid --&gt;
&lt;/div&gt;

&lt;p class="text-sm md:text-base lg:text-lg"&gt;
  Responsive text
&lt;/p&gt;</code></pre>

<h2>Custom Configuration</h2>
<pre><code class="language-javascript">// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#FF5733',
      },
    },
  },
};</code></pre>

<h2>Conclusion</h2>
<p>Tailwind accelerates development once you learn the utility naming conventions. Combine with component libraries for maximum efficiency.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Flutter Mobile Development Guide',
        slug: 'flutter-mobile-development-en',
        tags: ['Flutter', 'Dart', 'Mobile', 'iOS', 'Android'],
        excerpt: 'Build beautiful cross-platform mobile apps with Flutter and Dart.',
        content: `<h2>Why Flutter?</h2>
<p>Flutter builds native iOS and Android apps from single codebase. Hot reload enables instant UI updates. Beautiful Material and Cupertino widgets included.</p>

<h2>Getting Started</h2>
<pre><code class="language-dart">import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('My App')),
        body: Center(child: Text('Hello Flutter!')),
      ),
    );
  }
}</code></pre>

<h2>Stateful Widget</h2>
<pre><code class="language-dart">class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State&lt;Counter&gt; {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}</code></pre>

<h2>Conclusion</h2>
<p>Flutter's widget-based approach creates consistent, beautiful UIs. Hot reload makes development incredibly efficient.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Redis Caching for Application Performance',
        slug: 'redis-caching-performance-en',
        tags: ['Redis', 'Caching', 'Performance', 'Backend', 'Database'],
        excerpt: 'Improve application performance with Redis caching strategies.',
        content: `<h2>What Is Redis?</h2>
<p>Redis is an in-memory data store. Extremely fast read/write operations. Used for caching, sessions, message queues, and real-time analytics.</p>

<h2>Basic Operations</h2>
<pre><code class="language-javascript">const redis = require('redis');
const client = redis.createClient();

// String operations
await client.set('key', 'value');
await client.set('key', 'value', { EX: 3600 }); // Expires in 1 hour
const value = await client.get('key');

// Delete
await client.del('key');</code></pre>

<h2>Caching Pattern</h2>
<pre><code class="language-javascript">async function getUser(userId) {
  // Check cache first
  const cached = await client.get(\`user:\${userId}\`);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const user = await db.users.findById(userId);
  
  // Store in cache
  await client.set(\`user:\${userId}\`, JSON.stringify(user), { EX: 300 });
  
  return user;
}</code></pre>

<h2>Data Structures</h2>
<pre><code class="language-javascript">// Hash
await client.hSet('user:1', { name: 'John', email: 'j@e.com' });

// List
await client.lPush('queue', 'task1');
await client.rPop('queue');

// Set
await client.sAdd('tags', 'javascript', 'nodejs');</code></pre>

<h2>Conclusion</h2>
<p>Redis dramatically improves performance for read-heavy applications. Essential knowledge for backend developers.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
];
