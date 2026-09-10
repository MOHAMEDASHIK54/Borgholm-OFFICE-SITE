import { pool } from './db.js';

async function showUsers() {
  try {
    const result = await pool.query('SELECT id, name, email, role, company, to_char(created_at, \'YYYY-MM-DD HH24:MI:SS\') as registered_at FROM users');
    console.log('\n========================================================================================');
    console.log('?? BORGHOLM DATABASE - REGISTERED USERS');
    console.log('========================================================================================\n');
    console.table(result.rows);
    console.log('?? Note: Default seeded password for these accounts is: password123\n');
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    await pool.end();
  }
}

showUsers();
