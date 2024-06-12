import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, FloatButton, Input, Modal, Table, message, Form } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import EmployeeService from "../../components/EmployeeForm/EmployeeService";
import moment from "moment";
const { confirm } = Modal;
const EmployeesPage = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupModal, setPopupModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [toggle, setToggle] = useState(false);
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    setLoading(true);
    try {
      const { employees } = await EmployeeService.getAllEmployees();
      setEmployeesData(employees);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await EmployeeService.deleteEmployee(id);
      message.success("Employee deleted successfully.");
      fetchAllEmployees();
    } catch (error) {
      console.log("Failed to delete Employee");
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditEmployee(null);
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = async (clearFilters) => {
    clearFilters();
    setSearchText("");
    await fetchAllEmployees();
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchAllEmployees();
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
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
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

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
      render: (record, index) => {
        return (
          <div
            style={{
              width: "100px!important",
            }}
          >
            {moment(record.dateOfJoining).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Phone Number",
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
      title: "ID Proof",
      dataIndex: "photoAttachment",
      key: "photoAttachment",
      render: (text, record) => (
        <img
          src={`${import.meta.env.VITE_SERVER}/api/v1/employees/emp-photo/${
            record?._id
          }`}
          alt={record?.name}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Family Number",
      dataIndex: "familyNumber",
      key: "familyNumber",
      ...getColumnSearchProps("familyNumber"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span className="d-flex align-items-center  justify-content-center ">
          <FaRegEdit
            style={{
              cursor: "pointer",
              color: "green",
              fontSize: "20px",
              marginRight: "1rem",
            }}
            onClick={() => handleEdit(record)}
          />

          <MdDelete
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "1.5rem",
            }}
            onClick={() => handleDelete(record?._id)}
          />
        </span>
      ),
    },
  ];

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    confirm({
      title: "Are you sure you want to delete this employee?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await EmployeeService.deleteEmployee(id);
          message.success("Employee deleted successfully!");
          await fetchAllEmployees();
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      },
    });
  };

  return (
    <DefaultLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="w-100">
            <h1 className="header-title">Employees</h1>
          </div>
          <div className="mb-2">
            <FloatButton.Group
              shape="circle"
              type="primary"
              style={{ right: 30 }}
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
                      setIsModalVisible(true);
                    }}
                    type="primary"
                    tooltip={<div>Add Employee</div>}
                    icon={<FaPlus />}
                  />
                </>
              )}
              <div onClick={handleToggle}>
                {toggle ? (
                  <FloatButton.BackTop
                    icon={<IoIosArrowDropdown size={"1.2rem"} />}
                    type="primary"
                    visibilityHeight={0}
                  />
                ) : (
                  <FloatButton.BackTop
                    icon={<IoIosArrowDropup size={"1.2rem"} />}
                    type="primary"
                    visibilityHeight={0}
                  />
                )}
              </div>
            </FloatButton.Group>
          </div>
        </div>
        <Table
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            borderRadius: "10px",
          }}
          columns={columns}
          dataSource={employeesData}
          rowKey="_id"
          loading={loading}
          bordered
        />

        <EmployeeForm
          open={isModalVisible}
          onClose={handleModalClose}
          onRefresh={fetchAllEmployees}
          employee={editEmployee}
        />
      </div>
    </DefaultLayout>
  );
};

export default memo(EmployeesPage);
