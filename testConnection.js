require('dotenv').config();
const sql = require('mssql');

async function testConnection() {
  // Use Windows Authentication
  const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
      trustedConnection: true
    },
    authentication: {
      type: 'default',
      options: {
        userName: undefined,
        password: undefined
      }
    }
  };
  
  console.log('Trying to connect with Windows Authentication:');
  console.log('Server:', config.server);
  console.log('Database:', config.database);
  
  try {
    console.log('Connecting to SQL Server...');
    const pool = await sql.connect(config);
    console.log('Connected successfully!');
    
    // Create users table if it doesn't exist
    console.log('Creating users table if it does not exist...');
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
      BEGIN
        CREATE TABLE users (
          id INT IDENTITY(1,1) PRIMARY KEY,
          full_name NVARCHAR(100) NOT NULL,
          email NVARCHAR(100) NOT NULL UNIQUE,
          password NVARCHAR(255) NOT NULL,
          phone_number NVARCHAR(20) NULL,
          username NVARCHAR(50) NULL UNIQUE,
          profile_picture NVARCHAR(255) NULL,
          date_of_birth DATE NULL,
          gender NVARCHAR(10) NULL,
          address NVARCHAR(MAX) NULL,
          referral_code NVARCHAR(20) NULL,
          user_role NVARCHAR(20) DEFAULT 'user',
          created_at DATETIME DEFAULT GETDATE(),
          updated_at DATETIME DEFAULT GETDATE()
        )
      END
    `);
    console.log('Table creation completed');
    
    // Check if the table was created
    const tableResult = await pool.request()
      .query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`);
    
    console.log('Tables in database:');
    tableResult.recordset.forEach(table => {
      console.log(`- ${table.TABLE_NAME}`);
    });
    
    await pool.close();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection(); 