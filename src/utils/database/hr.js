const sql = require("mssql");
const config = {
  server: "MSI",
  user: "sa",
  password: "123456",
  database: "HR",
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

// const get = async () => {
//   try {
//     const pool = await sql.connect(sqlConfig);
//     const result = await pool
//       .request()
//       .query("select * from dbo.Emergency_Contacts");
//     console.log(result.recordset);
//   } catch (error) {
//     console.log(error);
//   }
// };
// get();

module.exports = {
  conn: conn,
};
