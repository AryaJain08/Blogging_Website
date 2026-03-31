const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);

        // Create Blogs table with category
        db.run(`CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL DEFAULT 'General',
            content TEXT NOT NULL,
            image TEXT,
            authorId INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(authorId) REFERENCES users(id)
        )`, () => {
            // Seed data after tables are created
            seedDatabase();
        });
    }
});

async function seedDatabase() {
    db.get("SELECT COUNT(*) as count FROM users", async (err, row) => {
        if (err) return console.error(err.message);

        // If DB already has users, we assume it's seeded
        if (row.count > 0) return;

        console.log('Seeding database with initial users and blogs...');

        const passwordHash = await bcrypt.hash('password123', 10);

        // Insert Seed Users
        const users = [
            ['admin', passwordHash],
            ['tech_guru', passwordHash],
            ['lifestyle_blogger', passwordHash]
        ];

        users.forEach((user, index) => {
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', user, function (err) {
                if (err) return console.error(err.message);

                const authorId = this.lastID;
                if (index === 0) seedBlogsForAdmin(authorId);
                if (index === 1) seedBlogsForTech(authorId);
                if (index === 2) seedBlogsForLifestyle(authorId);
            });
        });
    });
}

function seedBlogsForAdmin(authorId) {
    db.run(`INSERT INTO blogs (title, category, content, image, authorId) VALUES (
        'Welcome to LuminaBlog',
        'Announcements',
        'We are thrilled to launch this new platform! Expect daily content ranging from Technology to Lifestyle.',
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
        ?
    )`, [authorId]);
}

function seedBlogsForTech(authorId) {
    db.run(`INSERT INTO blogs (title, category, content, image, authorId) VALUES (
        'The Future of React in 2026',
        'Technology',
        'React has evolved significantly over the years. With the new compiler and server components now being the standard, development is faster than ever. How are you adapting your workflows?',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
        ?
    )`, [authorId]);
    db.run(`INSERT INTO blogs (title, category, content, image, authorId) VALUES (
        'Why Vanila CSS is Still King',
        'Development',
        'Despite the rise of utility frameworks, writing raw, vanilla CSS gives you unparalleled control over the design system, specifically for premium dynamic aesthetics.',
        'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1000',
        ?
    )`, [authorId]);
}

function seedBlogsForLifestyle(authorId) {
    db.run(`INSERT INTO blogs (title, category, content, image, authorId) VALUES (
        'Minimalist Workspace Setup',
        'Lifestyle',
        'A clutter-free desk leads to a clutter-free mind. I recently overhauled my entire workspace to be strictly minimalist, and the productivity gains have been immense.',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000',
        ?
    )`, [authorId]);
    db.run(`INSERT INTO blogs (title, category, content, image, authorId) VALUES (
        'Top 5 Coffee Blends for Early Mornings',
        'Food & Drink',
        'Nothing beats a good cup of coffee at 6 AM. Here are my top 5 selections for the perfect morning brew...',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000',
        ?
    )`, [authorId]);
}

module.exports = db;
