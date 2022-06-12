import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Space } from "antd";
import SavingsTable from "./SavingsTable";
import YellowButton from "../common/button/Button";
import OutlinedButton from "../common/button/OutlinedButton";
import {getSavings} from "../../redux/actions/savingsActions"

const TabPane = Tabs.TabPane;

const Savings = () => {
  const dispatch = useDispatch();
  const {loading, savings} = useSelector(state => state.savings);
  useEffect(() => {
    dispatch(getSavings())
  }, [])

  const tableOperations = (
    <Space className="layout horizontal wrap table-operations">
      <OutlinedButton text="Export" />
      <YellowButton text="Add Saving" />
    </Space>
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
          <SavingsTable dataSource={savings} loading={loading} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Savings;
