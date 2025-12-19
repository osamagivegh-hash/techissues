// Arabic Programming - Batch 3 (Articles 21-30)
export const programmingArBatch3 = [
    {
        title: 'Jest و Testing في JavaScript',
        slug: 'jest-javascript-testing-ar',
        tags: ['Jest', 'Testing', 'JavaScript', 'TDD', 'Unit Tests'],
        excerpt: 'تعلم اختبار الكود باستخدام Jest لضمان جودة تطبيقاتك.',
        content: `<h2>لماذا الاختبارات؟</h2>
<p>الاختبارات تكشف الأخطاء مبكراً وتمنح الثقة للتعديل. استثمار يوفر وقتاً كثيراً لاحقاً.</p>

<h2>إعداد Jest</h2>
<pre><code class="language-bash">npm install --save-dev jest

# في package.json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}</code></pre>

<h2>اختبار أساسي</h2>
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

<h2>الخلاصة</h2>
<p>ابدأ باختبارات بسيطة وزد تدريجياً. حتى تغطية 50% أفضل من لا شيء.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'GraphQL مقابل REST API',
        slug: 'graphql-vs-rest-api-ar',
        tags: ['GraphQL', 'REST', 'API', 'Backend', 'Apollo'],
        excerpt: 'مقارنة بين GraphQL و REST وكيفية اختيار الأنسب لمشروعك.',
        content: `<h2>ما هو GraphQL؟</h2>
<p>GraphQL لغة استعلام للـ API. العميل يحدد بالضبط البيانات المطلوبة. حل Over-fetching وUnder-fetching.</p>

<h2>مقارنة</h2>
<pre><code class="language-javascript">// REST - طلبات متعددة
GET /users/1
GET /users/1/posts
GET /users/1/followers

// GraphQL - طلب واحد
query {
  user(id: 1) {
    name
    posts { title }
    followers { name }
  }
}</code></pre>

<h2>إعداد Apollo Server</h2>
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

<h2>متى تختار ماذا؟</h2>
<p>REST: APIs بسيطة، caching سهل. GraphQL: بيانات معقدة ومترابطة، تطبيقات موبايل.</p>

<h2>الخلاصة</h2>
<p>GraphQL ليس بديلاً لـ REST بل خيار مختلف. اختر بناءً على احتياجات مشروعك.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'تعلم Regex التعبيرات النمطية',
        slug: 'regex-regular-expressions-ar',
        tags: ['Regex', 'JavaScript', 'Python', 'Pattern Matching', 'أساسيات'],
        excerpt: 'دليل عملي للتعبيرات النمطية Regular Expressions للبحث والتحقق.',
        content: `<h2>ما هو Regex؟</h2>
<p>Regex أنماط للبحث ومطابقة النصوص. قوي جداً للتحقق من المدخلات والبحث والاستبدال.</p>

<h2>الأساسيات</h2>
<pre><code class="language-javascript">// حرفي
/hello/         // يطابق "hello"

// Character Classes
/[abc]/         // a أو b أو c
/[a-z]/         // أي حرف صغير
/[0-9]/         // أي رقم
/\\d/            // أي رقم (اختصار)
/\\w/            // حرف أو رقم أو _
/\\s/            // مسافة</code></pre>

<h2>الكميات Quantifiers</h2>
<pre><code class="language-javascript">/a+/            // a واحد أو أكثر
/a*/            // صفر أو أكثر
/a?/            // صفر أو واحد
/a{3}/          // بالضبط 3
/a{2,5}/        // من 2 إلى 5</code></pre>

<h2>أمثلة عملية</h2>
<pre><code class="language-javascript">// التحقق من email
const emailRegex = /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i;
emailRegex.test('test@email.com'); // true

// التحقق من رقم هاتف سعودي
const phoneRegex = /^05\\d{8}$/;
phoneRegex.test('0512345678'); // true

// استخراج الأرقام
'السعر 150 ريال'.match(/\\d+/g); // ['150']</code></pre>

<h2>الخلاصة</h2>
<p>Regex قوي لكن يصعب قراءته. استخدم أدوات مثل regex101.com للتجربة والفهم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'WebSocket والاتصال الحي',
        slug: 'websocket-realtime-connection-ar',
        tags: ['WebSocket', 'Socket.io', 'Real-time', 'Node.js', 'Chat'],
        excerpt: 'تعلم بناء تطبيقات real-time باستخدام WebSocket و Socket.io.',
        content: `<h2>ما هو WebSocket؟</h2>
<p>WebSocket بروتوكول للاتصال ثنائي الاتجاه المستمر. مثالي للـ chat وnotifications والألعاب.</p>

<h2>Socket.io Server</h2>
<pre><code class="language-javascript">const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // للجميع
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

socket.emit('chat message', 'مرحباً!');

socket.on('chat message', (msg) => {
  displayMessage(msg);
});</code></pre>

<h2>Rooms للمجموعات</h2>
<pre><code class="language-javascript">// انضمام لغرفة
socket.join('room-123');

// إرسال للغرفة
io.to('room-123').emit('message', 'رسالة للغرفة');

// مغادرة الغرفة
socket.leave('room-123');</code></pre>

<h2>الخلاصة</h2>
<p>Socket.io يسهل بناء تطبيقات real-time. مثالي للـ chat وlive updates.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'Kubernetes للمبتدئين',
        slug: 'kubernetes-beginners-guide-ar',
        tags: ['Kubernetes', 'K8s', 'DevOps', 'Docker', 'Containers'],
        excerpt: 'مقدمة في Kubernetes لإدارة ونشر التطبيقات containerized.',
        content: `<h2>ما هو Kubernetes؟</h2>
<p>Kubernetes (K8s) نظام لإدارة containers على نطاق واسع. يتعامل مع التوسع والتوفر والنشر تلقائياً.</p>

<h2>المفاهيم الأساسية</h2>
<pre><code>Pod       = أصغر وحدة، container واحد أو أكثر
Deployment = يدير عدة Pods متطابقة
Service    = يعرض الـ Pods للشبكة
Ingress    = يوجه traffic الخارجي</code></pre>

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

<h2>أوامر kubectl</h2>
<pre><code class="language-bash">kubectl apply -f deployment.yaml   # تطبيق
kubectl get pods                   # عرض الـ pods
kubectl logs pod-name              # السجلات
kubectl delete -f deployment.yaml  # حذف</code></pre>

<h2>الخلاصة</h2>
<p>Kubernetes معقد لكنه قوي جداً. ابدأ بـ minikube للتعلم المحلي.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'State Management مع Redux Toolkit',
        slug: 'redux-toolkit-state-management-ar',
        tags: ['Redux', 'React', 'State', 'Redux Toolkit', 'Frontend'],
        excerpt: 'تعلم إدارة الحالة بـ Redux Toolkit بطريقة حديثة ومبسطة.',
        content: `<h2>لماذا Redux Toolkit؟</h2>
<p>Redux Toolkit يبسط Redux كثيراً. يقلل الـ boilerplate ويتضمن أفضل الممارسات.</p>

<h2>إعداد Store</h2>
<pre><code class="language-javascript">import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});</code></pre>

