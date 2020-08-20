/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card, Form, Row, Col, Button, Input, Space, Table } from "antd";
import { EmptyView } from "@/components/EmptyView";
import { apiSystemUserQueryPage, User } from "@/api/apis/system";
import { useAntdTable } from "ahooks";
import { PaginatedParams } from "ahooks/lib/useAntdTable";
import { ColumnsType } from "antd/lib/table";

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
  console.log(formData);
  const params = { ...formData, pageNum: current, pageSize };
  const res = await apiSystemUserQueryPage(params);
  return {
    total: res.total,
    list: res.data,
  };
};

export default () => {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
  });

  const { type, changeType, submit, reset } = search;
  return (
    <>
      <Card bordered={false}>
        <Form form={form} name="advanced_search">
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name="username" label="用户名" style={{ margin: 0 }}>
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Button type="primary" onClick={submit}>
                  搜索
                </Button>
                <Button onClick={reset}>重置</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <EmptyView />
      <Table<User>
        rowKey="id"
        columns={getColumns()}
        // rowSelection={{ onChange }}
        {...tableProps}
      />
    </>
  );
};
