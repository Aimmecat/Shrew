import React, { useState, useEffect, useCallback } from 'react';
import { Select } from 'antd';

interface DepartmentSelectProps {
  mode?: 'multiple' | 'tags';
  value?: number | number[] | undefined;
  onChange?: (value: number | number[] | undefined) => void;
}

export default function DepartmentSelect(props: DepartmentSelectProps) {
  const [departmentList, setDepartmentList] = useState<defs.DepartmentVO[]>([]);
  const fetchDepartmentList = useCallback(() => {
    API.department.fetch.request({}).then(list => {
      setDepartmentList(list);
    });
  }, []);
  useEffect(() => {
    fetchDepartmentList();
  }, []);
  return (
    <Select
      showSearch={true}
      allowClear={true}
      mode={props.mode}
      placeholder="请选择组织机构"
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      value={props.value}
      notFoundContent={null}
      onSearch={fetchDepartmentList}
      onChange={(value: number | number[] | undefined) => {
        if (props.onChange) props.onChange(value);
      }}
    >
      {departmentList.map((item: defs.DepartmentVO) => (
        <Select.Option key={`department-${item.id}`} value={item.id!}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}
