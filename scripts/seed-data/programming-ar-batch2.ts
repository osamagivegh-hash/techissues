// Arabic Programming - Batch 2 (Articles 11-20)
export const programmingArBatch2 = [
    {
        title: 'React Native لتطبيقات الموبايل',
        slug: 'react-native-mobile-apps-ar',
        tags: ['React Native', 'Mobile', 'iOS', 'Android', 'JavaScript'],
        excerpt: 'تعلم بناء تطبيقات موبايل أصلية لـ iOS و Android باستخدام React Native.',
        content: `<h2>ما هو React Native؟</h2>
<p>React Native يسمح ببناء تطبيقات موبايل أصلية باستخدام JavaScript و React. كود واحد لـ iOS و Android.</p>

<h2>البداية</h2>
<pre><code class="language-bash">npx create-expo-app MyApp
cd MyApp
npx expo start</code></pre>

<h2>المكونات الأساسية</h2>
<pre><code class="language-javascript">import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>مرحباً!</Text>
      <TouchableOpacity onPress={() => alert('ضغطت!')}>
        <Text>اضغط هنا</Text>
      </TouchableOpacity>
    </View>
  );
}</code></pre>

<h2>Styling</h2>
<pre><code class="language-javascript">const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});</code></pre>

<h2>الخلاصة</h2>
<p>React Native يوفر الوقت والجهد. Expo يسهل البداية. مثالي لمن يعرف React.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'تعلم SQL وقواعد البيانات',
        slug: 'sql-database-tutorial-ar',
        tags: ['SQL', 'Database', 'MySQL', 'PostgreSQL', 'Backend'],
        excerpt: 'أساسيات SQL والتعامل مع قواعد البيانات العلائقية.',
        content: `<h2>ما هو SQL؟</h2>
<p>SQL لغة للتعامل مع قواعد البيانات العلائقية. تستخدم لإنشاء، قراءة، تحديث، وحذف البيانات.</p>

<h2>إنشاء جدول</h2>
<pre><code class="language-sql">CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>

<h2>CRUD Operations</h2>
<pre><code class="language-sql">-- إدراج
INSERT INTO users (name, email) VALUES ('أحمد', 'ahmed@example.com');

-- قراءة
SELECT * FROM users WHERE id = 1;

-- تحديث
UPDATE users SET name = 'محمد' WHERE id = 1;

-- حذف
DELETE FROM users WHERE id = 1;</code></pre>

<h2>الربط JOIN</h2>
<pre><code class="language-sql">SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';</code></pre>

<h2>الخلاصة</h2>
<p>SQL أساسي لكل مطور backend. تعلم SELECT و JOIN جيداً، فهما الأكثر استخداماً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'مقدمة في الذكاء الاصطناعي مع Python',
        slug: 'ai-python-introduction-ar',
        tags: ['AI', 'Python', 'Machine Learning', 'Deep Learning', 'مبتدئين'],
        excerpt: 'تعرف على أساسيات الذكاء الاصطناعي والتعلم الآلي باستخدام Python.',
        content: `<h2>مقدمة</h2>
<p>الذكاء الاصطناعي يمكّن الآلات من التعلم والتصرف بذكاء. Python هي اللغة الأكثر استخداماً في هذا المجال.</p>

<h2>المكتبات الأساسية</h2>
<pre><code class="language-python"># تثبيت
pip install numpy pandas scikit-learn

# استيراد
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression</code></pre>

<h2>مثال بسيط</h2>
<pre><code class="language-python"># تحميل البيانات
data = pd.read_csv('data.csv')
X = data[['feature1', 'feature2']]
y = data['target']

# تقسيم البيانات
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# تدريب النموذج
model = LinearRegression()
model.fit(X_train, y_train)

# التنبؤ
predictions = model.predict(X_test)</code></pre>

<h2>أنواع التعلم الآلي</h2>
<p>Supervised للبيانات المصنفة، Unsupervised للأنماط، Reinforcement للقرارات المتتالية.</p>

<h2>الخلاصة</h2>
<p>ابدأ بـ scikit-learn للأساسيات ثم انتقل لـ TensorFlow أو PyTorch للتعلم العميق.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'أمان تطبيقات الويب Web Security',
        slug: 'web-security-basics-ar',
        tags: ['Security', 'Web', 'OWASP', 'XSS', 'SQL Injection'],
        excerpt: 'تعرف على أهم تهديدات أمان الويب وكيفية الحماية منها.',
        content: `<h2>لماذا الأمان مهم؟</h2>
<p>الهجمات تكلف الشركات ملايين الدولارات. حماية المستخدمين مسؤولية كل مطور.</p>

<h2>SQL Injection</h2>
<pre><code class="language-javascript">// ❌ خطير
const query = "SELECT * FROM users WHERE id = " + userId;

// ✓ آمن - Parameterized Query
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);</code></pre>

<h2>XSS - Cross-Site Scripting</h2>
<pre><code class="language-javascript">// ❌ خطير
element.innerHTML = userInput;

// ✓ آمن
element.textContent = userInput;
// أو استخدام مكتبة sanitize</code></pre>

<h2>CSRF Protection</h2>
<pre><code class="language-html"><!-- أضف token في كل form -->
<input type="hidden" name="_csrf" value="{{csrfToken}}">

<!-- تحقق في السيرفر -->
if (req.body._csrf !== req.session.csrf) {
  throw new Error('Invalid CSRF token');
}</code></pre>

<h2>أفضل الممارسات</h2>
<p>استخدم HTTPS دائماً. Validate كل المدخلات. لا تخزن كلمات المرور بنص واضح.</p>

<h2>الخلاصة</h2>
<p>الأمان ليس اختيارياً. تعلم OWASP Top 10 وطبقها في كل مشروع.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'بناء تطبيق Vue.js 3 كامل',
        slug: 'vuejs-3-complete-app-ar',
        tags: ['Vue.js', 'JavaScript', 'Frontend', 'Composition API', 'SPA'],
        excerpt: 'تعلم Vue.js 3 و Composition API لبناء تطبيقات ويب تفاعلية.',
        content: `<h2>لماذا Vue.js؟</h2>
<p>Vue سهل التعلم ومرن وقوي. Composition API في Vue 3 يجعل الكود أكثر تنظيماً وقابلية لإعادة الاستخدام.</p>

<h2>Composition API</h2>
<pre><code class="language-vue"><script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}

onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <button @click="increment">{{ count }} × 2 = {{ doubled }}</button>
</template></code></pre>

<h2>Reactive State</h2>
<pre><code class="language-javascript">import { reactive } from 'vue'

const state = reactive({
  user: null,
  loading: false,
  error: null
})

// التحديث تلقائي
state.loading = true</code></pre>

<h2>Components</h2>
<pre><code class="language-vue"><!-- UserCard.vue -->
<script setup>
defineProps(['user'])
const emit = defineEmits(['delete'])
</script>

<template>
  <div class="card">
    <h3>{{ user.name }}</h3>
    <button @click="emit('delete', user.id)">حذف</button>
  </div>
</template></code></pre>

<h2>الخلاصة</h2>
<p>Vue 3 مع Composition API تجربة تطوير ممتازة. ابدأ بـ script setup للبساطة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'تعلم MongoDB من الصفر',
        slug: 'mongodb-beginners-tutorial-ar',
        tags: ['MongoDB', 'NoSQL', 'Database', 'Backend', 'Node.js'],
        excerpt: 'دليل المبتدئين لقاعدة بيانات MongoDB وكيفية استخدامها مع Node.js.',
        content: `<h2>ما هو MongoDB؟</h2>
<p>MongoDB قاعدة بيانات NoSQL تخزن البيانات كـ documents (JSON). مرنة وتتوسع بسهولة.</p>

<h2>الاتصال من Node.js</h2>
<pre><code class="language-javascript">const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp')
  .then(() => console.log('Connected!'))
  .catch(err => console.error(err));</code></pre>

<h2>Schema و Model</h2>
<pre><code class="language-javascript">const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);</code></pre>

