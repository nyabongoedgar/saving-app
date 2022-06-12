import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Space } from "antd";
import { Excel } from "antd-table-saveas-excel";
import SavingsTable from "./SavingsTable";
import SavingsForm from "./SavingsForm";
import YellowButton from "../common/button/Button";
import OutlinedButton from "../common/button/OutlinedButton";
import {getSavings} from "../../redux/actions/savingsActions"
import {columns as SavingsColumns} from "./SavingsTable"

const TabPane = Tabs.TabPane;

const Savings = () => {
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const {loading, savings} = useSelector(state => state.savings);
  useEffect(() => {
    dispatch(getSavings())
  }, [dispatch])

  const handleExport = (columns, dataSource) => {
    const excel = new Excel();
    excel
      .addSheet("savings")
      .addColumns(columns)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Savings.xlsx");
  };

  const tableOperations = (
    <Space className="layout horizontal wrap table-operations">
      <OutlinedButton text="Export" onClick={() =>  handleExport(SavingsColumns, savings)} />
      <YellowButton text="Add Saving" onClick={() => setVisibility(true)} />
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
      <SavingsForm visible={visible} setVisibility={setVisibility} />
    </>
  );
};

export default Savings;
