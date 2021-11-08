/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: NO.1小組
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2021-11-07 22:07:41
 */

import { useCallback, useEffect, useState } from 'react';
import CustomTable from '@/components/CustomTable';
import FileAddOutlined from '@ant-design/icons/FileAddOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import GroupOutlined from '@ant-design/icons/GroupOutlined';
import SearchFilter from './SearchFilter';
import { Divider, message, Modal } from 'antd';
import { ButtonItem } from '@/data-type/common';
import { DEFAULT_SEARCH_PROPS, DEFAULT_PAGE_DATA } from '@/constants';
import InputDialog from './InputDialog';
export default function IotDataPage() {
  const [searchProps, changeSearchProps] = useState<defs.Iot_dataQueryDTO>({
    ...DEFAULT_SEARCH_PROPS,
  });

  const [pageData, setPageData] = useState<defs.Page<defs.Iot_dataVO>>(
    DEFAULT_PAGE_DATA,
  );
  const [selectedRowKeys, selectRow] = useState<number[] | string[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iotData, setiotData] = useState<defs.Iot_dataDTO | undefined>(
    undefined,
  );
  const fetchList = useCallback((props) => {
    setLoading(true);
    API.iot.list.request({}, props).then((data) => {
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
    { title: '设备ID', width: 100, dataIndex: 'equipmentId' },
    { title: '设备位置', width: 200, dataIndex: 'location' },
    { title: 'CO2(ppm)', width: 100, dataIndex: 'co2' },
    { title: 'CH2O(μg/m³)', width: 100, dataIndex: 'ch2o' },
    { title: 'TVOC(μg/m³)', width: 100, dataIndex: 'tvoc' },
    { title: 'PM2.5(μg/m³)', width: 100, dataIndex: 'pm25' },
    { title: 'PM10(μg/m³)', width: 100, dataIndex: 'pm10' },
    { title: '温度(℃)', width: 100, dataIndex: 'temperature' },
    { title: '湿度(%)', width: 100, dataIndex: 'humidity' },
    { title: '更新时间', width: 200, dataIndex: 'time' },
    {
      title: '操作',
      width: 120,
      render: (_: any, record: defs.Iot_dataDTO) => (
        <>
          <a
            onClick={() => {
              setiotData({ ...record });
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
        const success = await API.iot.remove.request({}, ids as number[]);
        if (success) {
          message.success('删除成功！');
          fetchList({
            ...searchProps,
            page: 1,
          });
          selectRow([]);
        }
      },
    });
  };

  const handleSave = async (values: defs.Iot_dataDTO) => {
    let result;
    console.log(iotData?.id);
    if (iotData?.id) {
      result = await API.iot.update.request(
        {},
        {
          id: iotData.id,
          ...values,
        },
      );
    } else {
      result = await API.iot.add.request({}, values);
    }

    if (result) {
      message.success('保存成功！');
      setVisible(false);
    }
    fetchList({
      ...searchProps,
    });
  };

  const buttons: ButtonItem[] = [
    {
      text: '新增',
      icon: <FileAddOutlined />,
      type: 'primary',
      onClick: () => {
        setiotData({});
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
        genRowKey={(record: defs.Iot_dataVO) => `${record.id}`}
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
        detailData={iotData}
        onClose={() => setVisible(false)}
        onSubmit={handleSave}
      />
    </>
  );
}
