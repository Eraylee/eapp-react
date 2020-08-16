import React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";

const Option = Select.Option;

export interface DataSourceItem {
  label: string;
  value: string | number;
}

export interface ESelectProps<T> extends SelectProps<T> {
  dataSource: DataSourceItem[];
}

export const getOptions = (dataSource: DataSourceItem[]) => {
  return dataSource.map((v) => (
    <Option key={v.value} value={v.value}>
      {v.label}
    </Option>
  ));
};

const ESelect = ({ dataSource, ...rest }: ESelectProps<string>) => {
  return <Select {...rest}>{getOptions(dataSource)}</Select>;
};
ESelect.defaultProps = {
  dataSource: [],
  allowClear: true,
} as ESelectProps<string>;
export default ESelect;
