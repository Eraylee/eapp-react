/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card, Button, Space, Table } from "antd";
import { EmptyView } from "@/components/EmptyView";
import { apiLogLoginInfoQueryPage } from "@/api/apis/log";
import { useAntdTable } from "ahooks";
import { PaginatedParams } from "ahooks/lib/useAntdTable";
import { ColumnsType } from "antd/lib/table";
import { LoginInfo } from "@/api/apis/log";

const getColumns = (): ColumnsType<LoginInfo> => {
  return [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "ip",
      dataIndex: "ip",
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "系统",
      dataIndex: "os",
      render: (text, record) => text?.name,
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      render: (text, record) => text?.name,
    },
    {
      title: "消息",
      dataIndex: "message",
    },
    {
      title: "操作",
      dataIndex: "tableAction",
    },
  ];
};

const getTableData = async (
  { current, pageSize }: PaginatedParams[0],
  formData: Partial<LoginInfo>
) => {
  const params = { pageNum: current, pageSize };
  const res = await apiLogLoginInfoQueryPage(params);
  return {
    total: res.total,
    list: res.data,
  };
};

export default () => {
  const { tableProps, search } = useAntdTable(getTableData, {});

  const { submit } = search;

  return (
    <>
      <Card bordered={false}>
        <Space>
          <Button type='primary' onClick={submit}>
            查询
          </Button>
        </Space>
        <EmptyView />
        <Table<LoginInfo> rowKey='_id' columns={getColumns()} {...tableProps} />
      </Card>
    </>
  );
};
