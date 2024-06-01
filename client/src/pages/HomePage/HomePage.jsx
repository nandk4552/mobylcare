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
import { IoIosSave } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout.jsx";
import "./HomePage.css";
import { FaRegSave, FaSave } from "react-icons/fa";

const { Option } = Select;
const HomePage = () => {
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
          <h1 className="header-title"> Order Registration</h1>
        </div>
        <Row>
          <Col span={24} lg={8} md={8} sm={24} className="me-2">
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
          <Col span={24} lg={12} md={8} sm={24} className="me-2">
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
              <Input type="text" placeholder="customer name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={8} md={8} sm={24} className="me-2">
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
              <Input type="number" placeholder="customer Mobile Number" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12} md={8} sm={24} className="me-2">
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
        <Row>
          <Col span={24} lg={20} md={8} sm={24} className="">
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
                <Select.Option value="Screen Damage">
                  Screen Damage
                </Select.Option>
                <Select.Option value="Water Damage">Water Damage</Select.Option>
                <Select.Option value="Charging Issue">
                  Charging Issue
                </Select.Option>
                <Select.Option value="Dead">Dead</Select.Option>
                <Select.Option value="Software Issue">
                  Software Issue
                </Select.Option>
                <Select.Option value="Mic Issue">Mic Issue</Select.Option>
                <Select.Option value="Receiver Issue">
                  Receiver Issue
                </Select.Option>
                <Select.Option value="Sensor Issue">Sensor Issue</Select.Option>
                <Select.Option value="Ringer (Speaker)">
                  Ringer (Speaker)
                </Select.Option>
                <Select.Option value="Broken touch or glass">
                  Broken touch or glass
                </Select.Option>
                <Select.Option value="Battery issue">
                  Battery issue
                </Select.Option>
                <Select.Option value="back door">back door</Select.Option>
                <Select.Option value="power button">power button</Select.Option>
                <Select.Option value="volume buttons">
                  volume buttons
                </Select.Option>
                <Select.Option value="camera issue">camera issue</Select.Option>
                <Select.Option value="refitting">refitting</Select.Option>
                <Select.Option value="frame">frame</Select.Option>
                <Select.Option value="Network issue">
                  Network issue
                </Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={20} md={8} sm={24} className="me-2">
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
        <Row>
          <Col span={24} lg={10} md={8} sm={24} className="me-2">
            <Form.Item label="Phone Password" name="phonePassword">
              <Input type="number" placeholder="phone password" />
            </Form.Item>
          </Col>

          <Col span={24} lg={10} md={8} sm={24} className="me-2">
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
              <Input type="text" placeholder="Enter box number" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={10} md={8} sm={24} className="me-2">
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
              <Select placeholder="select received by">
                <Option value="Aman Singh">Aman Singh</Option>
                <Option value="Santosh Singh">Santosh Singh</Option>
                <Option value="Shubham">Shubham</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} lg={10} md={8} sm={24} className="me-2">
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
              <Select placeholder="select order status">
                <Option value="Completed">Completed</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Not possible">Not possible</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={20} md={8} sm={24} className="me-2">
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
              <Input type="number" placeholder="enter total amount" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={10} md={8} sm={24} className="me-2">
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
              <Input type="text" placeholder="enter advance ammount" />
            </Form.Item>
          </Col>

          <Col span={24} lg={10} md={8} sm={24} className="me-2">
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
              <Input type="text" placeholder="enter due amount" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={10} md={8} sm={24} className="me-2">
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
              <Select placeholder="select branch">
                <Option value="BS">BS</Option>
                <Option value="DS">DS</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} lg={10} md={8} sm={24} className="me-2">
            <Form.Item label="Customer Response" name="customerResponse">
              <Select placeholder="select customer response">
                <Option value="Delivered">Delivered</Option>
                <Option value="No Response">No Response</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={10} md={8} sm={24} className="me-2">
            <Form.Item label="Order Completed On" name="orderCompletedOn">
              <DatePicker
                className="w-100 "
                placeholder="completed on"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={10} md={8} sm={24} className="me-2">
            <Form.Item label="Delivered By" name="deliveredBy">
              <Select type="text" placeholder="select delivered by">
                <Option value="Aman Singh">Aman Singh</Option>
                <Option value="Santosh Singh">Santosh Singh</Option>
                <Option value="Shubham">Shubham</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} lg={16} md={8} sm={24} className="me-2">
            <div className="d-flex justify-content-center align-items-center ">
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                className="w-50 "
                icon={<FaSave />}
              >
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </DefaultLayout>
  );
};

export default HomePage;
