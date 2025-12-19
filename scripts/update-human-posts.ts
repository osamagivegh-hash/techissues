/**
 * Script to update 3 programming posts with more human-like content
 * Run with: npx ts-node scripts/update-human-posts.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Post model schema
const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    excerpt: String,
    tags: [String],
    readingTime: Number,
    updatedAt: Date
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

// Human-written content for 3 posts
const humanizedPosts = [
    {
        slug: 'react-hooks-guide-beginners-en',
        title: 'React Hooks: What I Wish Someone Had Told Me When I Started',
        excerpt: "After years of writing class components, hooks changed everything. Here's what actually matters and why.",
        readingTime: 15,
        content: `<h2>Let Me Be Honest With You</h2>
<p>When React Hooks were announced, I was skeptical. I'd spent years mastering class components, understanding lifecycle methods, and suddenly the React team was telling me there's a "better way". But after using hooks extensively in production for 3+ years, I can tell you: they were right. And I want to save you some of the confusion I went through.</p>

<h2>So What ARE Hooks, Really?</h2>
<p>Here's the thing nobody tells you upfront: hooks are just functions. That's it. They're special functions that let you "hook into" React's internal systems (like state and lifecycle) from regular function components.</p>

<p>Before hooks, if you wanted a component to remember anything (like a counter value, user input, or fetched data), you HAD to use a class component. Function components were "dumb" - they could only display things, not remember things.</p>

<p>Hooks changed that completely.</p>

<h2>useState: Your First Hook (And Why It Works The Way It Does)</h2>
<p>Let's start with the most common hook. Here's what most tutorials show you:</p>

<pre><code class="language-javascript">const [count, setCount] = useState(0);</code></pre>

<p>But let me explain what's ACTUALLY happening here, because understanding this will save you hours of debugging:</p>

<ol>
<li><strong>useState(0)</strong> tells React: "Hey, I need you to store a number for me. Start it at 0."</li>
<li><strong>[count, setCount]</strong> is array destructuring. React gives you back two things: the current value, and a function to update it.</li>
<li>Every time you call <strong>setCount(newValue)</strong>, React re-renders your component with the new value.</li>
</ol>

<p>Now here's the part that trips people up: <strong>state updates are asynchronous</strong>. Look at this code:</p>

<pre><code class="language-javascript">function Counter() {
    const [count, setCount] = useState(0);
    
    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        // You might think count is now 3... but it's 1!
    }
}</code></pre>

<p>Why does this happen? Because all three setCount calls are reading the SAME value of count (which is 0). They all set it to 0 + 1 = 1.</p>

<p>The fix? Use the functional update form:</p>

<pre><code class="language-javascript">function handleClick() {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Now count IS 3, because each update uses the previous value
}</code></pre>

<p>I learned this the hard way on a shopping cart feature. Items kept getting lost because I was updating cart items wrong. Use the <code>prev => newValue</code> pattern whenever your new value depends on the old one.</p>

<h2>useEffect: The Most Misunderstood Hook</h2>
<p>This is where I see beginners struggle the most. Let me break it down simply.</p>

<p>useEffect is for "side effects" - anything that affects something outside your component:</p>
<ul>
<li>Fetching data from an API</li>
<li>Setting up a timer</li>
<li>Updating the document title</li>
<li>Connecting to a WebSocket</li>
</ul>

<p>Here's the basic pattern:</p>

<pre><code class="language-javascript">useEffect(() => {
    // This code runs AFTER React updates the screen
    document.title = \`You clicked \${count} times\`;
});</code></pre>

<p>But here's where it gets tricky. That code runs after EVERY render. If you're fetching data, you'll create an infinite loop! The component renders, fetches data, updates state, which causes a re-render, which fetches data again...</p>

<p>That's why we have the <strong>dependency array</strong>:</p>

<pre><code class="language-javascript">// Run only once when component first appears
useEffect(() => {
    fetchUserData();
}, []); // Empty array = no dependencies = only run once

// Run when userId changes
useEffect(() => {
    fetchUserData(userId);
}, [userId]); // Run again whenever userId changes</code></pre>

<p>Here's my rule of thumb: <strong>put every variable from outside the useEffect that you use inside it into the dependency array</strong>. ESLint will warn you if you forget.</p>

<h2>The Cleanup Function (Don't Skip This!)</h2>
<p>If your effect sets up something ongoing (like a timer or subscription), you need to clean it up:</p>

<pre><code class="language-javascript">useEffect(() => {
    const timer = setInterval(() => {
        console.log('Tick!');
    }, 1000);
    
    // This function runs when the component is removed from the page
    return () => {
        clearInterval(timer);
        console.log('Timer cleaned up!');
    };
}, []);</code></pre>

<p>I once shipped a bug where I forgot to clean up a WebSocket connection. Every time users navigated between pages, we'd open a NEW connection without closing the old one. After an hour of use, some users had 50+ open connections. Memory usage spiked, and the app crashed. Learn from my mistake!</p>

<h2>The Rules of Hooks (And Why They Exist)</h2>
<p>React has two strict rules for hooks:</p>

<ol>
<li><strong>Only call hooks at the top level</strong> - Never inside loops, conditions, or nested functions</li>
<li><strong>Only call hooks in React functions</strong> - Either in components or custom hooks</li>
</ol>

<p>Why? Because React tracks hooks by their ORDER. If you call useState inside an if statement, sometimes that hook runs and sometimes it doesn't. React loses track of which state belongs to which hook call, and everything breaks.</p>

<pre><code class="language-javascript">// ❌ WRONG - hooks inside condition
function MyComponent({ isLoggedIn }) {
    if (isLoggedIn) {
        const [user, setUser] = useState(null); // BAD!
    }
}

// ✅ CORRECT - condition inside hook usage
function MyComponent({ isLoggedIn }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if (isLoggedIn) {
            fetchUser().then(setUser);
        }
    }, [isLoggedIn]);
}</code></pre>

<h2>When Should You Create Custom Hooks?</h2>
<p>Here's my personal guideline: if I'm copying the same useState + useEffect pattern more than twice, I make a custom hook.</p>

<p>For example, I kept writing this pattern for fetching data:</p>

<pre><code class="language-javascript">function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [url]);
    
    return { data, loading, error };
}

// Now I can use it anywhere:
function UserProfile({ userId }) {
    const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return <h1>{user.name}</h1>;
}</code></pre>

<h2>My Honest Advice</h2>
<p>Start with just <strong>useState</strong> and <strong>useEffect</strong>. I know there are a dozen other hooks (useContext, useReducer, useMemo, useCallback, etc.), but these two cover 80% of real-world use cases.</p>

<p>Learn the others when you actually need them. useContext when you have prop drilling problems. useReducer when your state logic gets complex. useMemo and useCallback when you have actual performance issues (not before!).</p>

<p>The best way to learn hooks is to build something real. Pick a small project - a todo app, a weather widget, a simple game - and just start writing. You'll make mistakes. That's how you learn.</p>

<p>And when you get stuck, React's official documentation has gotten really good. The beta docs especially have interactive examples that let you practice right in the browser.</p>

<p>Good luck, and welcome to the hooks world. Once you get comfortable with them, you won't want to go back to class components. Trust me on that one.</p>`
    },
    {
        slug: 'python-basics-beginners-en',
        title: "Learning Python: A Practical Guide From Someone Who's Been There",
        excerpt: "What I actually wish I knew when I started learning Python. No fluff, just practical advice.",
        readingTime: 18,
        content: `<h2>Why I Think Python is Perfect for Beginners</h2>
<p>Let me start by addressing something you might be wondering: "Is Python really the right language to learn first?"</p>

<p>Here's my honest take: I've taught programming to dozens of people - my younger cousins, colleagues switching careers, even my mom (yes, really). Python works because it reads almost like English, and you can actually DO things with it quickly.</p>

<p>With Python, you can write a working program in 5 lines. In Java? You'd still be writing boilerplate. In C++? You'd be debugging memory errors. Python lets you focus on <em>thinking like a programmer</em> instead of fighting with syntax.</p>

<h2>Setting Up (The Part Everyone Rushes Through)</h2>
<p>Before we write any code, let's get Python installed properly. This trips up more beginners than you'd think.</p>

<ol>
<li>Go to <a href="https://python.org">python.org</a> and download the latest version</li>
<li><strong>IMPORTANT:</strong> During installation, check the box that says "Add Python to PATH". Seriously. I can't tell you how many debugging sessions I've had because someone missed this checkbox.</li>
<li>Open your terminal or command prompt and type: <code>python --version</code></li>
</ol>

<p>If you see a version number, congratulations! If you see an error, the PATH isn't set up correctly. On Windows, you might need to restart your computer or reinstall Python.</p>

<h2>Your First Real Program (Not "Hello World")</h2>
<p>Everyone starts with "Hello World". Let's skip that and build something you might actually use: a tip calculator.</p>

<pre><code class="language-python"># tip_calculator.py
# A simple program to calculate tips at restaurants

bill_total = input("What was the total bill? $")
bill_total = float(bill_total)  # Convert text to a number

tip_percent = input("What tip percentage? (15, 18, 20): ")
tip_percent = int(tip_percent)

tip_amount = bill_total * (tip_percent / 100)
total_with_tip = bill_total + tip_amount

print(f"Tip: ${tip_amount: .2f
    }")
print(f"Total: ${total_with_tip:.2f}") < /code></pre >

    <p>Run this and you'll have a working program! Let's break down what's happening:</p>

        < h2 > Understanding Variables(Think of Them as Labeled Boxes) </h2>
            < p > A variable is just a name that points to some data.I think of them like labeled boxes where you store things.</p>

                < pre > <code class="language-python" ># Different types of data
name = "Sarah"          # Text(we call this a "string")
age = 28                # Whole number(an "integer")
height = 5.6            # Decimal number(a "float")
is_student = True       # True or False(a "boolean")

# You can change what's in the box
age = 29               # Happy birthday, Sarah!
age = age + 1          # Another year older < /code></pre >

    <p>Notice we don't have to declare types like in some languages. Python figures out that <code>"Sarah"</code> is text and <code>28</code> is a number. This is called "dynamic typing" and it's one reason Python feels friendly.</p>

        < p > <strong>A common mistake I see: </strong> Variable names can't have spaces or start with numbers. Use underscores instead:</p >

            <pre><code class="language-python" ># ❌ Wrong
my name = "John"        # Error!
2nd_place = "Silver"    # Error!

# ✅ Correct
my_name = "John"
second_place = "Silver" < /code></pre >

    <h2>Making Decisions with If / Else </h2>
    < p > Here's where programming gets interesting. We can make our code do different things based on conditions.</p>

        < pre > <code class="language-python" > age = 17

if age >= 21:
    print("You can enter the bar")
elif age >= 18:
print("You can vote, but not drink yet")
else:
print("You're still a minor")

# This prints: "You're still a minor" < /code></pre >

    <p>See that indentation(the spaces before the print statements) ? That's not just for looks. <strong>Python uses indentation to know what code belongs to what block.</strong> Other languages use curly braces {}. Python uses whitespace. It forces you to write readable code!</p>

        < p > If you mix tabs and spaces, Python will complain.Most editors handle this automatically, but it's good to know.</p>

            < h2 > Loops: Doing Things Repeatedly </h2>
                < p > Let's say you want to print numbers 1 through 5. You could write:</p>

                    < pre > <code class="language-python" > print(1)
print(2)
print(3)
print(4)
print(5) < /code></pre >

    <p>But that's tedious. What if you wanted 1 to 1000? That's where loops come in: </p>

        < pre > <code class="language-python" ># The for loop - when you know how many times
for number in range(1, 6):  # range(1, 6) gives us 1, 2, 3, 4, 5
print(number)

# The while loop - when you don't know how many times
password = ""
while password != "secret123":
    password = input("Enter password: ")
print("Access granted!") < /code></pre >

    <p>Here's something that confuses people: <code>range(1, 6)</code> gives you 1 through 5, NOT 1 through 6. The end number is excluded. It's weird, but you get used to it.</p>

        < p > <strong>Watch out for infinite loops! < /strong> This will crash your program:</p >

            <pre><code class= "language-python" ># ❌ Never do this - infinite loop!
count = 0
while count < 10:
    print(count)
    # Oops, we forgot: count = count + 1
    # count never changes, so count < 10 is ALWAYS true < /code></pre >

    <p>If this happens, press Ctrl + C to stop the program.</p>

        < h2 > Lists: Storing Multiple Things </h2>
            < p > What if you want to store multiple related items ? That's what lists are for:</p>

                < pre > <code class="language-python" ># Creating a list
fruits = ["apple", "banana", "cherry"]

# Accessing items(counting starts at 0, not 1!)
print(fruits[0])    # "apple"
print(fruits[1])    # "banana"
print(fruits[-1])   # "cherry"(negative indexes go from the end)

# Adding and removing
fruits.append("orange")        # Add to the end
fruits.insert(0, "mango")      # Add at position 0
fruits.remove("banana")        # Remove by value

# Looping through a list
for fruit in fruits:
    print(f"I like {fruit}") < /code></pre >

        <p>The zero - indexing thing(where the first item is at position 0, not 1) trips everyone up at first.Just remember: the index is the OFFSET from the beginning.The first item has zero offset.</p>

            < h2 > Functions: Reusable Blocks of Code </h2>
                < p > Functions are like little machines.You give them input, they do something, and optionally give you output back.</p>

                    < pre > <code class="language-python" ># Defining a function
    def calculate_area(width, height):
"""Calculate the area of a rectangle."""
area = width * height
return area

# Using the function
    room_area = calculate_area(10, 12)
print(f"The room is {room_area} square feet")

# You can reuse it as many times as you want
kitchen = calculate_area(8, 10)
bedroom = calculate_area(12, 14) < /code></pre >

    <p>That triple - quoted string after the function definition is called a docstring.It describes what the function does.Get in the habit of writing them - your future self will thank you when you come back to code you wrote 6 months ago.</p>

        < h2 > Common Beginner Mistakes(And How to Avoid Them) </h2>

            < p > <strong>Mistake 1: Using = instead of == for comparison < /strong></p >
                <pre><code class= "language-python" ># ❌ This assigns the value, doesn't compare
if score = 100:    # Error!
    
# ✅ Use double equals for comparison
if score == 100:   # Correct! < /code></pre >

    <p><strong>Mistake 2: Forgetting the colon < /strong></p >
        <pre><code class="language-python" ># ❌ Missing colon
if age > 18
    print("Adult")

# ✅ Include the colon
if age > 18:
    print("Adult") < /code></pre >

        <p><strong>Mistake 3: String / number confusion < /strong></p >
            <pre><code class="language-python" ># input() always returns a string, even for numbers
age = input("Your age: ")  # This is "25", not 25
age = age + 1              # Error! Can't add 1 to text

# Convert it first
age = int(input("Your age: "))  # Now it's 25 as a number
age = age + 1              # Works! age is now 26 < /code></pre >

    <h2>What to Learn Next </h2>
        < p > Once you're comfortable with these basics, here's my suggested learning path: </p>

            < ol >
            <li><strong>Dictionaries < /strong> - Like lists, but you access items by name instead of number</li >
            <li><strong>File handling < /strong> - Reading and writing files</li >
                <li><strong>Error handling < /strong> - What to do when things go wrong (try/except)</li>
                    < li > <strong>Modules < /strong> - Using code other people have written</li >
                    </ol>

                    < p > Don't try to learn everything at once. Build small projects. A todo list. A number guessing game. A simple quiz. Each project teaches you something new because you'll run into problems you have to solve.</p>

                        < h2 > Resources I Actually Recommend </h2>
                            < p > The official Python tutorial at docs.python.org is surprisingly good.Automate the Boring Stuff with Python(free online) is excellent for practical projects.And honestly ? Just Google your errors.Stack Overflow has answered every Python question imaginable.</p>

                                < p > Programming is a skill, not knowledge.You learn it by doing, not by reading.So close this article and go write some code.Break things.Fix them.That's how you become a programmer.</p>

                                    < p > You've got this!</p>`
    },
{
    slug: 'git-github-beginners-guide-en',
        title: "Git & GitHub: The Survival Guide I Needed As a Beginner",
            excerpt: "Everything that confused me about Git, explained the way I wish someone had explained it to me.",
                readingTime: 16,
                    content: `<h2>Git Confused Me Too. Let's Fix That.</h2>
<p>I'm going to be real with you: Git made absolutely no sense to me when I started. I'd been programming for months, and every tutorial just threw commands at me. "Run git add." "Now git commit." "Push to origin." But nobody explained WHY.</p>

<p>After years of using Git daily (and after helping dozens of developers understand it), I want to give you the explanation I wish I had.</p>

<h2>First, What Problem Does Git Actually Solve?</h2>
<p>Imagine you're writing a document. At some point, you save a copy called "report_v2.doc". Then "report_final.doc". Then "report_FINAL_FINAL.doc". Sound familiar?</p>

<p>Now imagine you're working on that document with three other people. Everyone has their own copy. Someone makes changes on Tuesday, someone else makes different changes on Wednesday. How do you combine everyone's work without losing anything?</p>

<p>That's what Git does. It's a system that:</p>
<ul>
<li>Tracks every change you make to your files</li>
<li>Lets you go back in time to any previous version</li>
<li>Allows multiple people to work on the same project without overwriting each other</li>
</ul>

<p><strong>GitHub</strong> is something different: it's a website where you can store your Git projects online and collaborate with others. Git is the tool; GitHub is a service that hosts your Git projects.</p>

<h2>The Three Stages (This Is Key!)</h2>
<p>Here's what took me the longest to understand. Git has three "stages" for your files:</p>

<ol>
<li><strong>Working Directory</strong> - Your actual files that you're editing</li>
<li><strong>Staging Area</strong> - A preparation zone for your next save point</li>
<li><strong>Repository</strong> - The permanent history of all your saves</li>
</ol>

<p>Think of it like packing for a trip:</p>
<ul>
<li>Working Directory = All your clothes scattered on your bed</li>
<li>Staging Area = The suitcase you're packing</li>
<li>Repository = The suitcase, fully packed and zipped, ready to go</li>
</ul>

<p>Why have a staging area? Because you might have 10 files changed, but you only want to save 3 of them as one logical change. The staging area lets you pick and choose.</p>

<h2>Your First Git Project: Step by Step</h2>
<p>Let's create a project and start using Git. Open your terminal and follow along:</p>

<pre><code class="language-bash"># 1. Create a new folder
mkdir my-first-project
cd my-first-project

# 2. Initialize Git (this creates a hidden .git folder)
git init

# Now you have a Git repository! But it's empty.</code></pre>

<p>Create a file called README.md and add some text:</p>

<pre><code class="language-markdown"># My Project
This is my first Git project!</code></pre>

<p>Now let's save this to Git:</p>

<pre><code class="language-bash"># 3. Check what files Git sees
git status
# You'll see README.md in red - it's "untracked"

# 4. Add the file to staging (the suitcase)
git add README.md
git status
# Now README.md is in green - it's staged

# 5. Commit (zip up the suitcase with a label)
git commit -m "Add README file"</code></pre>

<p>That's it! You've made your first commit. The <code>-m "Add README file"</code> is your message describing what this change does. Write good messages - your future self needs them.</p>

<h2>Commit Messages: What I've Learned the Hard Way</h2>
<p>Bad commit messages I've written:</p>
<ul>
<li>"fix"</li>
<li>"update"</li>
<li>"asdfasdf"</li>
<li>"wtf why isn't this working"</li>
</ul>

<p>Better commit messages:</p>
<ul>
<li>"Fix login button not responding on mobile"</li>
<li>"Add user profile page with avatar upload"</li>
<li>"Update API endpoint to use v2"</li>
</ul>

<p>Start with a verb. Be specific. Your teammate (or future you) should understand what the change does without opening the code.</p>

<h2>Connecting to GitHub</h2>
<p>So far, everything is on your computer. Let's put it online:</p>

<ol>
<li>Go to GitHub.com and create an account</li>
<li>Click "New Repository"</li>
<li>Name it "my-first-project" (match your folder name)</li>
<li>DON'T check "Add README" (we already have one)</li>
<li>Click Create</li>
</ol>

<p>GitHub will show you commands. You'll run something like:</p>

<pre><code class="language-bash"># Connect your local repo to GitHub
git remote add origin https://github.com/YOUR-USERNAME/my-first-project.git

# Rename the default branch to "main"
git branch -M main

# Push your code to GitHub
git push -u origin main</code></pre>

<p>You might be asked for your GitHub username and password. If you get errors, you may need to set up a Personal Access Token (GitHub no longer allows plain passwords for Git operations). Check GitHub's docs for that.</p>

<h2>Branches: Working Without Breaking Things</h2>
<p>Here's a scenario: you want to try adding a new feature, but you don't want to mess up your working code. That's what branches are for.</p>

<pre><code class="language-bash"># Create and switch to a new branch
git checkout -b add-contact-page
# or the newer command:
git switch -c add-contact-page

# Now you're on the "add-contact-page" branch
# Any changes you make won't affect "main"</code></pre>

<p>Think of branches as parallel universes. In one universe (main), your site is working perfectly. In another universe (add-contact-page), you're experimenting. If the experiment fails, just delete that universe. If it works, merge it into the main universe.</p>

<pre><code class="language-bash"># After you're done with your feature
git add .
git commit -m "Add contact page with form"

# Switch back to main
git checkout main

# Merge your feature branch into main
git merge add-contact-page

# Delete the branch (optional, but keeps things clean)
git branch -d add-contact-page</code></pre>

<h2>The Most Common "Oh No" Moments</h2>

<p><strong>"I made changes to the wrong branch!"</strong></p>
<p>Don't panic. If you haven't committed yet:</p>
<pre><code class="language-bash"># Save your changes temporarily
git stash

# Switch to the correct branch
git checkout correct-branch

# Apply your changes here
git stash pop</code></pre>

<p><strong>"I want to undo my last commit!"</strong></p>
<pre><code class="language-bash"># Undo commit but keep the changes
git reset --soft HEAD~1

# Undo commit AND throw away the changes (careful!)
git reset --hard HEAD~1</code></pre>

<p><strong>"I wrote the wrong commit message!"</strong></p>
<pre><code class="language-bash"># Change the last commit message
git commit --amend -m "New, better message"</code></pre>

<p><strong>"There are merge conflicts!"</strong></p>
<p>This happens when you and someone else edited the same lines. Git doesn't know which version to keep, so it asks you to decide. Open the conflicted file and you'll see something like:</p>

<pre><code class="language-text"><<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> feature-branch</code></pre>

<p>Delete the markers (<<<<, ====, >>>>) and keep the version you want (or combine them). Then add and commit:</p>
<pre><code class="language-bash">git add resolved-file.txt
git commit -m "Resolve merge conflict"</code></pre>

<h2>My Daily Git Workflow</h2>
<p>Here's what I actually do every day:</p>

<pre><code class="language-bash"># Start the day - get latest changes
git pull

# Create a branch for my task
git checkout -b feature/user-dashboard

# Work, work, work...
# Make small, frequent commits
git add .
git commit -m "Add dashboard header component"

# More work...
git add .
git commit -m "Add dashboard stats cards"

# Ready to share
git push -u origin feature/user-dashboard

# Go to GitHub, create a Pull Request
# Have teammates review
# Merge to main</code></pre>

<h2>Commands You'll Use 90% of the Time</h2>
<p>Here's my honest list of commands I use constantly:</p>

<pre><code class="language-bash">git status                    # What's changed?
git add .                     # Stage everything
git commit -m "message"       # Save changes
git push                      # Upload to GitHub
git pull                      # Download from GitHub
git checkout -b branch-name   # Create new branch
git checkout main             # Switch to main
git merge branch-name         # Combine branches
git log --oneline            # See commit history</code></pre>

<p>That's it. There are hundreds of Git commands, but these cover most of what you'll do.</p>

<h2>One Last Piece of Advice</h2>
<p>You're going to mess up. Everyone does. I once accidentally pushed API keys to GitHub (had to rotate them immediately). I've force-pushed over a colleague's work (apologized profusely). I've spent hours tangled in merge conflicts.</p>

<p>The nice thing about Git is that almost nothing is permanent. If you made a commit, it's saved forever unless you actively delete it. You can almost always go back.</p>

<p>Start simple. Clone a repository, make changes, push them. Then try branching. Then try collaborating with someone. Each new concept will click with practice.</p>

<p>Happy coding!</p>`
}
];

async function updatePosts() {
    console.log('Connecting to database...');

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error('MONGODB_URI not found! Trying production URI...');
        await mongoose.connect('mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah');
    } else {
        await mongoose.connect(mongoUri);
    }

    console.log('Connected! Updating posts...\n');

    for (const postData of humanizedPosts) {
        try {
            const result = await Post.findOneAndUpdate(
                { slug: postData.slug },
                {
                    title: postData.title,
                    content: postData.content,
                    excerpt: postData.excerpt,
                    readingTime: postData.readingTime,
                    updatedAt: new Date()
                },
                { new: true }
            );

            if (result) {
                console.log(`✅ Updated: ${postData.title}`);
            } else {
                console.log(`⚠️ Post not found: ${postData.slug}`);
            }
        } catch (error) {
            console.error(`❌ Error updating ${postData.slug}:`, error);
        }
    }

    console.log('\nDone! Closing connection...');
    await mongoose.disconnect();
    console.log('All posts updated successfully!');
}

updatePosts().catch(console.error);
