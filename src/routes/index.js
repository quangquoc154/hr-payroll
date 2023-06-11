const hr = require('./hr')
const payroll = require('./payroll')

const initRoutes = (app) => {
  app.use("/api/hr", hr);
  app.use("/api/payroll", payroll);
  app.use((req, res) => {
    res.status(404).json({
      err: 1,
      message: "This route is not defined",
    });
  });
};

module.exports = initRoutes;