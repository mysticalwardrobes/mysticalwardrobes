/**
 * Script to create an admin user in Supabase
 * Usage: npx ts-node scripts/create-admin-user.ts
 */

import { createAdminUser } from '../lib/auth-supabase';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n==============================================');
  console.log('Create Admin User for Mystical Wardrobes');
  console.log('==============================================\n');

  const email = await question('Enter admin email: ');
  const password = await question('Enter admin password: ');
  const confirmPassword = await question('Confirm password: ');

  if (password !== confirmPassword) {
    console.error('\n❌ Passwords do not match!');
    rl.close();
    return;
  }

  if (password.length < 8) {
    console.error('\n❌ Password must be at least 8 characters long!');
    rl.close();
    return;
  }

  console.log('\n⏳ Creating admin user...');

  const { data, error } = await createAdminUser(email, password);

  if (error) {
    console.error(`\n❌ Error: ${error}`);
    rl.close();
    return;
  }

  console.log('\n✅ Admin user created successfully!');
  console.log('\n==============================================');
  console.log('Login Credentials:');
  console.log('==============================================');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log('\nYou can now login at: http://localhost:3000/admin/login');
  console.log('\n⚠️  Keep these credentials safe and secure!');
  console.log('==============================================\n');

  rl.close();
}

main().catch(console.error);

