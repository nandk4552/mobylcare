import { Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import OrdersChart from "../../components/OrdersChart/OrdersChart";
import "./ChartsPage.css";

import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import DashboardStats from "../../components/DashboardStats/DashboardStats";

// Register required elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const countOrderStatuses = (orders) => {
  const statusCount = {
    Completed: 0,
    Pending: 0,
    "Not Possible": 0,
  };

  orders.forEach((order) => {
    if (statusCount[order.empOrderStatus] !== undefined) {
      statusCount[order.empOrderStatus]++;
    }
  });

  return statusCount;
};

const countOrdersByPerson = (orders) => {
  const ordersByPerson = {};

  orders.forEach((order) => {
    const { deliveredBy } = order;
    if (deliveredBy) {
      if (!ordersByPerson[deliveredBy]) {
        ordersByPerson[deliveredBy] = 1;
      } else {
        ordersByPerson[deliveredBy]++;
      }
    }
  });

  return ordersByPerson;
};

const ChartsPage = () => {
  const { loading } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const [ordersData, setOrdersData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  // for stats
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });

  const getStats = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setStats(data);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setOrdersData(data?.orders);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };

  const getRecentFiveOrders = async () => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/order/charts/latest`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "rootReducer/hideLoading",
      });
      setRecentOrders(data?.orders);
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
    getRecentFiveOrders();
    getStats();
  }, []);

  const statusCount = countOrderStatuses(ordersData);
  const ordersByPerson = countOrdersByPerson(ordersData);

  const doughnutData = {
    labels: Object.keys(ordersByPerson),
    datasets: [
      {
        label: "Orders by Person",
        data: Object.values(ordersByPerson),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Order Status",
        data: Object.values(statusCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <DefaultLayout>
      <div className="container-fluid card-chart p-0">
        <DashboardStats loading={loading} stats={stats} />
      </div>
      <div className="recent-orders-section">
        <Card>
          <OrdersChart className="w-100" />
        </Card>
      </div>
      <div className="charts-section">
        <Row gutter={12}>
          <Col span={24} lg={6} md={6} sm={24}>
            <Card>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Order Status",
                    },
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={24} lg={6} md={6} sm={24}>
            <Card>
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Orders Completed By",
                    },
                  },
                }}
              />
            </Card>
          </Col>
          <Col span={24} lg={12} md={12} sm={24}>
            <Card
              title="Recent Orders"
              className="table-responsive table-responsive-sm"
            >
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Response</th>
                    <th scope="col">Empolyee</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index + 1}>
                      <th scope="row">{order._id}</th>
                      <td>{order.customerName}</td>
                      <td>{order.customerResponse}</td>
                      <td>{order.deliveredBy}</td>
                      <td>{order.totalAmount}/-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default ChartsPage;
