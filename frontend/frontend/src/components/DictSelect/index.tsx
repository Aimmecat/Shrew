import React from 'react';
import { Select } from 'antd';
import { getDictList } from '@/utils/dict-utils';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface DictSelectProps {
  className?: string;
  size?: SizeType;
  type: string;
  value?: number | number[] | undefined;
  onChange?: (value: number | number[] | undefined) => void;
}

export default function DictSelect(props: DictSelectProps) {
  return (
    <Select
      size={props.size}
      placeholder="请选择"
      allowClear
      value={props.value}
      onChange={props.onChange}
      className={props.className}
    >
      {getDictList(props.type).map(item => (
        <Select.Option key={`${item.value}`} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
}
