// Premium English Programming Posts with Code Examples - Part 1
export const premiumProgrammingEn1 = [
    {
        title: 'Complete React Hooks Guide with Practical Examples',
        slug: 'react-hooks-complete-practical-guide',
        tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
        excerpt: 'Master all React Hooks with detailed code examples and real-world use cases.',
        content: `<h2>Introduction to React Hooks</h2>
<p>Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing classes.</p>

<h2>1. useState Hook</h2>
<p>The simplest Hook for managing local state:</p>
<pre><code class="language-javascript">import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // Using object state
  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(c => c + 1)}&gt;
        Increment
      &lt;/button&gt;
      &lt;input 
        value={user.name}
        onChange={e => updateName(e.target.value)}
        placeholder="Enter name"
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>2. useEffect Hook</h2>
<p>Handle side effects like API calls and subscriptions:</p>
<pre><code class="language-javascript">import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchUser() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          \`/api/users/\${userId}\`,
          { signal: controller.signal }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup function
    return () => controller.abort();
  }, [userId]);
  
  if (loading) return &lt;Spinner /&gt;;
  if (error) return &lt;Error message={error} /&gt;;
  
  return (
    &lt;div className="profile"&gt;
      &lt;h1&gt;{user?.name}&lt;/h1&gt;
      &lt;p&gt;{user?.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>3. useReducer Hook</h2>
<p>For complex state logic:</p>
<pre><code class="language-javascript">import { useReducer } from 'react';

const initialState = {
  items: [],
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const addTodo = (text) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: Date.now(), text, completed: false }
    });
  };
  
  return (
    &lt;div&gt;
      {state.loading && &lt;p&gt;Loading...&lt;/p&gt;}
      {state.error && &lt;p&gt;Error: {state.error}&lt;/p&gt;}
      &lt;ul&gt;
        {state.items.map(item => (
          &lt;li key={item.id}&gt;{item.text}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h2>4. useMemo and useCallback</h2>
<p>Performance optimization hooks:</p>
<pre><code class="language-javascript">import { useMemo, useCallback, useState } from 'react';

function ExpensiveList({ items, filter }) {
  // Memoize expensive calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  // Memoize callback function
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
    // Do something with the item
  }, []); // Empty deps = never recreated
  
  return (
    &lt;ul&gt;
      {filteredItems.map(item => (
        &lt;ListItem 
          key={item.id}
          item={item}
          onClick={handleItemClick}
        /&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Memoized child component
const ListItem = React.memo(({ item, onClick }) => {
  return (
    &lt;li onClick={() => onClick(item.id)}&gt;
      {item.name}
    &lt;/li&gt;
  );
});</code></pre>

<h2>5. Custom Hooks</h2>
<p>Create reusable logic:</p>
<pre><code class="language-javascript">// useLocalStorage Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// useDebounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  useEffect(() => {
    if (debouncedQuery) {
      // Fetch search results
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    &lt;input 
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    /&gt;
  );
}</code></pre>

<h2>Conclusion</h2>
<p>React Hooks make your code cleaner and easier to understand. Start with useState and useEffect, then gradually learn the others as needed.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 18,
    },
    {
        title: 'Building a Production-Ready REST API with Node.js',
        slug: 'nodejs-production-ready-rest-api',
        tags: ['Node.js', 'Express', 'MongoDB', 'API', 'Backend'],
        excerpt: 'Complete guide to building a secure, scalable API with authentication, validation, and best practices.',
        content: `<h2>Project Structure</h2>
<pre><code>src/
├── config/
│   ├── database.js
│   └── env.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── validate.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── ApiError.js
│   └── asyncHandler.js
├── validators/
│   └── userValidator.js
└── app.js</code></pre>

<h2>1. Application Setup</h2>
<pre><code class="language-javascript">// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: { error: 'Too many requests, please try again later' }
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;</code></pre>

<h2>2. Custom Error Handling</h2>
<pre><code class="language-javascript">// src/utils/ApiError.js
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  }
  
  // Production
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }
  
  // Programming or unknown error
  console.error('ERROR:', err);
  return res.status(500).json({
    success: false,
    error: 'Something went wrong'
  });
};

module.exports = errorHandler;</code></pre>

<h2>3. Async Handler Utility</h2>
<pre><code class="language-javascript">// src/utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

// Usage in controller
const asyncHandler = require('../utils/asyncHandler');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
});
// No try-catch needed!</code></pre>

<h2>4. Request Validation</h2>
<pre><code class="language-javascript">// src/validators/userValidator.js
const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    throw new ApiError(400, messages.join(', '));
  }
  
  next();
};</code></pre>

<h2>5. Complete Auth Controller</h2>
<pre><code class="language-javascript">// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    success: true,
    token,
    data: { user }
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'Email already in use');
  }
  
  const user = await User.create({ name, email, password });
  createSendToken(user, 201, res);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }
  
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  
  createSendToken(user, 200, res);
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  
  if (!user) {
    throw new ApiError(404, 'No user found with that email');
  }
  
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  
  // Send email with reset token (implement email service)
  
  res.json({
    success: true,
    message: 'Reset token sent to email'
  });
});</code></pre>

