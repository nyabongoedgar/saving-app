import React from "react";
import { Table } from "antd";

const SavingsTable = ({ dataSource, loading }) => {
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date deposited",
      dataIndex: "date",
      key: "date",
    },
  ];
  return <Table dataSource={dataSource} columns={columns} loading={loading} />;
};

export default SavingsTable;
