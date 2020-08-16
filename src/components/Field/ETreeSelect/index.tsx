import React from "react";
import { TreeSelect } from "antd";
import { TreeSelectProps } from "antd/lib/tree-select";

const { TreeNode } = TreeSelect;

export interface TreeDataSourceItem {
  name: string;
  id: number;
  children: TreeDataSourceItem[];
}

export interface ETreeSelectProps<T> extends TreeSelectProps<T> {
  dataSource: TreeDataSourceItem[];
}

export const getTeeNodes = (dataSource: TreeDataSourceItem[]) => {
  return dataSource.map((v) => (
    <TreeNode key={v.id} value={v.id} title={v.name}>
      {v.children && getTeeNodes(v.children)}
    </TreeNode>
  ));
};

const ETreeSelect = ({ dataSource, ...rest }: ETreeSelectProps<string>) => {
  return <TreeSelect {...rest}>{getTeeNodes(dataSource)}</TreeSelect>;
};
ETreeSelect.defaultProps = {
  dataSource: [],
  allowClear: true,
} as ETreeSelectProps<string>;
export default ETreeSelect;
