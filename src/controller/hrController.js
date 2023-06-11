// MS SQL Server
const { conn } = require("../utils/database/hr");

exports.createNewEmployee = () => {};

exports.getAllEmployee = async (req, res, next) => {
  try {
    // Connect db
    const pool = await conn;
    const result = await pool
      .request()
      .query("select * from dbo.Personal");
    console.log(result);
    return res.status(200).json({
      data: result.recordset,
    });
  } catch (error) {
    console.log(error);
  }
};
