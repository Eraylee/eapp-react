/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactText, useState } from "react";
import { Card, Form, Button, Input, Space, Table } from "antd";
import { EmptyView } from "@/components/EmptyView";
import { apiSystemUserQueryPage, User } from "@/api/apis/system";
import { useAntdTable } from "ahooks";
import { Detail } from "./Detail";
import { PaginatedParams } from "ahooks/lib/useAntdTable";
import { ColumnsType } from "antd/lib/table";
import { useModal } from "@/hooks";
import { remove } from "./store";
import { useDispatch } from "react-redux";
import { OperateType } from "@/types";
import { AdvancedSearch } from "@/components/AdvancedSearch";

const getColumns = (
  onEdit = (id: number) => {},
  onRomve = (id: number) => {}
): ColumnsType<User> => {
  return [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "操作",
      dataIndex: "tableAction",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record.id)}>修改</a>
          <a onClick={() => onRomve(record.id)}>删除</a>
        </Space>
      ),
    },
  ];
};

const getTableData = async (
  { current, pageSize }: PaginatedParams[0],
  formData: Partial<User>
) => {
  const params = { ...formData, pageNum: current, pageSize };
  const res = await apiSystemUserQueryPage(params);
  return {
    total: res.total,
    list: res.data,
  };
};

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [currentId, setCurrentId] = useState(0);
  const { visible, confirmLoading, open, ok, close, operateType } = useModal();
  const { submit, reset } = search;
  const onChange = (keys: ReactText[]) => {
    setSelectedRowKeys(keys);
  };
  const handleRmoveBatch = () => {
    dispatch(remove(selectedRowKeys));
  };
  const handleRemove = async (id: number) => {
    await dispatch(remove([id]));
    submit();
  };
  const handleCreate = () => {
    setCurrentId(0);
    open(OperateType.CREATE);
  };
  const handleEdit = (id: number) => {
    setCurrentId(id);
    open(OperateType.EDITE);
  };

  const isDisabled = selectedRowKeys.length === 0;

  return (
    <>
      <Card bordered={false}>
        <Form form={form}>
          <AdvancedSearch onReset={reset} onSubmit={submit}>
            <Form.Item name="username" label="用户名">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="nickname" label="昵称">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <Input placeholder="请输入" />
            </Form.Item>
          </AdvancedSearch>
        </Form>
      </Card>
      <EmptyView />
      <Card bordered={false}>
        <Space>
          <Button type="primary" onClick={handleCreate}>
            新建
          </Button>
          <Button onClick={handleRmoveBatch} disabled={isDisabled}>
            删除
          </Button>
        </Space>
        <EmptyView />
        <Table<User>
          rowKey="id"
          columns={getColumns(handleEdit, handleRemove)}
          rowSelection={{ onChange }}
          {...tableProps}
        />
      </Card>

      <Detail
        visible={visible}
        onRefresh={submit}
        operateType={operateType}
        confirmLoading={confirmLoading}
        onClose={close}
        id={currentId}
        onOk={ok}
      />
    </>
  );
};
