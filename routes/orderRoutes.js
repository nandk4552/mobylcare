const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createOrderController,
  getAllOrdersController,
  getOrderByIDController,
  updateOrderByIDController,
  deleteOrderByIDController,
  filterOrderByStatusController,
  filterOrderByBranchController,
  filterOrderReceivedByController,
  filterOrderDeliveredByController,
  filterOrderByCustomerResponseController,
  getDailyOrdersController,
  getMonthlyOrdersController,
  getLatestOrdersController,
  getStatsController,
  assignAnEmployeeToOrderController,
  assignedEmployeeUpdateOrderStatusController,
  getOrderByScanningQRCodeController,
} = require("../controllers/orderController");

const router = express.Router();

//routes
//* CREATE ORDER || POST || api/v1/order/create
router.post("/create", authMiddleware, createOrderController);

//* GET ALL ORDERS || GET || api/v1/order/all
router.get("/all", authMiddleware, getAllOrdersController);

//* GET A SINGLE ORDER BY ID || GET || api/v1/order/:id
router.get("/:id", authMiddleware, getOrderByIDController);

//* UPDATE AN ORDER BY ID || PUT || api/v1/order/:id
router.put("/:id", authMiddleware, updateOrderByIDController);

//* DELETE AN ORDER BY ID || DELETE || api/v1/order/:id
router.delete("/:id", authMiddleware, deleteOrderByIDController);

//* FILTER ORDER BY STATUS || GET || api/v1/order/filter/status
router.get("/filter/status", authMiddleware, filterOrderByStatusController);

//* FILTER ORDER BY Branch || GET || api/v1/order/filter/status
router.get("/filter/branch", authMiddleware, filterOrderByBranchController);

//* FILTER ORDER RECEIVED BY || GET || api/v1/order/filter/receivedBy
router.get(
  "/filter/receivedBy",
  authMiddleware,
  filterOrderReceivedByController
);

//* FILTER ORDER DELIVERED BY || GET || api/v1/order/filter/deliveredBy
router.get(
  "/filter/deliveredBy",
  authMiddleware,
  filterOrderDeliveredByController
);

//* FILTER ORDER BY Customer Response || GET || api/v1/order/filter/deliveredBy
router.get(
  "/filter/customerResponse",
  authMiddleware,
  filterOrderByCustomerResponseController
);

// * GET DAILY ORDERS || GET || api/v1/order/charts/daily
router.get("/charts/daily", authMiddleware, getDailyOrdersController);

// * GET MONTHLY ORDERS || GET || api/v1/order/charts/monthly
router.get("/charts/monthly", authMiddleware, getMonthlyOrdersController);

//* GET THE LATEST 5 ORDERS || GET || api/v1/order/charts/latest
router.get("/charts/latest", authMiddleware, getLatestOrdersController);

//* GET STATS || GET || api/v1/order/stats
router.get("/dashboard/stats", authMiddleware, getStatsController);

//* ASSIGN AN EMPLOYEE TO AN ORDER || PUT || api/v1/order/emp/:id/assign
router.put(
  "/emp/:id/assign",
  authMiddleware,
  assignAnEmployeeToOrderController
);

//* ASSIGNED EMPLOYEE UPDATE ORDER STATUS || PUT || api/v1/order/emp/:id/status
router.put(
  "/emp/:id/status",
  authMiddleware,
  assignedEmployeeUpdateOrderStatusController
);
//* EMPLOYEE GETS THE ORDER BY SCANNING THE QR CODE || GET || api/v1/order/emp/:id
router.get("/emp/:id", getOrderByScanningQRCodeController);
        
module.exports = router;
