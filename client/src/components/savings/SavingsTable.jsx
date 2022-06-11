import React from "react";
import PageTable from "../common/table/Table";

const SavingsTable = ({ dataSource, columns }) => {
  return <PageTable dataSource={dataSource} columns={columns} />;
};

export default SavingsTable;
