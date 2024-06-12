import { DeleteFilled, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { memo, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words"; // Import Highlighter component
import { MdAssignmentAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";

import { FaEdit } from "react-icons/fa";
import OrderForm from "../../components/OrderForm/OrderForm";
import "./OrdersPage.css";
const confirm = Modal.confirm;
const { Column } = Table;

const OrdersPage = () => {
  const loading = useSelector((state) => state.rootReducer.loading);

  const dispatch = useDispatch();
  const [ordersData, setOrdersData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState([]);
  const [orderBanchFilter, setOrderBanchFilter] = useState([]);
  const [receivedByFilter, setReceivedByFilter] = useState([]);
  const [deliveredByFilter, setDeliveredByFilter] = useState([]);
  const [customerResponseFilter, setCustomerResponseFilter] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [dateRange, setDateRange] = useState([null, null]);

  const searchInput = useRef(null);
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/employees/list/names`
      );
      setEmployees(data?.employees);
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  // Fetch order statuses for filter
  const getOrderStatuses = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/filter/status`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        const filters = data?.uniqueStatus?.map((status) => ({
          text: status,
          value: status,
        }));
        setOrderStatusFilter(filters);
      }
    } catch (error) {
      message.error("Failed to fetch order statuses");
      console.error(error);
    }
  };
  // Fetch order branch for filter
  const filterOrderByBranch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/filter/branch`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        const filters = data?.uniqueBranch?.map((branch) => ({
          text: branch,
          value: branch,
        }));
        setOrderBanchFilter(filters);
      }
    } catch (error) {
      message.error("Failed to fetch order statuses");
      console.error(error);
    }
  };

  // Fetch order branch for filter
  const filterOrderReceivedByBranch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/filter/receivedBy`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        const filters = data?.uniqueReceivedBy?.map((receivedBy) => ({
          text: receivedBy,
          value: receivedBy,
        }));
        setReceivedByFilter(filters);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch order received by filter");
    }
  };

  const filterOrderDeliveredByBranch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/filter/deliveredBy`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        const filters = data?.uniqueDeliveredBy?.map((deliveredBy) => ({
          text: deliveredBy,
          value: deliveredBy,
        }));
        setDeliveredByFilter(filters);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch order delivered  by filter");
    }
  };

  const filterOrderCustomerResponse = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/filter/customerResponse`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        const filters = data?.uniqueCustomerResponse?.map(
          (customerResponse) => ({
            text: customerResponse,
            value: customerResponse,
          })
        );
        setCustomerResponseFilter(filters);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch order customer response filter");
    }
  };
  const getAllOrders = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setOrdersData(data?.orders);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
    getOrderStatuses();
    filterOrderByBranch();
    filterOrderReceivedByBranch();
    filterOrderDeliveredByBranch();
    filterOrderCustomerResponse();
    fetchEmployees();
  }, []);
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchText ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSubmit = async (value) => {
    if (editOrder === null) {
      try {
        dispatch({
          type: "rootReducer/showLoading",
        });
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/order/create`,
          {
            ...value,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success(data?.message);
        setPopupModal(false);
        getAllOrders();
        dispatch({
          type: "rootReducer/hideLoading",
        });
      } catch (error) {
        dispatch({
          type: "rootReducer/hideLoading",
        });
        message.error("Something went wrong!");

        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "rootReducer/showLoading",
        });
        const { data } = await axios.put(
          `${import.meta.env.VITE_SERVER}/api/v1/order/${editOrder._id}`,
          {
            ...value,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success(data?.message);
        setPopupModal(false);
        getAllOrders();
        dispatch({
          type: "rootReducer/hideLoading",
        });
      } catch (error) {
        dispatch({
          type: "rootReducer/hideLoading",
        });
        message.error("Something went wrong!");

        console.log(error);
      }
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/order/${record._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success(data?.message);
      setPopupModal(false);
      getAllOrders();
      dispatch({
        type: "rootReducer/hideLoading",
      });
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      message.error("Something went wrong!");
      console.log(error);
    }
  };
  const columns = [
    {
      width: "100px !important",
      title: "Order On",
      dataIndex: "orderOn",
      key: "orderOn",
      sorter: (a, b) => moment(a.orderOn) - moment(b.orderOn),

      render: (text, record) => {
        return (
          <div
            style={{
              width: "100px !important",
            }}
          >
            {moment(text).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "empOrderStatus",
      key: "empOrderStatus",
      filters: orderStatusFilter,
      onFilter: (value, record) => {
        return record.empOrderStatus === value;
      },
      filterSearch: true,
      render: (empOrderStatus) => {
        let color = "";
        let text = empOrderStatus;

        // Set color and text based on order status
        switch (empOrderStatus) {
          case "Completed":
            color = "green";
            break;
          case "Pending":
            color = "gold";
            break;
          case "Not Possible":
            color = "volcano";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Mobile Number",
      dataIndex: "customerPhoneNo",
      key: "customerPhoneNo",
      ...getColumnSearchProps("customerPhoneNo"),
    },
    {
      title: "Phone Model",
      dataIndex: "phoneModel",
      key: "phoneModel",
      ...getColumnSearchProps("phoneModel"),
    },

    {
      title: "Mobile Issues",
      dataIndex: "mobileIssues",
      key: "mobileIssues",

      render: (_, record) => (
        <Select
          //   style={{width: }}
          mode="multiple"
          size="small"
          defaultValue={record.mobileIssues || ""}
        />
      ),
    },
    {
      title: "Sim & Memory Card",
      dataIndex: "simCardAndMemoryCard",
      key: "simCardAndMemoryCard",
      render: (_, record) => (
        <Select
          //   style={{width: }}
          mode="multiple"
          size="small"
          defaultValue={record.simCardAndMemoryCard || ""}
        />
      ),
    },
    {
      title: "Phone Password",
      dataIndex: "phonePassword",
      key: "phonePassword",
    },
    {
      title: "Box No",
      dataIndex: "boxNo",
      key: "boxNo",
      sorter: (a, b) => a.boxNo - b.boxNo,
      ...getColumnSearchProps("boxNo"),
    },
    {
      title: "Received By",
      dataIndex: "receivedBy",
      key: "receivedBy",
      filters: receivedByFilter,
      onFilter: (value, record) => {
        return record.receivedBy === value;
      },
      filterSearch: true,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Advance Amount",
      dataIndex: "advanceAmount",
      key: "advanceAmount",
    },
    {
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
    },
    {
      title: "Branch",
      dataIndex: "selectBranch",
      key: "selectBranch",
      filters: orderBanchFilter,
      onFilter: (value, record) => {
        return record.selectBranch === value;
      },
      filterSearch: true,
    },
    {
      title: "Customer Response",
      dataIndex: "customerResponse",
      key: "customerResponse",
      filters: customerResponseFilter,
      onFilter: (value, record) => {
        return record.customerResponse === value;
      },
      filterSearch: true,
    },
    {
      title: "Delivered By",
      dataIndex: "deliveredBy",
      key: "deliveredBy",
      filters: deliveredByFilter,
      onFilter: (value, record) => {
        return record.deliveredBy === value;
      },
      filterSearch: true,
    },
    {
      title: "Completed On",
      dataIndex: "orderCompletedOn",
      key: "orderCompletedOn",
      sorter: (a, b) => moment(a.orderCompletedOn) - moment(b.orderCompletedOn),
      render: (text) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },

    {
      title: "Actions",
      key: "actions",

      render: (text, record) => (
        <div className="d-flex align-items-center  justify-content-center ">
          <FaEdit
            style={{
              cursor: "pointer",
              color: "green",
              fontSize: "20px",
              marginRight: "0.5rem",
            }}
            onClick={() => {
              setEditOrder(record);
              setPopupModal(true);
            }}
          />
          <DeleteFilled
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "20px",
            }}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          />
        </div>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this order?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const [rotating, setRotating] = useState(false);
  console.log(ordersData);
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100">
          <h1 className="header-title"> Customer Orders</h1>
        </div>
        <div className="mb-2">
          <FloatButton
            type="primary"
            onClick={() => setPopupModal(true)}
            tooltip={<div>Add Order</div>}
            icon={<MdAssignmentAdd />}
          />
        </div>
      </div>
      <Table
        size="small"
        scroll={{
          x: "100vw",
        }}
        dataSource={ordersData}
        columns={columns}
        rowKey="_id"
        bordered
        loading={loading}
      />

      {/* pop modal */}
      {popupModal && (
        <Modal
          title={`${editOrder !== null ? "Edit Order" : "Add New Order"}`}
          open={popupModal}
          onCancel={() => {
            setEditOrder(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <OrderForm
            employees={employees}
            initialValues={editOrder}
            onFinish={handleSubmit}
          />
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default memo(OrdersPage);
