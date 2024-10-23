import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaUserLock } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      dispatch({
        type: "rootReducer/showLoading",
      });
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/auth/login`,
        values
      );
      message.success(data?.message);
      dispatch({
        type: "rootReducer/hideLoading",
      });
      localStorage.setItem("auth", JSON.stringify(data?.user));
      localStorage.setItem("token", data?.token);

      navigate("/");
    } catch (error) {
      dispatch({
        type: "rootReducer/hideLoading",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="login-form">
        <h3>Login to MobylCare</h3>
        <hr className="divider" />
        <Form layout="vertical" autoComplete="on" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter a valid Email ID!",
              },
            ]}
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter Valid Email ID"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              name="password"
              placeholder="Enter Valid Password"
            />
          </Form.Item>
          <div className="form-footer">
            <div className="links-container">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="link">
                  Register Here!
                </Link>
              </p>
              <p>
                Forgot Password?{" "}
                <Link to="/password-reset" className="link">
                  Click Here!
                </Link>
              </p>
            </div>
            <Button type="primary" htmlType="submit" icon={<FaUserLock />}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(Login);
