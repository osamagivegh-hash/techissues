const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string from production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techissues?retryWrites=true&w=majority&appName=Mawaddah';

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    role: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function restoreAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin user exists
        const existingAdmin = await User.findOne({ email: 'admin@techissues.com' });
        
        if (existingAdmin) {
            console.log('👤 Admin user already exists');
            console.log(`   Email: ${existingAdmin.email}`);
            console.log(`   Name: ${existingAdmin.name}`);
            console.log(`   Role: ${existingAdmin.role}`);
            console.log('\n⚠️  To reset the password, the existing admin will be updated.');
            
            // Update password
            const hashedPassword = await bcrypt.hash('admin123', 10);
            existingAdmin.password = hashedPassword;
            existingAdmin.name = 'المدير';
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            console.log('✅ Admin password reset to: admin123');
        } else {
            // Create new admin user
            console.log('👤 Creating new admin user...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = await User.create({
                name: 'المدير',
                email: 'admin@techissues.com',
                password: hashedPassword,
                role: 'admin',
            });
            console.log('✅ Admin user created successfully!');
        }

        console.log('\n📋 Admin Credentials:');
        console.log('   Email: admin@techissues.com');
        console.log('   Password: admin123');
        console.log('\n🔗 Login URL: https://techiss.store/admin/login');
        console.log('\n⚠️  IMPORTANT: Change the password after first login!');

        await mongoose.disconnect();
        console.log('\n👋 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 11000) {
            console.error('   Duplicate email - admin user may already exist');
        }
        process.exit(1);
    }
}

restoreAdmin();




