/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback, useState } from "react";
import { Card, Form, Row, Col, Button, Input, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMenuTreeData } from "./action";
import { AppState } from "@/store";
import { Menu } from "@/api/apis/system";
import { ColumnsType } from "antd/lib/table";
import Detail from "./Detail";
import { OperateType } from "@/types";

const menuTypes: { [key: string]: string } = {
  "1": "布局",
  "2": "接口",
  "3": "路由",
};

const columns: ColumnsType<Menu> = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "动作",
    dataIndex: "action",
  },
  {
    title: "地址",
    dataIndex: "path",
  },
  {
    title: "类型",
    dataIndex: "type",
    render: (value: string) => <Tag color="blue">{menuTypes[value]}</Tag>,
  },
  {
    title: "操作",
    dataIndex: "tableAction",
    render: (text, record) => (
      <Space size="middle">
        <a>修改</a>
        <a>删除</a>
      </Space>
    ),
  },
];

export default () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [operateType, setOperateType] = useState(OperateType.CREATE);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { menus } = useSelector((state: AppState) => state.menuReducer);
  useEffect(() => {
    dispatch(getMenuTreeData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = useCallback((keys) => {
    setSelectedRowKeys(keys);
  }, []);
  return (
    <>
      <Card bordered={false}>
        <Form
          form={form}
          name="advanced_search"
          // onFinish={onFinish}
        >
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name="name" label="名称" style={{ margin: 0 }}>
                <Input placeholder="please input" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <div style={{ height: 16 }} />
      <Card bordered={false}>
        <Space>
          <Button type="primary" onClick={() => setOpen(true)}>
            新建
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            删除
          </Button>
        </Space>
        <div style={{ height: 16 }} />
        <Table<Menu>
          rowKey="id"
          columns={columns}
          rowSelection={{ onChange }}
          dataSource={menus as Menu[]}
        />
        <Detail
          id={currentId}
          operateType={operateType}
          onClose={() => setOpen(false)}
          visible={open}
          onOk={() => setOpen(false)}
        />
      </Card>
    </>
  );
};
