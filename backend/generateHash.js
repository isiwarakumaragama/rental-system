const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = '12345'; // Change this to your desired password
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('\n========================================');
    console.log('BCRYPT PASSWORD HASH GENERATOR');
    console.log('========================================');
    console.log('\nPlain Password: password');
    console.log('\nHashed Password:');
    console.log(hashedPassword);
    console.log('\n========================================');
    console.log('\nUse this SQL to update your admin user:');
    console.log(`\nUPDATE users SET password = '${hashedPassword}' WHERE email = 'admin@test.com';\n`);
    console.log('========================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

generateHash();
