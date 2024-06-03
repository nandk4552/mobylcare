import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout.jsx";
import "./HomePage.css";
import { useEffect, useState } from "react";

const { Option } = Select;
const HomePage = () => {
  const { loading } = useSelector((state) => state.rootReducer);
  const [employees, setEmployees] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
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
      dispatch({
        type: "rootReducer/hideLoading",
      });
      navigate("/orders");
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      message.error("Something went wrong!");

      console.log(error);
    }
  };
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

  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <DefaultLayout>
      <Form
        size="middle"
        layout="horizontal"
        autoComplete="on"
        onFinish={handleSubmit}
        className="home-form"
      >
        <div className="w-100">
          <h1 className="header-title">Order Registration</h1>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <DatePicker format="YYYY-MM-DD" className="w-100" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Input type="text" placeholder="Customer Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Input type="number" placeholder="Customer Mobile Number" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Input type="text" placeholder="Phone Model" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={24} md={24} sm={24}>
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
                className="w-100"
                mode="multiple"
                placeholder="Please select issues"
              >
                <Option value="Screen Damage">Screen Damage</Option>
                <Option value="Water Damage">Water Damage</Option>
                <Option value="Charging Issue">Charging Issue</Option>
                <Option value="Dead">Dead</Option>
                <Option value="Software Issue">Software Issue</Option>
                <Option value="Mic Issue">Mic Issue</Option>
                <Option value="Receiver Issue">Receiver Issue</Option>
                <Option value="Sensor Issue">Sensor Issue</Option>
                <Option value="Ringer (Speaker)">Ringer (Speaker)</Option>
                <Option value="Broken touch or glass">
                  Broken touch or glass
                </Option>
                <Option value="Battery issue">Battery issue</Option>
                <Option value="back door">back door</Option>
                <Option value="power button">power button</Option>
                <Option value="volume buttons">volume buttons</Option>
                <Option value="camera issue">camera issue</Option>
                <Option value="refitting">refitting</Option>
                <Option value="frame">frame</Option>
                <Option value="Network issue">Network issue</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={24} md={24} sm={24}>
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
                <Option value="No sim & memory card">
                  No SIM & Memory Card
                </Option>
                <Option value="Jio">Jio</Option>
                <Option value="Airtel">Airtel</Option>
                <Option value="VI">VI</Option>
                <Option value="BSNL">BSNL</Option>
                <Option value="Memory card">Memory Card</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
            <Form.Item label="Phone Password" name="phonePassword">
              <Input type="number" placeholder="Phone Password" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Input type="text" placeholder="Box Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Select placeholder="Select received by">
                {employees?.map((employee) => (
                  <Option key={employee?._id} value={employee?.name}>
                    {employee?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Select placeholder="Select order status">
                <Option value="Completed">Completed</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Not possible">Not possible</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={24} md={24} sm={24}>
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
              <Input type="number" placeholder="Enter total amount" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Input type="number" placeholder="Enter advance amount" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Input type="number" placeholder="Enter due amount" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
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
              <Select placeholder="Select branch">
                <Option value="BS">BS</Option>
                <Option value="DS">DS</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
            <Form.Item label="Customer Response" name="customerResponse">
              <Select placeholder="Select customer response">
                <Option value="Delivered">Delivered</Option>
                <Option value="No Response">No Response</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12} md={12} sm={24}>
            <Form.Item label="Order Completed On" name="orderCompletedOn">
              <DatePicker
                className="w-100"
                placeholder="Completed on"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
            <Form.Item label="Delivered By" name="deliveredBy">

              <Select placeholder="Select delivered by">
                {employees?.map((employee) => (
                  <Option key={employee?._id} value={employee?.name}>
                    {employee?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              className="w-50"
              icon={<FaSave />}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </DefaultLayout>
  );
};

export default HomePage;
