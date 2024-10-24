const invoiceModel = require("../models/invoiceModel");
const orderModel = require("../models/orderModel");

// create a new order
const createOrderController = async (req, res) => {
  try {
    // get data from request body
    const {
      orderOn,
      customerName,
      customerPhoneNo,
      phoneModel,
      mobileIssues,
      simCardAndMemoryCard,
      phonePassword,
      boxNo,
      receivedBy,
      empOrderStatus,
      totalAmount,
      advanceAmount,
      dueAmount,
      selectBranch,
      customerResponse,
      deliveredBy,
      orderCompletedOn,
    } = req.body;
    // validate the required fields
    if (
      !orderOn ||
      !customerName ||
      !customerPhoneNo ||
      !phoneModel ||
      !mobileIssues ||
      !simCardAndMemoryCard ||
      !boxNo ||
      !receivedBy ||
      !empOrderStatus ||
      !totalAmount ||
      !advanceAmount ||
      !selectBranch
    ) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }
    // create a new order object of schema type
    const order = new orderModel({
      orderOn,
      customerName,
      customerPhoneNo,
      phoneModel,
      mobileIssues,
      simCardAndMemoryCard,
      phonePassword,
      boxNo,
      receivedBy,
      empOrderStatus,
      totalAmount,
      advanceAmount,
      dueAmount,
      selectBranch,
      customerResponse,
      deliveredBy,
      orderCompletedOn,
    });
    // validate the order status is created or not
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not created",
      });
    }
    //save to db
    await order.save();
    //  success response
    return res.status(201).send({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in create order API",
      error,
    });
  }
};
// get all orders controllers
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "Orders not found!",
      });
    }
    // success response
    return res.status(200).send({
      success: true,
      message: "Orders fetched successfully",
      ordersLength: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all orders API",
      error,
    });
  }
};
// get a single order by id from db
const getOrderByIDController = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "id not found",
      });
    }
    // find order by id
    const order = await orderModel.findById(id);
    // validate order
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    //success response
    res.status(200).send({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get order by ID API",
      error,
    });
  }
};


const updateOrderByIDController = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "id not found",
      });
    }

    const exists = await orderModel.findById(id);
    if (!exists) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    // get data from request body
    const {
      orderOn,
      customerName,
      customerPhoneNo,
      phoneModel,
      mobileIssues,
      simCardAndMemoryCard,
      phonePassword,
      boxNo,
      receivedBy,
      empOrderStatus,
      totalAmount,
      advanceAmount,
      dueAmount,
      selectBranch,
      customerResponse,
      deliveredBy,
      orderCompletedOn,
    } = req.body;

    // Create an object with the fields to update
    const updateFields = {};
    if (orderOn !== undefined) updateFields.orderOn = orderOn;
    if (customerName !== undefined) updateFields.customerName = customerName;
    if (customerPhoneNo !== undefined)
      updateFields.customerPhoneNo = customerPhoneNo;
    if (phoneModel !== undefined) updateFields.phoneModel = phoneModel;
    if (mobileIssues !== undefined) updateFields.mobileIssues = mobileIssues;
    if (simCardAndMemoryCard !== undefined)
      updateFields.simCardAndMemoryCard = simCardAndMemoryCard;
    if (phonePassword !== undefined) updateFields.phonePassword = phonePassword;
    if (boxNo !== undefined) updateFields.boxNo = boxNo;
    if (receivedBy !== undefined) updateFields.receivedBy = receivedBy;
    if (empOrderStatus !== undefined)
      updateFields.empOrderStatus = empOrderStatus;
    if (totalAmount !== undefined) updateFields.totalAmount = totalAmount;
    if (advanceAmount !== undefined) updateFields.advanceAmount = advanceAmount;
    if (dueAmount !== undefined) updateFields.dueAmount = dueAmount;
    if (selectBranch !== undefined) updateFields.selectBranch = selectBranch;
    if (customerResponse !== undefined)
      updateFields.customerResponse = customerResponse;
    if (deliveredBy !== undefined) updateFields.deliveredBy = deliveredBy;
    if (orderCompletedOn !== undefined)
      updateFields.orderCompletedOn = orderCompletedOn;

    const updatedOrder = await orderModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not updated successfully",
      });
    }

    // Check if the status is updated to "Completed" and create an invoice if true
    if (empOrderStatus === "Completed") {
      const invoice = new invoiceModel({
        customerName: updatedOrder.customerName,
        customerPhoneNo: updatedOrder.customerPhoneNo,
        totalAmount: updatedOrder.totalAmount,
        mobileIssues: updatedOrder.mobileIssues,
        orderOn: updatedOrder.orderOn,
        orderID: updatedOrder._id,
      });
      await invoice.save();
      console.log(
        "Invoice created successfully for updated order:",
        updatedOrder._id
      );
    }

    return res.status(200).send({
      success: true,
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update order by ID API",
      error,
    });
  }
};
// delete order from db
const deleteOrderByIDController = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "id not found",
      });
    }

    const exists = await orderModel.findById(id);
    if (!exists)
      return res.status(404).send({
        success: false,
        message: "Order doesnot exist!",
      });
    await orderModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete order by ID API",
      error,
    });
  }
};

