/**
 * Script to generate admin password hash
 * Usage: node scripts/generate-admin-password.js [password]
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }

  console.log('\n==============================================');
  console.log('Admin Password Hash Generated');
  console.log('==============================================\n');
  console.log('Add these to your .env.local file:\n');
  console.log(`ADMIN_EMAIL=admin@mysticalwardrobes.com`);
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log(`JWT_SECRET=${require('crypto').randomBytes(32).toString('hex')}`);
  console.log('\n==============================================\n');
  console.log(`Password used: ${password}`);
  console.log('(Change this before production!)\n');
});

