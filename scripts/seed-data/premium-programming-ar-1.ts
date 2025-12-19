// Premium Arabic Programming Posts with Code Examples - Part 1
export const premiumProgrammingAr1 = [
    {
        title: 'دليل React Hooks الشامل مع أمثلة عملية',
        slug: 'react-hooks-complete-guide-examples',
        tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
        excerpt: 'تعلم جميع React Hooks بالتفصيل مع أمثلة كود عملية وحالات استخدام حقيقية.',
        content: `<h2>مقدمة في React Hooks</h2>
<p>Hooks هي ميزة جديدة في React 16.8 تسمح باستخدام state وميزات React الأخرى بدون كتابة classes.</p>

<h2>1. useState Hook</h2>
<p>أبسط Hook لإدارة الحالة المحلية:</p>
<pre><code class="language-javascript">import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;العدد: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        زيادة
      &lt;/button&gt;
      &lt;button onClick={() => setCount(prev => prev - 1)}&gt;
        نقصان
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>2. useEffect Hook</h2>
<p>للتعامل مع الـ side effects مثل API calls:</p>
<pre><code class="language-javascript">import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // يعمل عند تغيير userId
  
  if (loading) return &lt;p&gt;جاري التحميل...&lt;/p&gt;;
  return &lt;h1&gt;{user?.name}&lt;/h1&gt;;
}</code></pre>

<h2>3. useContext Hook</h2>
<p>للوصول إلى Context بسهولة:</p>
<pre><code class="language-javascript">import { createContext, useContext, useState } from 'react';

// إنشاء Context للثيم
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    &lt;ThemeContext.Provider value={{ theme, toggleTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}

// استخدام الثيم في أي مكون
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    &lt;button 
      onClick={toggleTheme}
      style={{ 
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333'
      }}
    &gt;
      تبديل الثيم
    &lt;/button&gt;
  );
}</code></pre>

<h2>4. Custom Hook</h2>
<p>إنشاء Hook مخصص لإعادة الاستخدام:</p>
<pre><code class="language-javascript">// Custom Hook لجلب البيانات
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, { 
          signal: controller.signal 
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
}

// استخدام الـ Custom Hook
function Posts() {
  const { data, loading, error } = useFetch('/api/posts');
  
  if (loading) return &lt;p&gt;جاري التحميل...&lt;/p&gt;;
  if (error) return &lt;p&gt;خطأ: {error}&lt;/p&gt;;
  
  return (
    &lt;ul&gt;
      {data?.map(post => (
        &lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

<h2>الخلاصة</h2>
<p>React Hooks تجعل الكود أنظف وأسهل في الفهم والصيانة. ابدأ بـ useState و useEffect ثم تعلم الباقي تدريجياً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 15,
    },
    {
        title: 'بناء REST API احترافي بـ Node.js و Express و MongoDB',
        slug: 'nodejs-express-mongodb-rest-api',
        tags: ['Node.js', 'Express', 'MongoDB', 'API', 'Backend'],
        excerpt: 'دليل شامل لبناء API متكامل مع التحقق والأمان وأفضل الممارسات.',
        content: `<h2>هيكل المشروع</h2>
<pre><code>project/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── ApiError.js
│   └── app.js
├── .env
└── package.json</code></pre>

<h2>1. إعداد قاعدة البيانات</h2>
<pre><code class="language-javascript">// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;</code></pre>

<h2>2. نموذج المستخدم مع Validation</h2>
<pre><code class="language-javascript">// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true,
    minlength: [3, 'الاسم يجب أن يكون 3 أحرف على الأقل']
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    lowercase: true,
    match: [/^\\S+@\\S+\\.\\S+$/, 'بريد إلكتروني غير صالح']
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: [6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// تشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// التحقق من كلمة المرور
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);</code></pre>

<h2>3. Middleware للمصادقة</h2>
<pre><code class="language-javascript">// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح - يرجى تسجيل الدخول'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token غير صالح'
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول'
      });
    }
    next();
  };
};</code></pre>

<h2>4. Controller للمستخدمين</h2>
<pre><code class="language-javascript">// src/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      });
    }
    
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }
    
    const token = signToken(user._id);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};</code></pre>

