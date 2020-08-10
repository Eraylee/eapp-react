import React, { useState } from "react";
import { Card, Form, Row, Col, Button, Input, Space, Table } from "antd";

export default () => {
  const [form] = Form.useForm();
  return (
    <>
      <Card bordered={false}>
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          // onFinish={onFinish}
        >
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name="name" label="名称">
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
    </>
  );
};
