const express = require("express");
const { conn } = require("../utils/database/hr");
const hrController = require('../controller/hrController')
const router = express.Router();

router.get("/get", async (req, res, next) => {
  try {
    const pool = await conn;
    const result = await pool
      .request()
      .query("select * from dbo.Emergency_Contacts");
    return res.status(200).json({
      data: result.recordset
    })
  } catch (error) {
    console.log(error);
  }
});

router.get('/list-employee', hrController.getAllEmployee)

router.post('/add-employee', hrController.createNewEmployee)

router.put('/list-employee/:id', hrController.editEmployee)

router.delete('/delete-employee/:id', hrController.deleteEmployee)

module.exports = router;
