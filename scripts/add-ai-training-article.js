/**
 * Script to add a new premium AI training article
 * Run with: node scripts/add-ai-training-article.js
 */

const mongoose = require('mongoose');

// Post model schema
const PostSchema = new mongoose.Schema({
    title: String,
    titleAr: String,
    slug: String,
    content: String,
    contentAr: String,
    excerpt: String,
    excerptAr: String,
    coverImage: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
    status: { type: String, default: 'published' },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    readingTime: Number,
    author: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);

// Category schema
const CategorySchema = new mongoose.Schema({
    name: String,
    nameAr: String,
    slug: String
});

const Category = mongoose.model('Category', CategorySchema);

const articleContent = `<h2>The Problem We're Actually Trying to Solve</h2>

<p>Before we talk about neural networks, gradients, or any of the technical machinery, let's start with something more fundamental: what problem does AI training actually solve?</p>

<p>Here's the core issue. For decades, programmers tried to build intelligent systems by writing explicit rules. If you wanted a spam filter, you'd write rules like: "If the email contains 'FREE MONEY', mark it as spam." If you wanted a system that recognized cats in photos, you'd try to describe what makes a cat a cat—pointy ears, whiskers, four legs, fur.</p>

<p>This approach sounds reasonable. But it fails spectacularly for anything complex.</p>

<p>Why? Because the real world is messy. Spam evolves. Cats appear in infinite variations—different angles, lighting conditions, breeds, positions. A child can recognize a cat in a millisecond, even if they've never seen that particular cat before. But try writing rules that cover every possible cat image, and you'll quickly realize it's impossible.</p>

<p>The breakthrough came from flipping the problem. Instead of telling the computer <em>what</em> a cat looks like, we show it thousands of cat pictures and let it figure out the patterns itself. Instead of programming rules, we program a system that <em>learns</em> rules from examples.</p>

<p>That's what training is: feeding a mathematical model examples until it discovers patterns that generalize to new, unseen data. The model isn't given knowledge—it extracts statistical patterns from data.</p>

<h2>Data: What It Really Is (And What It Isn't)</h2>

<p>This is the part most people fundamentally misunderstand. When we say a model was "trained on the internet," people imagine the AI absorbed knowledge like a student reading textbooks. It's a comforting metaphor, but it's wrong.</p>

<p>Training data isn't knowledge. It's examples.</p>

<p>Think about how a child learns what "dog" means. You don't hand them a dictionary definition. You point at dogs and say "dog." Point at cats and say "not dog." Over time, through hundreds of examples, the child builds an internal model that can distinguish dogs from cats, even dogs they've never seen.</p>

<p>The child doesn't memorize every dog they've seen. They extract patterns—four legs, snout, barking, furry—that statistically correlate with "dog-ness." The same process happens in AI training, just with mathematics instead of neurons.</p>

<p>Here's the uncomfortable truth: more data doesn't automatically mean a smarter model. If you train on millions of examples that are all biased in the same way, your model learns that bias. If your training data contains errors, the model learns those errors as if they were truth.</p>

<p>I've seen teams spend months collecting data, only to realize their dataset had subtle problems that poisoned the entire model. Garbage in, garbage out isn't just a cliché—it's the defining law of machine learning.</p>

<p>A dataset of medical images that only includes patients from one demographic will produce a model that performs poorly on everyone else. A language model trained mostly on formal text will struggle with casual conversation. The model can only learn what the data shows it.</p>

<h2>The Mathematical Core—Without the Math</h2>

<p>Let's talk about what's actually happening inside a model, without drowning in equations.</p>

<p>Imagine a massive spreadsheet with billions of cells. Each cell contains a number. These numbers are called "weights" or "parameters"—and they're what the model learns during training.</p>

<p>When you feed input into the model (say, an image or text), that input flows through the spreadsheet. At each step, it gets multiplied by these weights, transformed, combined, and passed forward. Eventually, an output emerges: a prediction, a generated word, a classification.</p>

<p>Here's the key insight: the weights determine <em>everything</em>. Two models with identical architecture but different weights will produce completely different outputs. The entire intelligence of the model lives in those billions of numbers.</p>

<p>But how do we find the right weights?</p>

<p>Initially, they're random. A freshly initialized model produces garbage. Show it a cat photo, and it might say "airplane" with 100% confidence. That's obviously wrong.</p>

<p>Training is the process of adjusting those weights so the model produces useful outputs. We do this by measuring how wrong the model is.</p>

<p>The "loss function" is just a way to calculate error. Show the model a cat, it predicts "airplane," and the loss function says: "You're very wrong." Show it a cat, it predicts "cat," and the loss function says: "Good job, low error."</p>

<p>The entire goal of training is to minimize this error across all training examples.</p>

<p>But with billions of weights, how do you know which ones to adjust and by how much? This is where gradients come in.</p>

<p>A gradient tells you the direction of steepest descent. Imagine you're blindfolded on a hilly landscape, trying to find the lowest valley. You can feel the ground sloping under your feet. If it slopes down to your left, you step left. The gradient is that slope—it tells you which direction reduces the error.</p>

<p>In practice, we compute how much each weight contributed to the error, then nudge every weight slightly in the direction that reduces the error. Do this millions of times, and the model gradually improves.</p>

<h2>The Training Loop: What Actually Happens</h2>

<p>Let me walk you through what training looks like in practice, because this is where the abstract becomes concrete.</p>

<p><strong>Step 1: Feed input.</strong> Take a batch of examples—maybe 32 images of cats and dogs, or 100 sentences of text.</p>

<p><strong>Step 2: Make predictions.</strong> Run these through the model. Initially, the predictions are random nonsense.</p>

<p><strong>Step 3: Measure error.</strong> Compare predictions to the correct answers. Calculate how wrong the model was.</p>

<p><strong>Step 4: Compute gradients.</strong> Figure out which weights caused the error and how to adjust them.</p>

<p><strong>Step 5: Update weights.</strong> Nudge every weight by a tiny amount in the direction that reduces error.</p>

<p><strong>Step 6: Repeat.</strong> Go back to step 1 with new examples. Do this millions or billions of times.</p>

<p>This is the training loop. It's surprisingly simple conceptually, but the scale is staggering.</p>

<p>Training a large language model might involve processing trillions of words. Each step requires multiplying enormous matrices—operations that involve quadrillions of individual calculations. This is why training takes weeks or months on hardware costing millions of dollars.</p>

<p>GPUs and TPUs aren't magic. They're just very good at doing millions of multiplications simultaneously. A CPU does math sequentially—one operation at a time. A GPU can do thousands of operations in parallel. Training that would take decades on a CPU takes weeks on GPU clusters.</p>

<p>The electricity bills for training frontier models run into millions of dollars. The hardware costs tens of millions. This is why only a handful of organizations can train the largest models—it's not just a technical barrier, it's an economic one.</p>

<h2>Overfitting: When Learning Goes Wrong</h2>

<p>Here's a scenario every ML practitioner has experienced: your model performs amazingly on training data but fails completely on new data. This is called overfitting, and understanding it reveals something important about how learning works.</p>

<p>Imagine a student who memorizes every exam question and answer. They score 100% on practice tests. But give them new questions, and they fail—they never actually learned the underlying concepts.</p>

<p>Models can do the same thing. With enough parameters and enough training time, a model can memorize the training data rather than learn generalizable patterns. It looks perfect during training but is useless in practice.</p>

<p>This is why we split data into training and validation sets. The model learns from training data but is evaluated on validation data it's never seen. If training error drops but validation error rises, the model is memorizing, not learning.</p>

<p>The frustrating truth is that more training isn't always better. There's a sweet spot where the model has learned useful patterns but hasn't started memorizing. Push past that point, and you make things worse.</p>

<p>This is also why models sound confident when they're wrong. Confidence is learned from data. If the training data rewarded confident-sounding responses, the model learns to sound confident—whether or not it's correct. Confidence and accuracy are different things, despite what our intuitions tell us.</p>

<h2>Training vs. Inference: A Critical Distinction</h2>

<p>This confuses a lot of people, so let me be crystal clear.</p>

<p><strong>Training</strong> is when we adjust the weights. It happens once (or occasionally during retraining), takes enormous resources, and produces a fixed model.</p>

<p><strong>Inference</strong> is when we use the model. Someone types a question, the model generates an answer. The weights don't change. The model isn't learning—it's applying patterns it already learned.</p>

<p>When you chat with an AI assistant, you're doing inference. The model's weights are frozen. It cannot learn from your conversation. It cannot remember your previous sessions (unless there's a separate memory system). Every response is generated from the same fixed weights.</p>

<p>This is why inference is cheap compared to training. During inference, you just run input through the model—no gradient calculations, no weight updates. It's fast and relatively inexpensive.</p>

<p>Training a major language model might cost $100 million. Running inference on it costs fractions of a cent per query. The asymmetry is enormous.</p>

<p>When models seem to "improve" through conversation, it's usually prompt engineering—learning to phrase things in ways the fixed model responds to better—not the model actually learning.</p>

<h2>The Biggest Misconceptions</h2>

<p>Let me address some ideas that feel true but aren't.</p>

<p><strong>"The model understands what it's saying."</strong></p>

<p>The word "understand" is doing heavy lifting here. The model recognizes patterns that correlate with patterns it's seen in training. When you ask about the French Revolution, it generates text that's statistically similar to text about the French Revolution that appeared in training data.</p>

<p>Is this understanding? Philosophers have been arguing for decades and haven't settled the question. What's clear is that it's not the same process humans use. There's no evidence of internal reasoning, world models, or conceptual representations in the way humans have them. There might be something like them. Or it might be pure pattern matching. We genuinely don't know.</p>

<p><strong>"The model searches the internet for answers."</strong></p>

<p>Most models don't have internet access. They're frozen snapshots of patterns extracted from training data. When you ask a question, the model generates a response from those patterns—it cannot look anything up unless explicitly given tools to do so.</p>

<p>This is why models have knowledge cutoffs. They know what was in their training data and nothing after.</p>

<p><strong>"The model stores facts like a database."</strong></p>

<p>There's no fact database inside the model. Knowledge is smeared across billions of weights in ways we don't fully understand. The model doesn't "know" that Paris is the capital of France the way a database stores that fact. Instead, the statistical patterns in its weights make it likely to produce "Paris" when asked about France's capital.</p>

<p>This is why models can confidently state incorrect facts. The patterns that generate text don't have a concept of truth—they have a concept of "what's likely to come next given the training data."</p>

<p><strong>"The model reasons like a human."</strong></p>

<p>Current models are very different from human cognition. They process input in a single forward pass through fixed weights. Humans have working memory, can deliberate, change our minds, and reason through novel problems step by step.</p>

<p>Models can mimic the <em>appearance</em> of reasoning by generating text that looks like reasoning. But whether there's actual reasoning happening underneath is an open question. For many problems, models fail in ways that suggest they're pattern-matching rather than reasoning.</p>

<h2>What This Actually Means</h2>

<p>So what can modern AI actually do well?</p>

<p>Pattern recognition and generation at scale. If a task involves recognizing patterns that appeared in training data and generating outputs that follow similar patterns, current AI is remarkably capable. Translation, summarization, code generation, image recognition, text completion—these all fit the pattern-recognition paradigm.</p>

<p>What can't it do?</p>

<p>Genuine novelty. Real reasoning about things far outside training distribution. Reliable factual accuracy without verification. Understanding in the deep human sense. Learning from single examples. Common sense about physical world constraints.</p>

<p>Progress is genuinely rapid—capabilities that seemed impossible five years ago are now routine. But the fundamental architecture hasn't changed as much as the hype suggests. We're scaling up the same basic approach: predict the next token, adjust weights based on errors, repeat at enormous scale.</p>

<p>Understanding how training actually works matters. It helps you set realistic expectations. It helps you understand why models fail in the ways they do. It helps you reason about safety, bias, and limitations. And it might help you build better things with these tools, knowing what they actually are.</p>

<p>AI training isn't magic. It's applied statistics at unprecedented scale—impressive, useful, but not the artificial general intelligence of science fiction. At least, not yet. And knowing the difference between what we have and what we imagine is the first step toward using these tools wisely.</p>`;

async function addArticle() {
    console.log('Connecting to database...');

    await mongoose.connect('mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah');

    console.log('Connected! Finding Programming category...');

    // Find the Programming category
    const category = await Category.findOne({ slug: 'programming' });

    if (!category) {
        console.error('Programming category not found!');
        await mongoose.disconnect();
        return;
    }

    console.log('Found category:', category.name);

    // Check if article already exists
    const existing = await Post.findOne({ slug: 'how-ai-models-are-actually-trained' });
    if (existing) {
        console.log('Article already exists, updating...');
        existing.title = 'How AI Models Are Actually Trained: A Developer\'s Guide to What Really Happens';
        existing.content = articleContent;
        existing.excerpt = 'Forget the buzzwords. Here\'s what actually happens when we train AI models—the data, the math, the failures, and why it matters.';
        existing.readingTime = 22;
        existing.updatedAt = new Date();
        await existing.save();
        console.log('Article updated!');
    } else {
        console.log('Creating new article...');

        const newPost = new Post({
            title: 'How AI Models Are Actually Trained: A Developer\'s Guide to What Really Happens',
            titleAr: 'كيف يتم تدريب نماذج الذكاء الاصطناعي فعلياً: دليل المطور',
            slug: 'how-ai-models-are-actually-trained',
            content: articleContent,
            contentAr: '<p>المقال متوفر باللغة الإنجليزية حالياً.</p>',
            excerpt: 'Forget the buzzwords. Here\'s what actually happens when we train AI models—the data, the math, the failures, and why it matters.',
            excerptAr: 'دليل شامل عن كيفية تدريب نماذج الذكاء الاصطناعي.',
            coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
            category: category._id,
            tags: ['AI', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Training', 'GPT', 'LLM'],
            status: 'published',
            featured: true,
            views: 0,
            readingTime: 22,
            author: 'Tech Blog Team',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newPost.save();
        console.log('Article created successfully!');
    }

    console.log('\nArticle details:');
    console.log('- Title: How AI Models Are Actually Trained');
    console.log('- Slug: how-ai-models-are-actually-trained');
    console.log('- Reading time: 22 minutes');
    console.log('- Featured: Yes');

    await mongoose.disconnect();
    console.log('\nDone!');
}

addArticle().catch(console.error);
