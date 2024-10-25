import { Button, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
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

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Set the title based on the current path
  const currentPath = window.location.pathname;
  let pageTitle = "Mobylcare";
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

  // Define menu items for the sidebar
  const menuItems = [
    {
      key: "/",
      icon: <IoHome size={"1.5rem"} color="#ccc" />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/charts",
      icon: <IoPieChartSharp size={"1.5rem"} color="#ccc" />,
      label: <Link to="/charts">Charts</Link>,
    },
    {
      key: "/invoice",
      icon: <FaFileInvoice size={"1.5rem"} color="#ccc" />,
      label: <Link to="/invoice">Invoice</Link>,
    },
    {
      key: "/customers",
      icon: <FaUsers size={"1.5rem"} color="#ccc" />,
      label: <Link to="/customers">Customers</Link>,
    },
    {
      key: "/orders",
      icon: <FaCashRegister size={"1.5rem"} color="#ccc" />,
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: "/employees",
      icon: <GrUserWorker size={"1.5rem"} color="#ccc" />,
      label: <Link to="/employees">Employees</Link>,
    },
    {
      key: "/inventory",
      icon: <MdOutlineInventory size={"1.5rem"} color="#ccc" />,
      label: <Link to="/inventory">Inventory</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Title title={pageTitle} />

      <Sider
        className="side-bar-menu"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          display: isMobile && collapsed ? "none" : "block",
          overflow: "visible",
        }}
      >
        <div className="demo-logo-vertical">
          <h1>MC</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={menuItems} // Use the `items` prop instead of `children`
        />
      </Sider>

      <Layout>
        <Header
          style={{ background: colorBgContainer, padding: 0 }}
          className="d-flex align-items-center justify-content-between"
        >
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
