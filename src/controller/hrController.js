// MS SQL Server
const { conn } = require("../utils/database/hr");

exports.createNewEmployee = async(req, res, next) => {
  try {
    const sql = "";
    const pool = await conn;
    const result = await pool.request().query(sql)
    return res.status(200).json({
      data: result.recordset,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllEmployee = async (req, res, next) => {
  try {
    // Connect db
    const sql = "SELECT t1.*, t2.Employment_Status, t2.Hire_Date, t2.Termination_Date, t2.Workers_Comp_Code, t2.Rehire_Date ,t2.Last_Review_Date FROM dbo.Personal AS t1 JOIN dbo.Employment AS t2 ON t1.Employee_ID = t2.Employee_ID";
    const pool = await conn;
    const result = await pool.request().query(sql);
    return res.status(200).json({
      data: result.recordset,
    });
  } catch (error) {
    console.log(error);
  }
};