<h2>CRUD Operations</h2>
<pre><code class="language-javascript">// إنشاء
const user = await User.create({ name: 'أحمد', email: 'a@b.c' });

// قراءة
const users = await User.find({ age: { $gte: 18 } });
const user = await User.findById(id);

// تحديث
await User.updateOne({ _id: id }, { $set: { name: 'محمد' } });

// حذف
await User.deleteOne({ _id: id });</code></pre>

<h2>الخلاصة</h2>
<p>MongoDB مثالي للتطبيقات المرنة. Mongoose يسهل التعامل معه من Node.js.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
        readingTime: 11,
    },
    {
        title: 'مقدمة في Linux للمبرمجين',
        slug: 'linux-programmers-intro-ar',
        tags: ['Linux', 'Terminal', 'Bash', 'DevOps', 'أساسيات'],
        excerpt: 'تعلم أساسيات Linux وسطر الأوامر للمبرمجين.',
        content: `<h2>لماذا Linux؟</h2>
<p>معظم السيرفرات تعمل بـ Linux. فهمه يجعلك مطوراً أفضل ويسهل عمليات النشر.</p>

<h2>أوامر التنقل</h2>
<pre><code class="language-bash">pwd           # المسار الحالي
ls -la        # قائمة الملفات مع التفاصيل
cd /path      # التنقل
cd ..         # المجلد الأب
cd ~          # المجلد الرئيسي</code></pre>

<h2>إدارة الملفات</h2>
<pre><code class="language-bash">touch file.txt        # إنشاء ملف
mkdir folder          # إنشاء مجلد
cp file.txt copy.txt  # نسخ
mv old.txt new.txt    # نقل/إعادة تسمية
rm file.txt           # حذف
rm -rf folder         # حذف مجلد</code></pre>

<h2>عرض المحتوى</h2>
<pre><code class="language-bash">cat file.txt    # عرض كامل
head -10 file   # أول 10 سطور
tail -f log     # متابعة آخر الملف
grep "كلمة" file  # بحث</code></pre>

<h2>الصلاحيات</h2>
<pre><code class="language-bash">chmod 755 script.sh   # صلاحيات التنفيذ
chown user:group file # تغيير المالك
sudo command          # تشغيل كـ root</code></pre>

<h2>الخلاصة</h2>
<p>Terminal يجعلك أسرع وأقوى. تعلم الأوامر الأساسية ثم توسع تدريجياً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'Tailwind CSS دليل شامل',
        slug: 'tailwindcss-complete-guide-ar',
        tags: ['Tailwind', 'CSS', 'Frontend', 'Utility-First', 'تصميم'],
        excerpt: 'تعلم Tailwind CSS لبناء واجهات مستخدم جميلة بسرعة.',
        content: `<h2>ما هو Tailwind؟</h2>
<p>Tailwind framework CSS utility-first. بدلاً من كتابة CSS مخصص، تستخدم classes جاهزة مباشرة في HTML.</p>

<h2>التثبيت</h2>
<pre><code class="language-bash">npm install -D tailwindcss
npx tailwindcss init</code></pre>

<h2>أمثلة أساسية</h2>
<pre><code class="language-html"><!-- Card Component -->
<div class="bg-white rounded-lg shadow-lg p-6 max-w-sm">
  <h2 class="text-xl font-bold text-gray-900 mb-2">عنوان</h2>
  <p class="text-gray-600">محتوى النص هنا...</p>
  <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    اضغط هنا
  </button>
</div></code></pre>

<h2>Responsive Design</h2>
<pre><code class="language-html"><!-- يتغير حسب الشاشة -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4">عنصر 1</div>
  <div class="p-4">عنصر 2</div>
  <div class="p-4">عنصر 3</div>
</div></code></pre>

<h2>Dark Mode</h2>
<pre><code class="language-html"><div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  يتغير اللون حسب الوضع
</div></code></pre>

<h2>الخلاصة</h2>
<p>Tailwind يسرّع التطوير بشكل كبير. منحنى التعلم قصير والنتائج رائعة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
        readingTime: 10,
    },
    {
        title: 'تطوير تطبيقات Flutter',
        slug: 'flutter-app-development-ar',
        tags: ['Flutter', 'Dart', 'Mobile', 'Cross-Platform', 'UI'],
        excerpt: 'تعلم Flutter و Dart لبناء تطبيقات موبايل جميلة وسريعة.',
        content: `<h2>لماذا Flutter؟</h2>
<p>Flutter من Google يبني تطبيقات iOS و Android وويب من كود واحد. أداء أصلي وتطوير سريع.</p>

<h2>Dart الأساسيات</h2>
<pre><code class="language-dart">// المتغيرات
var name = 'أحمد';
final age = 25;        // ثابت runtime
const pi = 3.14159;    // ثابت compile-time

// الدوال
String greet(String name) => 'مرحباً $name';

// Classes
class User {
  final String name;
  User(this.name);
}</code></pre>

<h2>Widget الأساسية</h2>
<pre><code class="language-dart">class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('تطبيقي')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('مرحباً!', style: TextStyle(fontSize: 24)),
              ElevatedButton(
                onPressed: () => print('Pressed!'),
                child: Text('اضغط'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}</code></pre>

<h2>State Management</h2>
<pre><code class="language-dart">class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;
  void increment() => setState(() => count++);
}</code></pre>

<h2>الخلاصة</h2>
<p>Flutter ممتاز للتطبيقات ذات الواجهات الجميلة. Dart سهلة التعلم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
        readingTime: 12,
    },
    {
        title: 'Redis للتخزين المؤقت والأداء',
        slug: 'redis-caching-performance-ar',
        tags: ['Redis', 'Cache', 'Performance', 'Database', 'Backend'],
        excerpt: 'تعلم استخدام Redis لتحسين أداء تطبيقاتك بشكل كبير.',
        content: `<h2>ما هو Redis؟</h2>
<p>Redis قاعدة بيانات في الذاكرة فائقة السرعة. تُستخدم للـ caching وsessions وqueues وreal-time data.</p>

<h2>الاتصال من Node.js</h2>
<pre><code class="language-javascript">const Redis = require('ioredis');
const redis = new Redis();

// أو مع إعدادات
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'secret'
});</code></pre>

<h2>العمليات الأساسية</h2>
<pre><code class="language-javascript">// Strings
await redis.set('key', 'value');
await redis.set('key', 'value', 'EX', 3600); // ينتهي بعد ساعة
const value = await redis.get('key');

// Hash
await redis.hset('user:1', 'name', 'أحمد');
const name = await redis.hget('user:1', 'name');

// Lists
await redis.lpush('queue', 'task1');
const task = await redis.rpop('queue');</code></pre>

<h2>Caching Pattern</h2>
<pre><code class="language-javascript">async function getUser(id) {
  // حاول من الـ cache
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);
  
  // إذا لم يوجد، اجلب من DB
  const user = await db.findUser(id);
  await redis.set(\`user:\${id}\`, JSON.stringify(user), 'EX', 300);
  return user;
}</code></pre>

<h2>الخلاصة</h2>
<p>Redis يحسن الأداء بشكل كبير. Caching يقلل الحمل على قاعدة البيانات.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        readingTime: 11,
    },
];
