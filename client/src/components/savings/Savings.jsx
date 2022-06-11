import React from "react";
import { Tabs, Button } from "antd";
import SavingsTable from "./SavingsTable";

const TabPane = Tabs.TabPane;

const Savings = () => {
  const tableOperations = (
    <>
      <Button>Export</Button>
      <Button>Add saving</Button>
    </>
  );
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        tabBarExtraContent={tableOperations}
        className="pills"
      >
        <TabPane tab="Savings" key="1">
         <SavingsTable dataSource={[]} columns={[]} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Savings;
