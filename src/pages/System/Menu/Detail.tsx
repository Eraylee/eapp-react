import React, { useEffect } from "react";

import { Form, Input, Modal, Select } from "antd";
import { OperateType } from "@/types";
import { useDispatch } from "react-redux";
import { getFormValue } from "./action";
const { Option } = Select;

interface DetailProps {
  id: number;
  onClose: () => void;
  onOk: () => void;
  visible: boolean;
  operateType: OperateType;
}

const Detail = ({ onClose, onOk, visible, operateType, id }: DetailProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (operateType !== OperateType.CREATE) {
      dispatch(getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType]);
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={onClose}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="名称">
            <Input placeholder="please input" />
          </Form.Item>
          <Form.Item label="类型">
            <Select allowClear>
              <Option value="1">布局</Option>
              <Option value="2">接口</Option>
              <Option value="3">路由</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
Detail.defaultProps = {
  id: 0,
  onClose: () => {},
  onOk: () => {},
  visible: false,
  operateType: OperateType.CREATE,
} as DetailProps;
export default Detail;
