import React from "react";
import { useDispatch } from "react-redux";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {logoutUser} from "../../redux/actions/authActions";

const { Header } = Layout;

function MainHeader() {
  const dispatch = useDispatch();
  const headerMenu = (
    <Menu>
      <Menu.Item onClick={() => dispatch(logoutUser())}>Logout</Menu.Item>
    </Menu>
  );
  return (
    <Header id="main-header" className="layout horizontal end-justified">
      <div className="layout horizontal center-center">
        <Dropdown overlay={headerMenu}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}

export default MainHeader;
