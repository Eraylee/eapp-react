import React, { useEffect } from "react";

import { Form, Input, Modal, InputNumber } from "antd";
import { OperateType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { getFormValue, setFormValue, createOrUpdate } from "./store";
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
        dispatch(setFormValue({}));
      }
      return isSuccess;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const close = () => {
    form.resetFields();
    dispatch(setFormValue({}));
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
          <Form.Item label="类型" name="type" rules={[{ required: true }]}>
            <ESelect
              dataSource={[
                {
                  label: "布局",
                  value: 1,
                },
                {
                  label: "接口",
                  value: 2,
                },
                {
                  label: "路由",
                  value: 3,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="路径" name="path">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="方法" name="action">
            <ERadio
              dataSource={[
                {
                  label: "GET",
                  value: "GET",
                },
                {
                  label: "POST",
                  value: "POST",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="图标" name="icon">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="父级菜单" name={["parent", "id"]}>
            <ETreeSelect placeholder="请输入" dataSource={menus} />
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
