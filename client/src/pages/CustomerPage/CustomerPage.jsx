import { DeleteFilled, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, FloatButton, Input, Modal, Table, message } from "antd";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words"; // Import Highlighter component
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import CustomersForm from "../../components/CustomerForm/CustomerForm";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import "./CustomerPage.css";

const confirm = Modal.confirm;
const { Column } = Table;

const CustomerPage = () => {
  const loading = useSelector((state) => state.rootReducer.loading);

  const [customersData, setCustomersData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [popupModal, setPopupModal] = useState(false); // State for controlling the popup modal
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [editOrder, setEditOrder] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/customer/get-all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCustomersData(data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = async (clearFilters) => {
    clearFilters();
    setSearchText("");
    await getAllCustomers(); // Fetch all customers again after resetting
  };
  const handleRefresh = async () => {
    setLoading(true); // Set loading to true when refreshing
    window.location.reload(); // Reload the overall page
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

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this customer?",
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

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Customer Name",
      dataIndex: "name", // Change to the correct field name from the backend
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Contact No",
      dataIndex: "phoneNo", // Change to the correct field name from the backend
      key: "phoneNo",
      ...getColumnSearchProps("phoneNo"),
    },
    {
      title: "Actions",
      key: "actions",

      render: (text, record) => (
        <div>
          <FaUserEdit
            style={{
              cursor: "pointer",
              color: "green",
              fontSize: "20px",
              marginRight: "1.2rem",
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

  const handleSubmit = async (value) => {
    if (editOrder === null) {
      try {
        dispatch({
          type: "rootReducer/showLoading",
        });
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/customer/add`,
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
        getAllCustomers();
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
          `${import.meta.env.VITE_SERVER}/api/v1/customer/${editOrder._id}`,
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
        getAllCustomers();
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
        `${import.meta.env.VITE_SERVER}/api/v1/customer/${record._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success(data?.message);
      setPopupModal(false);
      getAllCustomers();
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
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100">
          <h1 className="header-title"> Customers</h1>
        </div>
        <div className="mb-2">
          <FloatButton.Group
            shape="circle"
            type="primary"
            style={{
              right: 30,
            }}
          >
            {toggle && (
              <>
                <FloatButton
                  onClick={handleRefresh}
                  type="primary"
                  style={{ marginRight: "10px" }}
                  icon={<SyncOutlined spin={loading} />}
                />
                <FloatButton
                  onClick={() => setPopupModal(true)}
                  type="primary"
                  tooltip={<div>Add Customer</div>}
                  icon={<FaUserPlus />}
                />
              </>
            )}
            <div onClick={handleToggle}>
              {toggle ? (
                <FloatButton.BackTop
                  icon={<IoIosArrowDropdown />}
                  type="primary"
                  visibilityHeight={0}
                />
              ) : (
                <FloatButton.BackTop
                  icon={<IoIosArrowDropup />}
                  type="primary"
                  visibilityHeight={0}
                />
              )}
            </div>
          </FloatButton.Group>
        </div>
      </div>
      <Table loading={loading} dataSource={customersData} bordered>
        {columns?.map((column, index) => (
          <Column {...column} key={index} />
        ))}
      </Table>

      {/* pop modal */}
      {popupModal && (
        <Modal
          title={`${editOrder !== null ? "Edit Customer" : "Add New Customer"}`}
          open={popupModal}
          onCancel={() => {
            setEditOrder(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <CustomersForm initialValues={editOrder} onFinish={handleSubmit} />
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default memo(CustomerPage);
