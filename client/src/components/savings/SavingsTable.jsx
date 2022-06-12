import React from "react";
import { Table } from "antd";

export const columns = [
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
    render: (_, record) => {
      return new Date(record.date).toLocaleString();
    },
  },
];

const SavingsTable = ({ dataSource, loading }) => {
  return <Table dataSource={dataSource} columns={columns} loading={loading} />;
};

export default SavingsTable;