<h2>إنشاء Slice</h2>
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

<h2>استخدام في Component</h2>
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

<h2>الخلاصة</h2>
<p>Redux Toolkit أفضل طريقة لاستخدام Redux. createSlice يوفر الكثير من الكود.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'بناء CLI Tools مع Node.js',
        slug: 'nodejs-cli-tools-ar',
        tags: ['Node.js', 'CLI', 'Command Line', 'npm', 'أدوات'],
        excerpt: 'تعلم بناء أدوات سطر الأوامر CLI باستخدام Node.js.',
        content: `<h2>لماذا CLI Tools؟</h2>
<p>أدوات CLI تسرع المهام المتكررة. يمكنك بناء أدوات مخصصة لمشاريعك أو نشرها للآخرين.</p>

<h2>إعداد المشروع</h2>
<pre><code class="language-json">// package.json
{
  "name": "my-cli",
  "version": "1.0.0",
  "bin": {
    "my-cli": "./index.js"
  }
}</code></pre>

<h2>الملف الرئيسي</h2>
<pre><code class="language-javascript">#!/usr/bin/env node
const { program } = require('commander');

program
  .name('my-cli')
  .version('1.0.0')
  .description('أداتي المخصصة');

program
  .command('greet <name>')
  .description('رحب بشخص')
  .option('-l, --loud', 'بصوت عالٍ')
  .action((name, options) => {
    const greeting = \`مرحباً \${name}!\`;
    console.log(options.loud ? greeting.toUpperCase() : greeting);
  });

program.parse();</code></pre>

<h2>إضافة ألوان وتفاعل</h2>
<pre><code class="language-javascript">const chalk = require('chalk');
const inquirer = require('inquirer');

console.log(chalk.green.bold('نجاح!'));
console.log(chalk.red('خطأ!'));

const answers = await inquirer.prompt([
  { type: 'input', name: 'name', message: 'ما اسمك؟' },
  { type: 'confirm', name: 'sure', message: 'هل أنت متأكد؟' }
]);</code></pre>

<h2>الخلاصة</h2>
<p>Commander للأوامر، chalk للألوان، inquirer للتفاعل. مزيج قوي لأدوات CLI ممتازة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'OAuth 2.0 والمصادقة الحديثة',
        slug: 'oauth2-authentication-ar',
        tags: ['OAuth', 'Authentication', 'Security', 'JWT', 'API'],
        excerpt: 'فهم OAuth 2.0 وتطبيقه لمصادقة آمنة في تطبيقاتك.',
        content: `<h2>ما هو OAuth 2.0؟</h2>
