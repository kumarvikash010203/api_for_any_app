require('dotenv').config();
const { exec } = require('child_process');

// Build the sqlcmd command using Windows Authentication
const server = '.\\SQLEXPRESS'; // Using local SQL Server Express instance
const database = process.env.DB_NAME;

// Using Windows Authentication with -E flag
const sqlCommand = `sqlcmd -S "${server}" -E -d "${database}" -Q "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'"`;

console.log(`Testing connection to SQL Server with Windows Authentication...`);
console.log(`Server: ${server}`);
console.log(`Database: ${database}`);

// Execute sqlcmd
exec(sqlCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  
  console.log('Connection successful!');
  console.log('Tables in database:');
  console.log(stdout);
}); 