import React from "react";
import { Form, Row, Col, Input, Typography } from "antd";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import YellowButton from "../common/button/Button";

import { loginUser } from "../../redux/actions/authActions";
import "./login.scss";

const { Title } = Typography;

const Login = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, password } = values;
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Row>
      <Col span={24}>
        <div className="form-container layout vertical center-center">
          <Title level={3}>Welcome to the Etinx Savings app</Title>
          <Title level={5} className="skamy-gray mb--40 mt--5">
            Log into your account
          </Title>

          <Form
            name="normal_login"
            className="login-form"
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="email"
              className="bold"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email or email"
                allowClear
                className="login-form-input"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="bold"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                name="password"
                placeholder="Enter your password"
                className="login-form-input"
              />
            </Form.Item>

            <Form.Item>
              <YellowButton
                htmlType="submit"
                className="btn-block"
                text={loading ? "Logging in..." : "Login"}
                disabled={loading}
              />
            </Form.Item>
            <Link to="/register">
              <span className="bottom-text">Register</span>
            </Link>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
