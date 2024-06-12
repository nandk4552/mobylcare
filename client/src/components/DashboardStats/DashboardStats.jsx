import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
  FaCheckCircle,
  FaRupeeSign,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa"; // Importing icons
import "./DashboardStats.css";
import { useNavigate } from "react-router-dom";

const DashboardStats = ({ loading, stats }) => {
  const navigate = useNavigate();
  return (
    <Row gutter={20}>
      <Col span={24} sm={12} lg={6} md={12}>
        <Card
          loading={loading}
          bordered={false}
          onClick={() => navigate("/orders")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaShoppingCart style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3>Total Orders</h3>
          </div>
          <Statistic
            value={stats?.totalOrders}
            precision={0}
            valueStyle={{ color: "#fff" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={24} sm={12} lg={6} md={12}>
        <Card loading={loading} bordered={false}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaCheckCircle style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3>Completed</h3>
          </div>
          <Statistic
            value={stats?.completedOrders}
            precision={0}
            valueStyle={{ color: "#fff" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={24} sm={12} lg={6} md={12}>
        <Card
          loading={loading}
          bordered={false}
          onClick={() => navigate("/customers")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaUsers style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3>Total Users</h3>
          </div>
          <Statistic
            value={stats?.totalUsers}
            precision={0}
            valueStyle={{ color: "#fff" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col span={24} sm={12} lg={6} md={12}>
        <Card loading={loading} bordered={false}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaRupeeSign style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3>Revenue</h3>
          </div>
          <Statistic
            value={stats?.revenue}
            precision={2}
            valueStyle={{ color: "#fff" }}
            prefix={<ArrowUpOutlined />}
            suffix="/-"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardStats;