<h2>الخلاصة</h2>
<p>هذا الدليل يغطي الأساسيات لبناء API آمن وقابل للتوسع. تذكر دائماً استخدام HTTPS في الإنتاج وتحديث التبعيات بانتظام.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 20,
    },
    {
        title: 'TypeScript المتقدم: Generics و Utility Types',
        slug: 'advanced-typescript-generics-utility-types',
        tags: ['TypeScript', 'JavaScript', 'Types', 'Advanced'],
        excerpt: 'إتقان الـ Generics وأنواع TypeScript المتقدمة لكتابة كود أكثر مرونة وأماناً.',
        content: `<h2>مقدمة في Generics</h2>
<p>Generics تسمح بكتابة كود مرن يعمل مع أنواع مختلفة مع الحفاظ على type safety.</p>

<h2>1. Generic Functions</h2>
<pre><code class="language-typescript">// دالة عادية
function firstElement(arr: any[]): any {
  return arr[0];
}

// دالة Generic - أفضل!
function firstElement&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0];
}

// الاستخدام
const num = firstElement([1, 2, 3]); // type: number
const str = firstElement(['a', 'b']); // type: string

// Generic مع قيود
function longest&lt;T extends { length: number }&gt;(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest('hello', 'world'); // ✓
longest([1, 2], [1, 2, 3]); // ✓
longest(10, 100); // ✗ Error: number ليس له length</code></pre>

<h2>2. Generic Interfaces و Types</h2>
<pre><code class="language-typescript">// Generic Interface
interface ApiResponse&lt;T&gt; {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
}

// استخدام مع أنواع مختلفة
type UserResponse = ApiResponse&lt;User&gt;;
type PostsResponse = ApiResponse&lt;Post[]&gt;;

// Generic Type مع عدة parameters
type KeyValuePair&lt;K, V&gt; = {
  key: K;
  value: V;
};

const pair: KeyValuePair&lt;string, number&gt; = {
  key: 'age',
  value: 25
};</code></pre>

<h2>3. Utility Types المدمجة</h2>
<pre><code class="language-typescript">interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial - جميع الخصائص اختيارية
type UpdateUserDto = Partial&lt;User&gt;;
// { id?: string; name?: string; ... }

// Required - جميع الخصائص مطلوبة
type RequiredUser = Required&lt;UpdateUserDto&gt;;

// Pick - اختيار خصائص محددة
type UserPreview = Pick&lt;User, 'id' | 'name'&gt;;
// { id: string; name: string }

// Omit - استبعاد خصائص محددة
type PublicUser = Omit&lt;User, 'password'&gt;;
// { id, name, email, createdAt }

// Readonly - جميع الخصائص للقراءة فقط
type ImmutableUser = Readonly&lt;User&gt;;

// Record - إنشاء object type
type UserRoles = Record&lt;'admin' | 'user' | 'guest', string[]&gt;;
const permissions: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};</code></pre>

<h2>4. Conditional Types</h2>
<pre><code class="language-typescript">// Conditional Type أساسي
type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString&lt;string&gt;;  // true
type B = IsString&lt;number&gt;;  // false

// استخراج نوع من Array
type ArrayElement&lt;T&gt; = T extends (infer E)[] ? E : never;

type NumElement = ArrayElement&lt;number[]&gt;; // number
type StrElement = ArrayElement&lt;string[]&gt;; // string

// استخراج نوع Promise
type Awaited&lt;T&gt; = T extends Promise&lt;infer R&gt; ? R : T;

type Result = Awaited&lt;Promise&lt;string&gt;&gt;; // string

// Exclude و Extract
type T1 = Exclude&lt;'a' | 'b' | 'c', 'a'&gt;; // 'b' | 'c'
type T2 = Extract&lt;'a' | 'b' | 'c', 'a' | 'f'&gt;; // 'a'</code></pre>

<h2>5. Mapped Types</h2>
<pre><code class="language-typescript">// إنشاء Mapped Type مخصص
type Nullable&lt;T&gt; = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable&lt;User&gt;;
// كل الخصائص يمكن أن تكون null

// مع modifiers
type Mutable&lt;T&gt; = {
  -readonly [K in keyof T]: T[K];
};

type RequiredProps&lt;T&gt; = {
  [K in keyof T]-?: T[K];
};

// Mapped Type متقدم
type Getters&lt;T&gt; = {
  [K in keyof T as \`get\${Capitalize&lt;string & K&gt;}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters&lt;Person&gt;;
// { getName: () => string; getAge: () => number; }</code></pre>

<h2>الخلاصة</h2>
<p>إتقان Generics و Utility Types يفتح آفاقاً جديدة لكتابة كود TypeScript متقدم ومرن. ابدأ بالأساسيات ثم تعمق تدريجياً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 18,
    },
];
