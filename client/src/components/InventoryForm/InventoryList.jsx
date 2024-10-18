import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, FloatButton, Input, Table, message } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import InventoryForm from "./InventoryForm";
import InventoryService from "./InventoryService";

const InventoryList = () => {
  const [searchText, setSearchText] = useState("");

  const searchInput = useRef(null);

  const [toggle, setToggle] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const data = await InventoryService.getAllInventoryItems();
      setInventoryItems(data.inventories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      message.error("Failed to fetch inventory items.");
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      await InventoryService.deleteInventoryItem(id);
      message.success("Item deleted successfully.");
      fetchInventoryItems();
    } catch (error) {
      message.error("Failed to delete item.");
      setLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const handleRefresh = () => {
    setLoading(true);
    window.location.reload();
  };
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    fetchInventoryItems();
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

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      ...getColumnSearchProps("itemName"),
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Cost Price", dataIndex: "costPrice", key: "costPrice" },
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
      ...getColumnSearchProps("itemCode"),
    },
    {
      title: "Added By",
      dataIndex: ["addedBy", "name"],
      key: "addedBy",
    },
    {
      title: "Added At",
      dataIndex: "addedAt",
      key: "addedAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Taken By",
      dataIndex: ["takenBy", "name"],
      key: "takenBy",
    },
    {
      title: "Taken At",
      dataIndex: "takenAt",
      key: "takenAt",
      render: (text) => (text ? new Date(text).toLocaleString() : "N/A"),
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text, record) => (
        <img
          src={`${import.meta.env.VITE_SERVER}/api/v1/inventory/item-photo/${
            record._id
          }`}
          alt={record.itemName}
          style={{ width: "50px", height: "50px" }}
        />
      ),
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
            onClick={() => handleEditItem(record)}
          />

          <MdDelete
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "1.5rem",
            }}
            onClick={() => deleteItem(record._id)}
          />
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="w-100">
          <h1 className="header-title">Inventory</h1>
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
                  tooltip={<div>Add Item</div>}
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
        dataSource={inventoryItems}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <InventoryForm
        open={isModalVisible}
        onClose={handleModalClose}
        onRefresh={fetchInventoryItems}
        item={editingItem}
      />
    </div>
  );
};

export default InventoryList;
