require('dotenv').config({ path: './env.production' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dbConnect = require('./lib/db');

const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Database Connection
dbConnect();

// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/images', require('./routes/images'));

// Import Models to ensure schema registration
require('./models/User');
require('./models/Category');
require('./models/Post');
require('./models/Image');

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
