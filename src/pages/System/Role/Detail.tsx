import React, { useEffect } from "react";

import { Form, Input, Modal, InputNumber } from "antd";
import { OperateType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormValue,
  setFormValue,
  createOrUpdate,
  clearFormValue,
} from "./store";
import { AppState } from "@/store";
import { ModalOk } from "@/hooks";
import { ERadio } from "@/components/Field";

interface DetailProps {
  id?: number;
  confirmLoading: boolean;
  onClose: () => void;
  onOk: ModalOk;
  onRefresh: () => void;
  visible: boolean;
  operateType: OperateType;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export const Detail: React.FC<DetailProps> = ({
  onClose,
  onOk,
  visible,
  operateType,
  id,
  confirmLoading,
  onRefresh,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { formValue } = useSelector((state: AppState) => state.roleReducer);

  useEffect(() => {
    if (visible && operateType !== OperateType.CREATE && id) {
      dispatch(getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType, visible]);

  useEffect(() => {
    form.setFieldsValue(formValue);
    dispatch(setFormValue(formValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      console.log("id ", id);
      const isSuccess = !!(await dispatch(createOrUpdate(params, id)));
      if (isSuccess) {
        form.resetFields();
        dispatch(clearFormValue());
        onRefresh();
      }
      return isSuccess;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const close = () => {
    form.resetFields();
    dispatch(clearFormValue());
    onClose();
  };
  return (
    <>
      <Modal
        getContainer={false}
        title="Basic Modal"
        visible={visible}
        onOk={onOk(handleOk)}
        confirmLoading={confirmLoading}
        onCancel={close}
      >
        <Form form={form} {...layout}>
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="编码" name="code" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item label="排序" name="sort">
            <InputNumber placeholder="请输入" />
          </Form.Item>
          <Form.Item label="显示状态" name="visiable">
            <ERadio
              dataSource={[
                {
                  label: "显示",
                  value: 1,
                },
                {
                  label: "隐藏",
                  value: 2,
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
Detail.defaultProps = {
  confirmLoading: false,
  visible: false,
  operateType: OperateType.CREATE,
} as DetailProps;
