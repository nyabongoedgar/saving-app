import { Table } from "antd";

const PageTable = ({ dataSource, columns, loading }) => (
  <Table dataSource={dataSource} columns={columns} loading={loading} />
);

export default PageTable;
