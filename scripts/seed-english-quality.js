const mongoose = require('mongoose');

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techissues?retryWrites=true&w=majority&appName=Mawaddah';

const CategorySchema = new mongoose.Schema({ name: String, slug: String, language: String }, { timestamps: true });
const PostSchema = new mongoose.Schema({ title: String, slug: String, language: String, category: mongoose.Schema.Types.ObjectId, tags: [String], excerpt: String, content: String, coverImage: String, status: String, readingTime: Number }, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

// 50 Unique Programming Posts with detailed content and unique Unsplash images
const programmingPosts = [
    {
        title: 'Complete Python Programming Guide for Beginners',
        slug: 'complete-python-programming-guide-beginners',
        tags: ['Python', 'Programming', 'Beginner', 'Tutorial'],
        excerpt: 'Master Python from scratch with this comprehensive guide covering syntax, data structures, functions, and object-oriented programming.',
        content: '<h2>Introduction to Python</h2><p>Python is one of the most popular programming languages in the world, known for its simplicity and readability. Created by Guido van Rossum in 1991, Python has become the go-to language for beginners and professionals alike.</p><h2>Why Learn Python?</h2><p>Python offers numerous advantages: it has a clean syntax that is easy to read and write, making it perfect for beginners. It has a vast standard library and an active community that contributes thousands of third-party packages. Python is versatile and used in web development, data science, artificial intelligence, automation, and more.</p><h2>Setting Up Your Environment</h2><p>To get started with Python, you need to install Python on your computer. Visit python.org to download the latest version. Python 3.11 or later is recommended. You can verify your installation by opening a terminal and typing <code>python --version</code>.</p><h2>Your First Python Program</h2><p>Let\'s start with the classic "Hello, World!" program. Create a file named hello.py and type: <code>print("Hello, World!")</code>. Run it using <code>python hello.py</code> in your terminal.</p><h2>Variables and Data Types</h2><p>Python has several built-in data types: integers, floats, strings, booleans, lists, tuples, dictionaries, and sets. Variables in Python are dynamically typed, meaning you don\'t need to declare their type explicitly.</p><h2>Control Flow</h2><p>Python supports if-else statements, for loops, while loops, and more. The syntax is clean and uses indentation to define code blocks, which makes Python code highly readable.</p><h2>Functions and Modules</h2><p>Functions in Python are defined using the <code>def</code> keyword. You can create reusable code blocks and organize your programs better. Python also supports modules and packages for code organization.</p><h2>Object-Oriented Programming</h2><p>Python is an object-oriented language. You can create classes and objects, use inheritance, encapsulation, and polymorphism. OOP helps you write more organized and maintainable code.</p><h2>Next Steps</h2><p>Once you\'ve mastered the basics, explore Python libraries like NumPy for numerical computing, Pandas for data analysis, Django or Flask for web development, and TensorFlow for machine learning.</p>',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
        time: 15
    },
    {
        title: 'Modern JavaScript ES6+ Features Every Developer Should Know',
        slug: 'modern-javascript-es6-features-developer',
        tags: ['JavaScript', 'ES6', 'Web Development', 'Modern'],
        excerpt: 'Explore the powerful features introduced in ES6 and later versions of JavaScript, including arrow functions, destructuring, promises, and async/await.',
        content: '<h2>Introduction to Modern JavaScript</h2><p>JavaScript has evolved significantly since ES6 (ECMAScript 2015). Modern JavaScript introduces features that make code more concise, readable, and powerful. Understanding these features is essential for any JavaScript developer.</p><h2>Arrow Functions</h2><p>Arrow functions provide a more concise syntax for writing functions. They also preserve the <code>this</code> context from the enclosing scope, which solves many common issues with traditional functions. Example: <code>const add = (a, b) => a + b;</code></p><h2>Destructuring</h2><p>Destructuring allows you to extract values from arrays and objects easily. This reduces boilerplate code and makes assignments more intuitive. You can destructure arrays, objects, and even nested structures.</p><h2>Template Literals</h2><p>Template literals use backticks and allow embedded expressions. They make string interpolation and multi-line strings much cleaner than concatenation. Example: <code>`Hello, ${name}!`</code></p><h2>Spread and Rest Operators</h2><p>The spread operator (<code>...</code>) allows you to expand arrays and objects. The rest operator collects remaining elements into an array. Both are powerful tools for working with collections.</p><h2>Promises and Async/Await</h2><p>Promises provide a better way to handle asynchronous operations. Async/await syntax makes asynchronous code look and behave more like synchronous code, improving readability and error handling.</p><h2>Modules (import/export)</h2><p>ES6 modules allow you to organize code into reusable modules. Use <code>export</code> to make functions, classes, or variables available to other modules, and <code>import</code> to use them.</p><h2>Classes</h2><p>ES6 introduced class syntax, making object-oriented programming in JavaScript more familiar to developers from other languages. Classes support constructors, inheritance, and static methods.</p><h2>Default Parameters</h2><p>Functions can now have default parameter values, eliminating the need for manual checks. This makes function calls more flexible and code more maintainable.</p>',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        time: 18
    }
];

// This file would need to be expanded with all 150 posts
// For now, this is a template structure

async function seedEnglishQuality() {
    try {
        console.log('This is a template. Full implementation needed with 150 unique posts.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

seedEnglishQuality();




