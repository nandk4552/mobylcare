import { DeleteFilled, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, FloatButton, Input, Modal, Table, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words"; // Import Highlighter component
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import "./EmployeesPage.css";
import { IoIosPersonAdd } from "react-icons/io";
import moment from "moment";

const confirm = Modal.confirm;
const { Column } = Table;

const EmployeesPage = () => {
  const [EmployeesData, setEmployeesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading state
  const [popupModal, setPopupModal] = useState(false); // State for controlling the popup modal
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [editOrder, setEditOrder] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/employees/get-all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false); // Set loading to false after data is fetched

      const employeesWithKeys = data.employees?.map((employee, index) => ({
        ...employee,
        key: employee._id, // Ensure each row has a unique key
      }));

      setEmployeesData(employeesWithKeys);
    } catch (error) {
      setLoading(false); // Set loading to false if there's an error
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
    await getAllEmployees(); // Fetch all customers again after resetting
  };

  const handleRefresh = async () => {
    setLoading(true);
    await getAllEmployees();
    setToggle(false);
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchText ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this employee?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Date of Joining",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
      render: (text) =>
        text
          ? moment(text).isValid()
            ? moment(text).format("DD-MM-YYYY")
            : "Invalid Date"
          : "N/A", // Format date using moment with validation
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
          `${import.meta.env.VITE_SERVER}/api/v1/employees/add`,
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
        getAllEmployees();
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
          `${import.meta.env.VITE_SERVER}/api/v1/employees/${editOrder._id}`,
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
        getAllEmployees();
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
        `${import.meta.env.VITE_SERVER}/api/v1/employees/${record._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success(data?.message);
      getAllEmployees();
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
          <h1 className="header-title"> Employees</h1>
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
                  onClick={() => {
                    setPopupModal(true);
                    setToggle(false);
                  }}
                  type="primary"
                  tooltip={<div>Add Employee</div>}
                  icon={<IoIosPersonAdd />}
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
      <Table dataSource={EmployeesData} bordered loading={loading}>
        {columns.map((column) => (
          <Column {...column} key={column.key} />
        ))}
      </Table>

      {/* pop modal */}
      {popupModal && (
        <Modal
          title={`${editOrder !== null ? "Edit Employee" : "Add New Employee"}`}
          open={popupModal}
          onCancel={() => {
            setEditOrder(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <EmployeeForm initialValues={editOrder} onFinish={handleSubmit} />
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default EmployeesPage;
