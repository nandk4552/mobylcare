import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { FaCashRegister, FaUsers } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { IoHome, IoPieChartSharp } from "react-icons/io5";
import { LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./DefaultLayout.css";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Set the title based on the current path
  const currentPath = window.location.pathname;
  let pageTitle = "Mobylcare"; // default title
  switch (currentPath) {
    case "/":
      pageTitle = "Home || Mobylcare";
      break;
    case "/charts":
      pageTitle = "Stats || Mobylcare";
      break;
    case "/invoice":
      pageTitle = "Invoice || Mobylcare";
      break;
    case "/customers":
      pageTitle = "Customers || Mobylcare";
      break;
    case "/orders":
      pageTitle = "Orders || Mobylcare";
      break;
    case "/employees":
      pageTitle = "Employees || Mobylcare";
      break;
    case "/inventory":
      pageTitle = "Inventory || Mobylcare";
      break;
    default:
      pageTitle = "Mobylcare";
      break;
  }

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* {loading && <Spinner />} */}
      <Title title={pageTitle} />

      <Sider
        className="side-bar-menu"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ overflow: "visible" }}
      >
        <div className="demo-logo-vertical">
          <h1>MC</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<IoHome size={"1.5rem"} color="#ccc" />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key="/charts"
            icon={<IoPieChartSharp size={"1.5rem"} color="#ccc" />}
          >
            <Link to="/charts">Charts</Link>
          </Menu.Item>
          <Menu.Item
            key="/bills"
            icon={<FaFileInvoice size={"1.5rem"} color="#ccc" />}
          >
            <Link to="/invoice">Invoice</Link>
          </Menu.Item>
          <Menu.Item
            key="/customers"
            icon={<FaUsers size={"1.5rem"} color="#ccc" />}
          >
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item
            key="/orders"
            icon={<FaCashRegister size={"1.5rem"} color="#ccc" />}
          >
            <Link to="/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item
            key="/employees"
            icon={<GrUserWorker size={"1.5rem"} color="#ccc" />}
          >
            <Link to="/employees">Employees</Link>
          </Menu.Item>
          <Menu.Item
            key="/inventory"
            icon={<MdOutlineInventory size={"1.5rem"} color="#ccc" />}
          >
            <Link to="/inventory">Inventory</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer, padding: 0 }}
          className="d-flex  align-items-center justify-content-between"
        >
          <div>
            <Button
              type="text"
              icon={
                collapsed ? (
                  <LuArrowRightFromLine color="#001529" size="1.5rem" />
                ) : (
                  <LuArrowLeftFromLine color="#001529" size="1.5rem" />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "white",
              }}
            />
          </div>
          <div className="me-3">
            <UserAvatar />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