const filterOrderByStatusController = async (req, res) => {
  try {
    // Use the find method to fetch all orders by status
    const orders = await orderModel.find({});
    if (!orders) {
      return res.send({
        success: false,
        message: "Orders not found",
      });
    }
    // Extract status
    const status = orders?.map((order) => order.empOrderStatus);

    // Use Set to get unique genre names
    const uniqueStatus = [...new Set(status)];
    res.status(200).send({
      success: true,
      uniqueStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching status",
      error,
    });
  }
};
const filterOrderByBranchController = async (req, res) => {
  try {
    // Use the find method to fetch all orders by status
    const orders = await orderModel.find({});
    if (!orders) {
      return res.send({
        success: false,
        message: "Orders not found",
      });
    }
    // Extract status
    const branch = orders?.map((order) => order.selectBranch);

    // Use Set to get unique genre names
    const uniqueBranch = [...new Set(branch)];
    res.status(200).send({
      success: true,
      uniqueBranch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching branches",
      error,
    });
  }
};
const filterOrderReceivedByController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    if (!orders) {
      return res.send({
        success: false,
        message: "Orders not found",
      });
    }
    const receivedBy = orders?.map((order) => order.receivedBy);

    const uniqueReceivedBy = [...new Set(receivedBy)];
    res.status(200).send({
      success: true,
      uniqueReceivedBy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching order received By",
      error,
    });
  }
};
const filterOrderDeliveredByController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    if (!orders) {
      return res.send({
        success: false,
        message: "Orders not found",
      });
    }
    const deliveredBy = orders
      .map((order) => order.deliveredBy?.trim())
      .filter((response) => response);

    const uniqueDeliveredBy = [...new Set(deliveredBy)];
    res.status(200).send({
      success: true,
      uniqueDeliveredBy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching order delivered by",
      error,
    });
  }
};

const filterOrderByCustomerResponseController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    if (!orders) {
      return res.send({
        success: false,
        message: "Orders not found",
      });
    }
    const customerResponse = orders
      .map((order) => order.customerResponse?.trim())
      .filter((response) => response);

    const uniqueCustomerResponse = [...new Set(customerResponse)];

    res.status(200).send({
      success: true,
      uniqueCustomerResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching order by customer response",
      error,
    });
  }
};

const getDailyOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderOn" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMonthlyOrdersController = async (req, res) => {
  try {
    const monthlyOrders = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$orderOn" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(monthlyOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLatestOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest orders", error });
  }
};

const getStatsController = async (req, res) => {
  try {
    const orders = await orderModel.find();
    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (order) => order.empOrderStatus === "Completed"
    ).length;
    const totalUsers = new Set(orders.map((order) => order.customerPhoneNo))
      .size;
    const revenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.send({
      success: true,
      message: "Order stats fetched successfully",
      totalOrders,
      completedOrders,
      totalUsers,
      revenue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
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
};
