import React, { useEffect } from "react";

import { Form, Input, Modal, InputNumber } from "antd";
import { OperateType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { getFormValue, setFormValue, createOrUpdate, clearFormValue } from "./store";
import ESelect from "@/components/Field/Eselect";
import { AppState } from "@/store";
import { ModalOk } from "@/hooks";
import { ERadio, ETreeSelect } from "@/components/Field";

interface DetailProps {
  id?: number;
  confirmLoading: boolean;
  onClose: () => void;
  onOk: ModalOk;
  visible: boolean;
  operateType: OperateType;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
export const Detail = ({
  onClose,
  onOk,
  visible,
  operateType,
  id,
  confirmLoading,
}: DetailProps) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { formValue, menus } = useSelector(
    (state: AppState) => state.menuReducer
  );

  useEffect(() => {
    if (visible && operateType !== OperateType.CREATE && id) {
      dispatch(getFormValue(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, operateType, visible]);

  useEffect(() => {
    form.setFieldsValue(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const handleOk = async () => {
    try {
      const params = await form.validateFields();
      const isSuccess = !!(await dispatch(createOrUpdate(params, id)));
      if (isSuccess) {
        form.resetFields();
        dispatch(clearFormValue());
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
        <Form form={form} {...layout} initialValues={formValue}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                type: "email",
                message: "邮箱不合法",
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="头像" name="avatar">
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
  onClose: () => {},
  confirmLoading: false,
  visible: false,
  operateType: OperateType.CREATE,
} as DetailProps;
