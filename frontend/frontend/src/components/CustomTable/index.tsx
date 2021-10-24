/*
 * @文件描述: 公共的Table组件，包含查询（可自定义）、列表（column和dataSource为参数）、分页、按钮栏
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-07-15 11:28:39
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-09-16 09:50:12
 */
import * as React from 'react';
import { Table, Button, Pagination, Alert } from 'antd';
import { PAGE_SIZE } from '@/constants';
import styles from './index.less';
import { ButtonItem } from '@/data-type/common';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Key } from 'antd/lib/table/interface';

export interface CustomTableProps {
  loading?: boolean;
  total?: number;
  current?: number;
  columns: object[];
  dataSource: object[];
  size?: SizeType;
  selectedAlert?: boolean;
  rowSelection?: any;
  expandedRowKeys?: string[];
  minWidth?: number;
  onRow?: (record: any, index?: number) => void;
  onPagination?: (current: number) => void;
  genRowKey: (record: any) => Key;
  expandedRowRender?: (record: any) => React.ReactNode;
  buttons?: ButtonItem[];
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  components?: any;
  onExpand?: (expanded: any, record: any) => void;
}

const CustomTable: React.SFC<CustomTableProps> = ({
  loading,
  children,
  columns,
  dataSource,
  current,
  total,
  rowSelection,
  onPagination,
  onRow,
  genRowKey,
  onChange,
  size,
  buttons,
  minWidth,
  components,
  expandedRowRender,
  onExpand,
  selectedAlert,
  expandedRowKeys,
}) => (
  <div className={styles.container} style={{ minWidth: minWidth }}>
    <div>
      <div className={styles.topbar}>{children}</div>
      <div className={styles.btnwrap}>
        {buttons !== undefined &&
          buttons.map((button) => (
            <Button
              key={button.text}
              type={button.type}
              icon={button.icon}
              loading={button.loading}
              onClick={button.onClick}
              disabled={button.disabled}
              className={styles.btn}
            >
              {button.text}
            </Button>
          ))}
      </div>
      {selectedAlert && rowSelection?.selectedRowKeys?.length > 0 && (
        <Alert
          message={
            <div>
              <span>已选择{rowSelection.selectedRowKeys.length}项</span>
              <a
                style={{ marginLeft: 20 }}
                onClick={() => rowSelection.onChange([])}
              >
                清空
              </a>
            </div>
          }
          type="info"
          showIcon
        />
      )}
      <div className={styles.table}>
        <Table
          columns={columns}
          className={styles.table}
          dataSource={dataSource}
          pagination={false}
          rowKey={genRowKey}
          components={components}
          onChange={onChange}
          size={size}
          loading={{
            spinning: loading,
            tip: '正在加载中......',
            size: 'large',
          }}
          expandedRowRender={expandedRowRender}
          onExpand={onExpand}
          expandedRowKeys={expandedRowKeys || []}
          rowSelection={rowSelection}
          onRow={onRow}
        />

        {onPagination !== undefined && (
          <div className={styles.bottombar}>
            <div className={styles.pageInfo}>
              共有{total}条记录，每页显示{PAGE_SIZE}条
            </div>
            <Pagination
              className={styles.pagination}
              showQuickJumper
              total={total}
              pageSize={PAGE_SIZE}
              current={current}
              onChange={onPagination}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);
CustomTable.defaultProps = {
  buttons: [],
  loading: false,
};
export default CustomTable;
