import React from "react";

import { Layout } from "antd";

import Routes from "../routes/AuthRoutes";

const { Content } = Layout;

export default function MainContent() {
  return (
    <Content
      style={{
        margin: "24px 16px 0",
        minHeight: "unset",
        paddingBottom: "70px",
      }}
    >
      <Routes />
    </Content>
  );
}
