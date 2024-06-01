import { Button, Form, Input } from "antd";

const CustomersForm = ({ initialValues, onFinish }) => {
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
      layout="vertical"
      autoComplete="on"
      onFinish={onFinish}
    >
      <Form.Item
        label="Customer Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input customer name!",
          },
        ]}
      >
        <Input placeholder="Enter customer name" type="text" required />
      </Form.Item>
      <Form.Item
        label="Customer Phone No"
        name="phoneNo"
        rules={[
          {
            required: true,
            message: "Please input customer phone number!",
          },
        ]}
      >
        <Input
          type="number"
          placeholder="Enter customer phone number"
          required
        />
      </Form.Item>

      <div className="d-flex justify-content-end">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CustomersForm;