<p>OAuth 2.0 معيار للتفويض. يسمح للتطبيقات بالوصول لموارد المستخدم بدون كشف كلمة المرور.</p>

<h2>المصطلحات</h2>
<pre><code>Resource Owner = المستخدم
Client         = تطبيقك
Authorization Server = من يصدر الـ tokens (Google, Facebook)
Resource Server = الـ API الذي يحمي الموارد
Access Token   = المفتاح للوصول</code></pre>

<h2>Authorization Code Flow</h2>
<pre><code class="language-javascript">// 1. توجيه المستخدم للـ authorization
const authUrl = \`https://auth.example.com/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  response_type=code&
  scope=read:profile\`;

// 2. استبدال الـ code بـ token
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

<h2>استخدام Passport.js</h2>
<pre><code class="language-javascript">const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));</code></pre>

<h2>الخلاصة</h2>
<p>OAuth 2.0 معيار الصناعة. Passport.js يسهل التكامل مع مزودين متعددين.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Prisma ORM لقواعد البيانات',
        slug: 'prisma-orm-database-ar',
        tags: ['Prisma', 'ORM', 'Database', 'TypeScript', 'Node.js'],
        excerpt: 'تعلم Prisma ORM لإدارة قواعد البيانات بطريقة type-safe.',
        content: `<h2>ما هو Prisma؟</h2>
<p>Prisma ORM حديث لـ Node.js وTypeScript. يوفر type-safety وauto-completion ممتازين.</p>

<h2>إعداد Prisma</h2>
<pre><code class="language-bash">npm install prisma @prisma/client
npx prisma init</code></pre>

<h2>تعريف Schema</h2>
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

<h2>Migration</h2>
<pre><code class="language-bash">npx prisma migrate dev --name init
npx prisma generate</code></pre>

<h2>CRUD Operations</h2>
<pre><code class="language-typescript">import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: { email: 'a@b.c', name: 'أحمد' }
});

// Read with relations
const users = await prisma.user.findMany({
  include: { posts: true }
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'محمد' }
});</code></pre>

<h2>الخلاصة</h2>
<p>Prisma يجعل التعامل مع قواعد البيانات ممتعاً وآمناً. Type-safety يمنع أخطاء كثيرة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'تصميم Clean Architecture',
        slug: 'clean-architecture-design-ar',
        tags: ['Architecture', 'Clean Code', 'Design Patterns', 'Backend', 'متقدم'],
        excerpt: 'تعلم مبادئ Clean Architecture لبناء تطبيقات قابلة للصيانة والتوسع.',
        content: `<h2>ما هي Clean Architecture؟</h2>
<p>نمط معماري يفصل الكود لطبقات مستقلة. يجعل التطبيق سهل الاختبار والتعديل والتوسع.</p>

<h2>الطبقات</h2>
<pre><code>Entities      = Business Objects (الأهم، مستقل تماماً)
Use Cases     = Application Logic
Controllers   = Interface Adapters
Frameworks    = External (DB, Web, etc.)</code></pre>

<h2>مثال: User Entity</h2>
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

<h2>Use Case</h2>
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
<p>التبعيات تتجه للداخل فقط. الـ Entities لا تعرف شيئاً عن الطبقات الخارجية.</p>

<h2>الخلاصة</h2>
<p>Clean Architecture استثمار في مشاريع طويلة المدى. يستحق التعلم للمشاريع الكبيرة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 13,
    },
];
