const express = require("express");
const conn = require('../utils/database/payroll')
const router = express.Router();

router.get("/get", async (req, res, next) => {
  const [result] = await conn.execute("Select * from employee")
  return res.status(200).json({
    data: result
  })
});

module.exports = router;
