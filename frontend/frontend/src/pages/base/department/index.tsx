/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2021-04-16 10:23:19
 */
import { useCallback, useEffect, useState } from 'react';
import CustomTable from '@/components/CustomTable';
import FileAddOutlined from '@ant-design/icons/FileAddOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import GroupOutlined from '@ant-design/icons/GroupOutlined';
import SearchFilter from './SearchFilter';
import { Divider, Modal } from 'antd';
import { ButtonItem } from '@/data-type/common';
import { DEFAULT_SEARCH_PROPS, DEFAULT_PAGE_DATA } from '@/constants';
import InputDialog from './InputDialog';
export default function DepartmentPage() {
  const [searchProps, changeSearchProps] = useState<defs.DepartmentQueryDTO>({
    ...DEFAULT_SEARCH_PROPS,
  });

  const [pageData, setPageData] = useState<defs.Page<defs.DepartmentVO>>(
    DEFAULT_PAGE_DATA,
  );
  const [selectedRowKeys, selectRow] = useState<number[] | string[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState<defs.DepartmentDTO | undefined>(
    undefined,
  );
  const fetchList = useCallback((props) => {
    setLoading(true);
    API.department.list.request({}, props).then((data) => {
      setLoading(false);
      data && setPageData(data);
    });
  }, []);
  useEffect(() => {
    if (!pageData.total) {
      fetchList(searchProps);
    }
  }, []);

  const columns = [
    { title: '组ID', width: 80, dataIndex: 'id' },
    {
      title: '部门名称',
      dataIndex: 'departmentName',
      render: (v: string, record: defs.DepartmentVO) => {
        return (
          <a
            onClick={() => {
              setDepartment({ ...record });
              setVisible(true);
            }}
          >
            <GroupOutlined />
            <span style={{ marginLeft: 5 }}>{v}</span>
          </a>
        );
      },
    },
    { title: '描述', dataIndex: 'description' },
    { title: '创建时间', width: 150, dataIndex: 'createdAt' },
    { title: '创建人', width: 100, dataIndex: 'createdBy' },
    { title: '更新时间', width: 150, dataIndex: 'updatedAt' },
    {
      title: '操作',
      width: 120,
      render: (_: any, record: defs.DepartmentVO) => (
        <>
          <a
            onClick={() => {
              setDepartment({ ...record });
              setVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDelete([`${record.id}`]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  const handleDelete = async (ids: string[] | number[]) => {
    const modal = Modal.confirm({
      centered: true,
      title: `您确定要删除选定的${ids.length}个资源组吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const success = await API.department.remove.request(
          {},
          ids as number[],
        );
        if (success) {
          fetchList({
            ...searchProps,
            page: 1,
          });
          selectRow([]);
        }
      },
    });
  };

  const handleSave = async (values: defs.DepartmentDTO) => {
    let result;
    if (department?.id) {
      result = await API.department.update.request(
        {},
        {
          id: department.id,
          ...values,
        },
      );
    } else {
      result = await API.department.add.request({}, values);
    }
    if (result) {
      setVisible(false);
      fetchList({
        ...searchProps,
      });
    }
  };

  const buttons: ButtonItem[] = [
    {
      text: '新增',
      icon: <FileAddOutlined />,
      type: 'primary',
      onClick: () => {
        setDepartment({});
        setVisible(true);
      },
    },
    {
      text: '删除',
      icon: <DeleteOutlined />,
      disabled: selectedRowKeys.length === 0,
      type: 'primary',
      onClick: () => handleDelete(selectedRowKeys),
    },
  ];
  const { list, page, total } = pageData;
  return (
    <>
      <CustomTable
        loading={loading}
        columns={columns}
        buttons={buttons}
        dataSource={list || []}
        current={page}
        size="middle"
        total={total}
        genRowKey={(record: defs.DepartmentVO) => `${record.id}`}
        onPagination={(current: number) => {
          const newSearchProps = {
            ...searchProps,
            page: current,
          };
          changeSearchProps(newSearchProps);
          fetchList(newSearchProps);
        }}
        rowSelection={{
          columnTitle: '选择',
          columnWidth: 50,
          selectedRowKeys,
          onChange: (keys: string[]) => selectRow(keys),
        }}
      >
        <SearchFilter
          searchProps={searchProps}
          changeSearchProps={(props) => {
            changeSearchProps({
              ...searchProps,
              ...props,
            });
          }}
          onSearch={() => {
            fetchList(searchProps);
          }}
        />
      </CustomTable>

      <InputDialog
        visible={visible}
        detailData={department}
        onClose={() => setVisible(false)}
        onSubmit={handleSave}
      />
    </>
  );
}
