import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Form, Col, Row, Input, Modal, DatePicker } from "antd";
import { createSaving } from "../../redux/actions/savingsActions";
import YellowButton from "../common/button/Button";

const { TextArea } = Input;

const SavingsForm = ({ visible, setVisibility }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { addStatus } = useSelector((state) => state.savings);

  const initialValues = {};

  const callBack = () => setVisibility(false);

  const onFinish = (values) => {
    dispatch(
      createSaving(
        {
          amount: values.amount,
          description: values.description,
          date: new Date(values.date),
        },
        callBack
      )
    );
  };

  return (
    <Modal
      visible={visible}
      title="Deposit slip"
      className="modal-v1"
      footer={null}
      onCancel={() => setVisibility(false)}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        initialValues={initialValues}
        form={form}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="amount"
              label="Deposit Amount"
              rules={[{ required: true, message: "Deposit amount required" }]}
            >
              <Input placeholder="Enter your deposit" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Deposit date is required" }]}
            >
              <DatePicker
                style={{ width: "100%" }}    
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: false }]}
            >
              <TextArea rows={4} placeholder="Deposit description (optional)" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item>
              <YellowButton
                htmlType="submit"
                className="btn-block"
                text={addStatus ? "Creating deposit..." : "Submit deposit"}
                disabled={addStatus}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

SavingsForm.propTypes = {
  callBack: PropTypes.func,
};

SavingsForm.defaultProps = {
  visible: false,
};

export default SavingsForm;
