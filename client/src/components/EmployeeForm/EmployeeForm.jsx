import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import EmployeeService from "./EmployeeService";
import moment from "moment";
const { Option } = Select;

const EmployeeForm = ({ open, onClose, onRefresh, employee }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        name: employee.name,
        role: employee.role,
        phone: employee.phone,
        email: employee.email,
        dateOfJoining: moment(employee.dateOfJoining), // Moment for correct date format
        familyNumber: employee.familyNumber,
        address: employee.address,
      });
    } else {
      form.resetFields();
    }
  }, [employee, form]);

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append(
        "dateOfJoining",
        values.dateOfJoining.format("YYYY-MM-DD")
      ); // Format date for backend
      formData.append("familyNumber", values.familyNumber);
      formData.append("address", values.address);

      if (fileList.length > 0) {
        formData.append("photoAttachment", fileList[0].originFileObj);
      }

      if (employee) {
        await EmployeeService.updateEmployee(employee?._id, formData);
        message.success("Employee updated successfully");
      } else {
        await EmployeeService.createEmployee(formData);
        message.success("Employee added successfully");
      }

      form.resetFields();
      setFileList([]);
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error adding/updating employee item:", error);
    }
  };

  return (
    <Modal
      title={employee ? "Edit Employee" : "Add Employee"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="employee-form container mx-3">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="dateOfJoining"
                label="Date of Joining"
                rules={[
                  {
                    required: true,
                    message: "Please input the date of joining!",
                  },
                ]}
              >
                <DatePicker format="DD-MM-YYYY" placeholder="Joining date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="photoAttachment" label="Photo">
                <Upload
                  customRequest={handleUpload}
                  listType="picture"
                  fileList={fileList}
                  onChange={handleChange}
                >
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input placeholder="Enter Employee Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select the role!" }]}
              >
                <Select placeholder="Select a role">
                  <Option value="Admin">Admin</Option>
                  <Option value="Employee">Employee</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please input the phone number!" },
                ]}
              >
                <Input placeholder="Enter 10 digit mobile number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please input the email!" }]}
              >
                <Input placeholder="Enter valid email address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="familyNumber"
                label="Family Number"
                rules={[
                  {
                    required: true,
                    message: "Please input the family number!",
                  },
                ]}
              >
                <Input placeholder="Enter 10 digit family mobile number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please input the address!" },
                ]}
              >
                <Input placeholder="Enter your address" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<FaSave />}
                >
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default EmployeeForm;
