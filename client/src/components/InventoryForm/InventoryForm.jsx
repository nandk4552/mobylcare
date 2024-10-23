import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Modal,
  Select,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import InventoryService from "./InventoryService";
import { useDispatch } from "react-redux";
import axios from "axios";
const { useForm } = Form;
const InventoryForm = ({ open, onClose, onRefresh, item }) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/employees/list/names`
      );

      console.log("employees==>", data?.employees);
      setEmployees(data?.employees);
      dispatch({
        type: "rootReducer/hideLoading",
      });
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });

      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        itemName: item.itemName,
        quantity: item.quantity,
        costPrice: item.costPrice,
        itemCode: item.itemCode,
      });
    } else {
      form.resetFields();
    }
  }, [item, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("quantity", values.quantity);
      formData.append("costPrice", values.costPrice);
      formData.append("itemCode", values.itemCode);

      if (fileList.length > 0) {
        formData.append("photo", fileList[0].originFileObj);
      }

      if (item) {
        await InventoryService.updateInventoryItem(item._id, formData);
        message.success("Inventory item updated successfully");
      } else {
        await InventoryService.createInventoryItem(formData);
        message.success("Inventory item added successfully");
      }

      form.resetFields();
      setFileList([]);
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error creating/updating inventory item:", error);
      message.error("Error creating/updating inventory item");
    }
  };

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);
  return (
    <Modal
      title={item ? "Edit Inventory Item" : "Add Inventory Item"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="itemName"
          label="Item Name"
          rules={[{ required: true, message: "Please enter the item name" }]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter the quantity" }]}
        >
          <InputNumber
            min={0}
            placeholder="Quantity"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="costPrice"
          label="Cost Price"
          rules={[{ required: true, message: "Please enter the cost price" }]}
        >
          <InputNumber
            min={0}
            placeholder="Cost Price"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="itemCode"
          label="Item Code"
          rules={[{ required: true, message: "Please enter the item code" }]}
        >
          <Input placeholder="Item Code" />
        </Form.Item>
        <Form.Item name="addedBy" label="Added By" rules={[{ required: true }]}>
          <Select>
            {employees?.map((employee) => (
              <Select.Option key={employee?._id} value={employee?.name}>
                {employee?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="addedAt" label="Added At">
          <DatePicker showTime disabled />
        </Form.Item>
        <Form.Item name="photo" label="Photo">
          <Upload
            customRequest={handleUpload}
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload Photo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {item ? "Update Item" : "Add Item"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryForm;
