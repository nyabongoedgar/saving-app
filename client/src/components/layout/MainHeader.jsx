import React from "react";
import { useSelector } from "react-redux";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

function MainHeader() {
  return (
    <Header id="main-header" className="layout horizontal end-justified">
      <Dropdown>Logout</Dropdown>
    </Header>
  );
}

export default MainHeader;
