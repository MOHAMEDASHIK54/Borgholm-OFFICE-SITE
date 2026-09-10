import { pool } from './db.js';

async function displayDatabase() {
  console.log('\n========================================================================');
  console.log('?? BORGHOLM DATABASE VIEWER (PostgreSQL 18: borgholm_db)');
  console.log('========================================================================\n');

  try {
    const users = await pool.query('SELECT name, email, role, company, to_char(created_at, \'YYYY-MM-DD HH24:MI\') as registered FROM users LIMIT 10');
    console.log('?? USERS TABLE (' + users.rowCount + ' records):');
    console.table(users.rows);

    const inquiries = await pool.query('SELECT name, email, service, budget, message, to_char(created_at, \'YYYY-MM-DD HH24:MI\') as submitted FROM inquiries LIMIT 10');
    console.log('\n?? INQUIRIES TABLE (Contact Drawer Submissions - ' + inquiries.rowCount + ' records):');
    console.table(inquiries.rows);

    const subscribers = await pool.query('SELECT email, to_char(created_at, \'YYYY-MM-DD HH24:MI\') as subscribed FROM subscribers LIMIT 10');
    console.log('\n?? NEWSLETTER SUBSCRIBERS (' + subscribers.rowCount + ' records):');
    console.table(subscribers.rows);

    const orders = await pool.query('SELECT customer_email, total, status, to_char(created_at, \'YYYY-MM-DD HH24:MI\') as ordered_at FROM orders LIMIT 10');
    console.log('\n?? ORDERS TABLE (' + orders.rowCount + ' records):');
    console.table(orders.rows);

    const products = await pool.query('SELECT id, name, category, price, rating FROM products LIMIT 10');
    console.log('\n??? PRODUCTS CATALOG (' + products.rowCount + ' records):');
    console.table(products.rows);

    const projects = await pool.query('SELECT id, title, client, category, year FROM projects LIMIT 10');
    console.log('\n?? PORTFOLIO PROJECTS (' + projects.rowCount + ' records):');
    console.table(projects.rows);

    const posts = await pool.query('SELECT id, title, author, read_time FROM posts LIMIT 10');
    console.log('\n?? JOURNAL / BLOG POSTS (' + posts.rowCount + ' records):');
    console.table(posts.rows);

    console.log('========================================================================\n');
  } catch (err) {
    console.error('Error querying database:', err);
  } finally {
    await pool.end();
  }
}

displayDatabase();
