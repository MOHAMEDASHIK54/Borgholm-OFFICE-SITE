import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:admin123@localhost:5432/borgholm_db'
});

export const query = (text, params) => pool.query(text, params);

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('[PostgreSQL] Connected to borgholm_db. Running migrations...');

    // 1. Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(100) DEFAULT 'Client Partner',
        company VARCHAR(255) DEFAULT 'Independent Client',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Inquiries Table ("Say Hello" Contact Drawer)
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service VARCHAR(100) NOT NULL,
        budget VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Newsletter Subscribers Table (Footer)
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Orders Table (Cart Drawer)
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        customer_email VARCHAR(255),
        items_json JSONB NOT NULL,
        subtotal NUMERIC(10, 2) NOT NULL,
        shipping NUMERIC(10, 2) NOT NULL,
        total NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Confirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Products Table (Shop)
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        rating NUMERIC(3, 1) DEFAULT 5.0,
        image TEXT NOT NULL,
        badge VARCHAR(100),
        description TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Projects Table (Portfolio)
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        tags TEXT[] NOT NULL,
        year VARCHAR(10) NOT NULL,
        client VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        summary TEXT NOT NULL,
        deliverable TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 7. Posts Table (Blog)
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date VARCHAR(100) NOT NULL,
        read_time VARCHAR(50) NOT NULL,
        author VARCHAR(100) NOT NULL,
        image TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL
      );
    `);

    // 8. Comments Table (Blog Reader)
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        author_name VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ==========================================
    // SEED INITIAL DATA IF TABLES ARE EMPTY
    // ==========================================

    // Seed Demo Users
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCount.rows[0].count, 10) === 0) {
      console.log('[PostgreSQL] Seeding default demo users...');
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await client.query(`
        INSERT INTO users (name, email, password_hash, role, company)
        VALUES 
          ('Victoria Lind', 'victoria.lind@nordicventures.se', $1, 'Enterprise Brand Partner', 'Nordic Ventures Corp'),
          ('Henrik Lindqvist', 'henrik@borgholmstudo.com', $1, 'Founding Creative Director', 'Borgholm Digital AG');
      `, [hashedPassword]);
    }

    // Seed Products
    const prodCount = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(prodCount.rows[0].count, 10) === 0) {
      console.log('[PostgreSQL] Seeding shop products...');
      await client.query(`
        INSERT INTO products (id, name, category, price, rating, image, badge, description)
        VALUES 
          ('p1', 'Borgholm Monograph & Type Specimen', 'Print & Books', 68.00, 4.9, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop', 'Limited Edition', 'A 240-page linen-bound volume presenting contemporary typography specimens, layout grids, and studio case studies.'),
          ('p2', 'Borgholm Digital Agency UI Kit', 'Digital Assets', 99.00, 5.0, 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop', 'Best Seller', 'Complete Figma & React component library containing 120+ responsive components, tokens, and dark/light modes.'),
          ('p3', 'Swiss Grid Architectural Poster (A1)', 'Artwork', 45.00, 4.8, 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop', 'Silk Screen', 'Hand-pulled 3-color silkscreen print on 300gsm Hahnemühle cotton paper. Numbered and stamped.'),
          ('p4', 'Minimalist Leather Desk Blotter', 'Office Goods', 120.00, 4.9, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop', 'Artisan Made', 'Vegetable-tanned full-grain Italian leather with hand-burnished edges and debossed studio emblem.'),
          ('p5', 'Borgholm Serif Font Family (Desktop + Web)', 'Typography', 140.00, 5.0, 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop', 'Complete License', '12 weights including true italics, stylistic alternates, ligatures, and comprehensive multilingual support.');
      `);
    }

    // Seed Projects
    const projCount = await client.query('SELECT COUNT(*) FROM projects');
    if (parseInt(projCount.rows[0].count, 10) === 0) {
      console.log('[PostgreSQL] Seeding portfolio projects...');
      await client.query(`
        INSERT INTO projects (id, title, category, tags, year, client, image, summary, deliverable)
        VALUES 
          ('rider', 'Rider. Urban Velocity', 'Digital', ARRAY['Digital', 'Web Design', 'WebGL'], '2025', 'Rider Mobility Corp', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=900&auto=format&fit=crop', 'A dark-mode high-performance interactive showcase for an electric precision bicycle line.', 'Custom 3D configurator, eCommerce platform, Brand Storytelling'),
          ('monograph', 'Zam Nungrey Monograph', 'Branding', ARRAY['Branding', 'Editorial', 'Print'], '2025', 'Nordic Heritage Press', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop', 'Minimalist hardcover art monograph celebrating modern Scandinavian architecture.', 'Book Design, Custom Typography, Packaging'),
          ('lumina', 'Lumina Haute Couture', 'Photography', ARRAY['Photography', 'Digital'], '2025', 'Lumina Paris', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop', 'Editorial photo series capturing haute couture garments in austere brutalist environments.', 'Art Direction, Lookbook, Digital Experience'),
          ('aeronef', 'Aéronef Audio Acoustic', 'Digital', ARRAY['Digital', 'UI/UX', 'Mobile'], '2024', 'Aéronef Sound Lab', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop', 'Audiophile flagship hardware digital companion application and sound spatializer.', 'iOS / Android App, Sound UI, Brand Identity'),
          ('kinfolk', 'Archipeligo Architecture', 'Branding', ARRAY['Branding', 'Architecture'], '2024', 'Studio Archipel', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop', 'Holistic brand transformation for an architectural collective based in Stockholm.', 'Brand Identity, Signage, Web Platform'),
          ('solstice', 'Solstice Botanical Gin', 'Photography', ARRAY['Photography', 'Packaging'], '2024', 'Solstice Spirits', 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=900&auto=format&fit=crop', 'Sustainable glassware packaging and moody product campaign imagery.', 'Bottle Packaging, Campaign Assets, Website');
      `);
    }

    // Seed Posts
    const postCount = await client.query('SELECT COUNT(*) FROM posts');
    if (parseInt(postCount.rows[0].count, 10) === 0) {
      console.log('[PostgreSQL] Seeding blog posts & initial comments...');
      const postResult = await client.query(`
        INSERT INTO posts (title, category, date, read_time, author, image, excerpt, content)
        VALUES 
          ('Developing Business Management Skills in Modern Studios', 'Business', 'OCTOBER 14, 2025', '4 min read', 'Elena Vance', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=900&auto=format&fit=crop', 'Why digital agencies must cultivate structured operational discipline without sacrificing the spontaneity of creative experimentation.', 'Modern agency dynamics demand an agile balance between aesthetic rigor and transparent project governance. When designers comprehend the fiscal constraints and delivery milestones of their clients, creative proposals become strategic investments rather than subjective whims.'),
          ('CSS Design Awards for Website of the Day: Behind The Scenes', 'Design', 'NOVEMBER 02, 2025', '6 min read', 'Marcus Lind', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop', 'How our design team engineered micro-interactions and variable serif type scales to win Site of the Day.', 'Winning recognition across international design juries begins with obsessive attention to typographic rhythm, frame rates, and sensory feedback. In this deep dive, we outline our performance budgets and fluid grid layouts.'),
          ('Tips for Maintaining a Positive Attitude During Creative Crises', 'Culture', 'DECEMBER 19, 2025', '5 min read', 'Karin Holst', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop', 'Practical mindfulness rituals and team retrospectives for navigating intense launch schedules.', 'Creative burnout is rarely an issue of inspiration deficiency; it is almost universally a boundary management issue. By instituting quiet work blocks and respectful asynchronously scheduled critiques, our studio revitalized its creative velocity.'),
          ('The Renaissance of Serif Typography in Interactive Web Design', 'Typography', 'JANUARY 08, 2026', '7 min read', 'Sophie Dahl', 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=900&auto=format&fit=crop', 'Exploring the aesthetic shift from sterile tech sans-serifs back to opulent high-contrast editorial serifs.', 'For over a decade, digital screens were dominated by neutral neo-grotesque typefaces. Today, discerning brands are rediscovering the warmth, authority, and emotional resonance of editorial serif display typography.')
        RETURNING id;
      `);

      const firstPostId = postResult.rows[0].id;
      await client.query(`
        INSERT INTO comments (post_id, author_name, text)
        VALUES 
          ($1, 'Sven Lindgren', 'The depth of typographic precision in this study is phenomenal. Truly sets the bar.'),
          ($1, 'Maria Rossi', 'Completely agree on modern operational discipline. Balancing creativity with timeline rigidity is crucial.');
      `, [firstPostId]);
    }

    console.log('[PostgreSQL] Database migrations & seed data complete.');
  } finally {
    client.release();
  }
}
