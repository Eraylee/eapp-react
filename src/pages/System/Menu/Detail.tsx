import React, { useEffect } from "react";

import { Form, Input, Modal } from "antd";
import { OperateType } from "@/types";
import { useDispatch } from "react-redux";
import { getFormValue } from "./action";
import ESelect, { DataSourceItem } from "@/components/Field/Eselect";

interface DetailProps {
  id: number;
  onClose: () => void;
  onOk: () => void;
  visible: boolean;
  operateType: OperateType;
}

const dataSource: DataSourceItem[] = [
  {
    label: "布局",
    value: "1",
  },
  {
    label: "接口",
    value: "2",
  },
  {
    label: "路由",
    value: "3",
  },
];

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
        title='Basic Modal'
        visible={visible}
        onOk={onOk}
        onCancel={onClose}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='名称'>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item label='类型'>
            <ESelect dataSource={dataSource} />
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
