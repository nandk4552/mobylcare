// src/OrdersChart.js
import { Switch } from "antd";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns"; // For date/time formatting
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const OrdersChart = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("daily");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Daily Orders",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        view === "daily"
          ? "/api/v1/order/charts/daily"
          : "/api/v1/order/charts/monthly";

      try {
        dispatch({
          type: "rootReducer/showLoading",
        });
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({
          type: "rootReducer/hideLoading",
        });

        const labels = data.map((item) => item._id);
        const counts = data.map((item) => item.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: view === "daily" ? "Daily Orders" : "Monthly Orders",
              data: counts,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        dispatch({
          type: "rootReducer/hideLoading",
        });
        console.log(error);
      }
    };

    fetchData();
  }, [view]);

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: view === "daily" ? "day" : "month",
          tooltipFormat: view === "daily" ? "yyyy-MM-dd" : "yyyy-MM",
        },
        title: {
          display: true,
          text: view === "daily" ? "Date" : "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Order Count",
        },
        beginAtZero: true,
      },
    },
  };

  const handleSwitch = (checked) => {
    setView(checked ? "monthly" : "daily");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end ">
        <Switch
          checkedChildren="Monthly"
          unCheckedChildren="Daily"
          defaultChecked={view === "monthly"} // Set the default state based on the current view
          onChange={handleSwitch}
        />
      </div>
      <Bar
        style={{
          width: "100% !important",
        }}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default OrdersChart;