<h2>Conclusion</h2>
<p>This guide covers the essential patterns for building a production-ready API. Always remember to use HTTPS in production, keep dependencies updated, and implement proper logging and monitoring.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 22,
    },
    {
        title: 'Advanced TypeScript: Generics and Utility Types Mastery',
        slug: 'advanced-typescript-generics-mastery',
        tags: ['TypeScript', 'JavaScript', 'Types', 'Advanced'],
        excerpt: 'Master Generics and advanced TypeScript types to write more flexible and type-safe code.',
        content: `<h2>Understanding Generics</h2>
<p>Generics allow you to write flexible, reusable code that works with different types while maintaining type safety.</p>

<h2>1. Generic Functions</h2>
<pre><code class="language-typescript">// Basic generic function
function identity&lt;T&gt;(arg: T): T {
  return arg;
}

// Multiple type parameters
function pair&lt;T, U&gt;(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair('hello', 42); // [string, number]

// Constrained generics
interface HasLength {
  length: number;
}

function logLength&lt;T extends HasLength&gt;(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello');     // ✓ string has length
logLength([1, 2, 3]);   // ✓ array has length
logLength({ length: 10 }); // ✓ object has length
// logLength(123);      // ✗ number doesn't have length</code></pre>

<h2>2. Generic Classes</h2>
<pre><code class="language-typescript">class DataStore&lt;T&gt; {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T | undefined {
    return this.items[index];
  }
  
  getAll(): T[] {
    return [...this.items];
  }
  
  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }
  
  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
}

const productStore = new DataStore&lt;Product&gt;();
productStore.add({ id: '1', name: 'Laptop', price: 999 });

const expensive = productStore.filter(p => p.price > 500);</code></pre>

<h2>3. Built-in Utility Types</h2>
<pre><code class="language-typescript">interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Partial&lt;T&gt; - All properties optional
type UpdateUserDto = Partial&lt;User&gt;;

function updateUser(id: string, updates: UpdateUserDto) {
  // updates can have any subset of User properties
}

// Pick&lt;T, K&gt; - Select specific properties
type UserCredentials = Pick&lt;User, 'email' | 'password'&gt;;

// Omit&lt;T, K&gt; - Exclude specific properties
type PublicUser = Omit&lt;User, 'password'&gt;;

// Required&lt;T&gt; - All properties required
type StrictUser = Required&lt;Partial&lt;User&gt;&gt;;

// Readonly&lt;T&gt; - All properties readonly
type ImmutableUser = Readonly&lt;User&gt;;

// Record&lt;K, T&gt; - Create object type with keys K and values T
type Permissions = Record&lt;User['role'], string[]&gt;;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete', 'manage'],
  user: ['read', 'write']
};

// NonNullable&lt;T&gt; - Remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable&lt;MaybeString&gt;; // string

// ReturnType&lt;T&gt; - Get function return type
function createUser() {
  return { id: '1', name: 'John' };
}
type NewUser = ReturnType&lt;typeof createUser&gt;;

// Parameters&lt;T&gt; - Get function parameters as tuple
type CreateUserParams = Parameters&lt;typeof createUser&gt;;</code></pre>

<h2>4. Conditional Types</h2>
<pre><code class="language-typescript">// Basic conditional type
type IsArray&lt;T&gt; = T extends any[] ? true : false;

type Test1 = IsArray&lt;string[]&gt;;  // true
type Test2 = IsArray&lt;string&gt;;    // false

// Infer keyword - extract types
type UnwrapPromise&lt;T&gt; = T extends Promise&lt;infer U&gt; ? U : T;

type A = UnwrapPromise&lt;Promise&lt;string&gt;&gt;;  // string
type B = UnwrapPromise&lt;number&gt;;            // number

// Extract array element type
type ArrayElement&lt;T&gt; = T extends (infer E)[] ? E : never;

type Elem = ArrayElement&lt;number[]&gt;; // number

// Function return type extraction
type GetReturnType&lt;T&gt; = T extends (...args: any[]) => infer R 
  ? R 
  : never;

type FnReturn = GetReturnType&lt;() => string&gt;; // string

// Distributive conditional types
type ToArray&lt;T&gt; = T extends any ? T[] : never;

type StrOrNumArray = ToArray&lt;string | number&gt;; 
// string[] | number[]</code></pre>

<h2>5. Mapped Types</h2>
<pre><code class="language-typescript">// Basic mapped type
type Nullable&lt;T&gt; = {
  [K in keyof T]: T[K] | null;
};

// With modifiers
type Mutable&lt;T&gt; = {
  -readonly [K in keyof T]: T[K];
};

type Optional&lt;T&gt; = {
  [K in keyof T]+?: T[K];
};

// Key remapping (TS 4.1+)
type Getters&lt;T&gt; = {
  [K in keyof T as \`get\${Capitalize&lt;string & K&gt;}\`]: () => T[K];
};

type Setters&lt;T&gt; = {
  [K in keyof T as \`set\${Capitalize&lt;string & K&gt;}\`]: (value: T[K]) => void;
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters&lt;Person&gt;;
// { getName: () => string; getAge: () => number }

// Filter keys by value type
type FilterByType&lt;T, U&gt; = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type StringProps = FilterByType&lt;Person, string&gt;;
// { name: string }</code></pre>

<h2>6. Template Literal Types</h2>
<pre><code class="language-typescript">type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/posts' | '/comments';

type ApiRoute = \`\${HttpMethod} \${Endpoint}\`;
// "GET /users" | "GET /posts" | ... (12 combinations)

// Event handlers
type EventName = 'click' | 'focus' | 'blur';
type Handler = \`on\${Capitalize&lt;EventName&gt;}\`;
// "onClick" | "onFocus" | "onBlur"

// CSS properties
type CSSValue = \`\${number}px\` | \`\${number}rem\` | \`\${number}%\`;

const width: CSSValue = '100px';  // ✓
const height: CSSValue = '50rem'; // ✓
// const bad: CSSValue = '10em';  // ✗</code></pre>

<h2>Conclusion</h2>
<p>Mastering Generics and Utility Types opens up new possibilities for writing advanced, flexible TypeScript code. Start with the basics and progressively explore more complex patterns.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 20,
    },
];
