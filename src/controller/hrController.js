// MS SQL Server
const { conn } = require("../utils/database/hr");
const connPr = require('../utils/database/payroll')

exports.createNewEmployee = async(req, res, next) => {
  try {
    const { Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity, Employment_Status, Hire_Date, Workers_Comp_Code, Termination_Date, Rehire_Date, Last_Review_Date } = req.body
    const sqlHr = `INSERT INTO dbo.Personal VALUES 
          (CAST(${+Employee_ID} AS Numeric(18, 0)), 
            N'${First_Name}', N'${Last_Name}', 
            N'${Middle_Initial}', N'${Address1}', 
            N'${Address2}', N'${City}', N'${State}', 
            CAST(${+Zip} AS Numeric(18, 0)), N'${Email}', 
            N'${Phone_Number}', N'${Social_Security_Number}', 
            N'${Drivers_License}', N'${Marital_Status}', ${+Gender}, ${+Shareholder_Status}, 
            CAST(${Benefit_Plans} AS Numeric(18, 0)), N'${Ethnicity}')
        INSERT INTO dbo.Employment VALUES (CAST(${+Employee_ID} AS Numeric(18, 0)), N'${Employment_Status}', CAST(CONVERT(datetime, '${Hire_Date}', 103) AS DateTime), N'${Workers_Comp_Code}', CAST(CONVERT(datetime, '${Termination_Date}', 103) AS DateTime), CAST(CONVERT(datetime, '${Rehire_Date}', 103) AS DateTime), CAST(CONVERT(datetime, '${Last_Review_Date}', 103) AS DateTime))
            `;
    const sqlPayroll = 'INSERT INTO employee(Employee_Number, idEmployee, Last_Name, First_Name, SSN) VALUES(?, ?, ?, ?, ?)'
    const pool = await conn;
    await pool.request().query(sqlHr)
    await connPr.execute(
      sqlPayroll,
      [Employee_ID, Math.floor(Math.random() * 90000) + 10000, Last_Name, First_Name, Math.floor(Math.random() * 900000000) + 100000000]
    )
    return res.status(200).json({
      message: "Create successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Employee with ID ${Employee_ID} create failed`,
      error: error.message
    });
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
    return res.status(500).json({
      message: 'Get list employee failed',
      error: error.message
    });
  }
};

exports.editEmployee = async function (req, res, next) {
  const { id } = req.params;
  const {Id_user,
    SSN,
    Employment_Status,
    Hire_Date,
    Termination_Date,
    Workers_Comp_Code,
    Rehire_Date,
    Last_Review_Date,
    First_Name,
    Last_Name,
    Middle_Initial,
    Address1,
    Address2,
    City,
    State,
    Zip,
    Email,
    Phone_Number,
    Social_Security_Number,
    Drivers_License,
    Marital_Status,
    Gender,
    Shareholder_Status,
    Benefit_Plans,
    Ethnicity,
  } = req.body;

  try {
    // Connect to the database
    const pool = await conn;

    // Update the Employment and Personal tables with the new data
    const sqlServerSyntax = `
    UPDATE dbo.Employment
    SET Employment_Status = '${Employment_Status}', 
        Hire_Date = CAST(CONVERT(datetime, '${Hire_Date}', 103) AS DateTime),  
        Termination_Date = CAST(CONVERT(datetime, '${Termination_Date}', 103) AS DateTime), 
        Workers_Comp_Code = '${Workers_Comp_Code}', 
        Rehire_Date = CAST(CONVERT(datetime, '${Rehire_Date}', 103) AS DateTime), 
        Last_Review_Date = CAST(CONVERT(datetime, '${Last_Review_Date}', 103) AS DateTime)
    WHERE Employee_ID = '${id}';

    UPDATE dbo.Personal
    SET First_Name = N'${First_Name}', 
        Last_Name = N'${Last_Name}', 
        Middle_Initial = N'${Middle_Initial}', 
        Address1 = N'${Address1}', 
        Address2 = N'${Address2}', 
        City = N'${City}', 
        State = N'${State}', 
        Zip = '${Zip}', 
        Email = '${Email}', 
        Phone_Number = '${Phone_Number}', 
        Social_Security_Number = '${Social_Security_Number}', 
        Drivers_License = '${Drivers_License}', 
        Marital_Status = '${Marital_Status}', 
        Gender = '${Gender}', 
        Shareholder_Status = '${Shareholder_Status}', 
        Benefit_Plans = '${Benefit_Plans}', 
        Ethnicity = N'${Ethnicity}'
    WHERE Employee_ID = '${id}';
    `;

    const sql = 'UPDATE employee SET idEmployee = ?, Last_Name = ?, First_Name = ?,SSN = CAST(? AS DECIMAL(10, 0))  WHERE Employee_Number = ?';
    const values = [ Id_user, First_Name, Last_Name, SSN , id];
    const result2 = await connPr.execute(sql, values);
    const result = await pool.request().query(sqlServerSyntax);

 
    return res.status(200).json({
      message: "Employee with ID ${id} has been updated successfully.",
      data: result.recordsets,
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Employee with ID ${id} update failed.",
      error: error.message,
    });
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sqlHr = `DELETE dbo.Employment where Employee_ID = ${id}
            DELETE dbo.Personal where Employee_ID = ${id}
      `;
    const sqlPayroll = 'DELETE FROM employee WHERE Employee_Number = ?'
    const pool = await conn;
    await pool.request().query(sqlHr)
    await connPr.execute(sqlPayroll, [id])
    return res.status(200).json({
      message: "Delete successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Employee with ID ${id} delete failed`,
      error: error.message
    });
  }
}
