import { Button, DatePicker, Form, Input, Select, Row, Col } from "antd";
const { Option } = Select;
import "./EmployeeForm.css"; // Make sure to create and update this CSS file for custom styling
import moment from "moment";
import { FaSave } from "react-icons/fa";

const EmployeeForm = ({ initialValues, onFinish }) => {
  const formattedInitialValues = {
    ...initialValues,
    dateOfJoining: initialValues?.dateOfJoining
      ? moment(initialValues.dateOfJoining)
      : null,
  };

  return (
    <div className="employee-form  container mx-3">
      <Form
        size="large" // Use large size for better readability
        initialValues={formattedInitialValues}
        layout="vertical"
        autoComplete="on"
        onFinish={onFinish}
      >
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
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block icon={<FaSave />}>
                save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EmployeeForm;
