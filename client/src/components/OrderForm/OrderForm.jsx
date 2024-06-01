import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
dayjs.extend(customParseFormat);

const { Option } = Select;

const OrderForm = ({ initialValues, onFinish }) => {
  const formattedInitialValues = {
    ...initialValues,
    orderOn: initialValues?.orderOn ? moment(initialValues.orderOn) : null,
    orderCompletedOn: initialValues?.orderCompletedOn
      ? moment(initialValues?.orderCompletedOn)
      : null,
  };
  return (
    <Form
      size="small"
      initialValues={formattedInitialValues}
      layout="horizontal"
      autoComplete="on"
      onFinish={onFinish}
    >
      <Form.Item
        label="Order On"
        name="orderOn"
        rules={[
          {
            required: true,
            message: "Please input order date!",
          },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[
          {
            required: true,
            message: "Please input customer name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Customer Phone No"
        name="customerPhoneNo"
        rules={[
          {
            required: true,
            message: "Please input customer phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone Model"
        name="phoneModel"
        rules={[
          {
            required: true,
            message: "Please input phone model!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mobile Issues"
        name="mobileIssues"
        rules={[
          {
            required: true,
            message: "Please select mobile issues!",
          },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          <Select.Option value="Screen Damage">Screen Damage</Select.Option>
          <Select.Option value="Water Damage">Water Damage</Select.Option>
          <Select.Option value="Charging Issue">Charging Issue</Select.Option>
          <Select.Option value="Dead">Dead</Select.Option>
          <Select.Option value="Software Issue">Software Issue</Select.Option>
          <Select.Option value="Mic Issue">Mic Issue</Select.Option>
          <Select.Option value="Receiver Issue">Receiver Issue</Select.Option>
          <Select.Option value="Sensor Issue">Sensor Issue</Select.Option>
          <Select.Option value="Ringer (Speaker)">
            Ringer (Speaker)
          </Select.Option>
          <Select.Option value="Broken touch or glass">
            Broken touch or glass
          </Select.Option>
          <Select.Option value="Battery issue">Battery issue</Select.Option>
          <Select.Option value="back door">back door</Select.Option>
          <Select.Option value="power button">power button</Select.Option>
          <Select.Option value="volume buttons">volume buttons</Select.Option>
          <Select.Option value="camera issue">camera issue</Select.Option>
          <Select.Option value="refitting">refitting</Select.Option>
          <Select.Option value="frame">frame</Select.Option>
          <Select.Option value="Network issue">Network issue</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Sim & Memory Card"
        name="simCardAndMemoryCard"
        rules={[
          {
            required: true,
            message: "Please select SIM card & memory card option!",
          },
        ]}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          <Option value="No sim & memory card">No SIM & Memory Card</Option>
          <Option value="Jio">Jio</Option>
          <Option value="Airtel">Airtel</Option>
          <Option value="VI">VI</Option>
          <Option value="BSNL">BSNL</Option>
          <Option value="Memory card">Memory Card</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Phone Password" name="phonePassword">
        <Input />
      </Form.Item>
      <Form.Item
        label="Box No"
        name="boxNo"
        rules={[
          {
            required: true,
            message: "Please input box number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Received By"
        name="receivedBy"
        rules={[
          {
            required: true,
            message: "Please select received by!",
          },
        ]}
      >
        <Select>
          <Option value="Aman Singh">Aman Singh</Option>
          <Option value="Santosh Singh">Santosh Singh</Option>
          <Option value="Shubham">Shubham</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="EMP Order Status"
        name="empOrderStatus"
        rules={[
          {
            required: true,
            message: "Please select order status!",
          },
        ]}
      >
        <Select>
          <Option value="Completed">Completed</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Not Possible">Not Possible</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Total Amount"
        name="totalAmount"
        rules={[
          {
            required: true,
            message: "Please input total amount!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Advance Amount"
        name="advanceAmount"
        rules={[
          {
            required: true,
            message: "Please input advance amount!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Due Amount"
        name="dueAmount"
        rules={[
          {
            required: true,
            message: "Please input due amount!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Select Branch"
        name="selectBranch"
        rules={[
          {
            required: true,
            message: "Please select branch!",
          },
        ]}
      >
        <Select>
          <Option value="BS">BS</Option>
          <Option value="DS">DS</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Customer Response"
        name="customerResponse"
        rules={[
          {
            required: true,
            message: "Please select customer response!",
          },
        ]}
      >
        <Select>
          <Option value="Delivered">Delivered</Option>
          <Option value="No Response">No Response</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Delivered By"
        name="deliveredBy"
        rules={[
          {
            required: true,
            message: "Please select delivered by!",
          },
        ]}
      >
        <Select>
          <Option value="Aman Singh">Aman Singh</Option>
          <Option value="Santosh Singh">Santosh Singh</Option>
          <Option value="Shubham">Shubham</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Order Completed On" name="orderCompletedOn">
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <div className="d-flex justify-content-end">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default OrderForm;
