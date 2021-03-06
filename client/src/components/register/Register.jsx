import React from "react";
import { Form, Row, Col, Input, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import YellowButton from "../common/button/Button";

import { registerUser } from "../../redux/actions/authActions";
import "../login/login.scss";
import notify from "../../helpers/notification";

const { Title } = Typography;

const Register = () => {
  const { loading } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  const callBack = () => history.push("/login");

  const onFinish = async (values) => {
    const { email, password, confirm_password } = values;
    if (confirm_password !== password) {
      notify("error", "Password mismatch!", "Passwords donot match");
      return;
    }
    dispatch(registerUser({ email, password }, callBack));
  };

  return (
    <Row>
      <Col span={24}>
        <div className="form-container layout vertical center-center">
          <Title level={5} className="skamy-gray mb--40 mt--5">
            Create an account
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
              label="Email"
              name="email"
              className="bold"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your Email"
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
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              className="bold"
              rules={[
                {
                  required: true,
                  message: "Please confirm your Password!",
                },
              ]}
            >
              <Input.Password
                name="confirm_password"
                placeholder="Confirm password"
                className="login-form-input"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item>
              <YellowButton
                htmlType="submit"
                className="btn-block"
                text={loading ? "Creating account..." : "Register"}
                disabled={loading}
              />
            </Form.Item>
            <div className="layout horizontal center-justified center-center">
              <Link to="/login">
                <span className="bottom-text">Have an account ?, Login</span>
              </Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
