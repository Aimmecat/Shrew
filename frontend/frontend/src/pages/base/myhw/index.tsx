/*
 * @Author: your name
 * @Date: 2021-04-16 10:54:01
 * @LastEditTime: 2021-04-19 21:20:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\pages\base\myhw\index.tsx
 */

import { useCallback, useEffect, useState } from 'react';
import CustomTable from '@/components/CustomTable';
import FileAddOutlined from '@ant-design/icons/FileAddOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import GroupOutlined from '@ant-design/icons/GroupOutlined';
import SearchFilter from './SearchFilter';
import { Button, Divider, message, Modal ,Result,Tabs} from 'antd';
import { ButtonItem } from '@/data-type/common';
import { DEFAULT_SEARCH_PROPS, DEFAULT_PAGE_DATA } from '@/constants';
import InputDialog from './InputDialog';
// import MyhwDualAxes from './InputAxis';
import { DualAxes } from '@ant-design/charts';
import { List } from 'rc-field-form';


export default function MyhwPage(){
    const [data_value, setdata_value] = useState<Array<ObjectMap>>();
    const [data_num,   setdata_num] = useState<Array<ObjectMap>>();

    const [searchProps, changeSearchProps] = useState<defs.MyhwQueryDTO>({
        ...DEFAULT_SEARCH_PROPS,
      });
    
    const [pageData, setPageData] = useState<defs.Page<defs.MyhwDTO>>(
      DEFAULT_PAGE_DATA,
    );
    const [selectedRowKeys, selectRow] = useState<number[] | string[]>([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [myhw, setMyhw] = useState<defs.MyhwDTO | undefined>(
      undefined,
    );

    const fetchList = useCallback((props) => {
      setLoading(true);
      API.myhw.list.request({}, props).then((data) => {
        setLoading(false);
        data && setPageData(data);
      });
      getData_value();
      getData_num();
    }, []);
    
    useEffect(() => {
      if (!pageData.total) {
        fetchList(searchProps);
      }
    }, []);    

    const columns = [
      { title: '组ID', width: 80, dataIndex: 'id' },
      {
        title: '设备名称',
        dataIndex: 'equipmentName',
        render: (v: string, record: defs.MyhwVO) => {
          return (
            <a
              onClick={() => {
                  setMyhw({ ...record });
                setVisible(true);
              }}
            >
              <GroupOutlined />
              <span style={{ marginLeft: 5 }}>{v}</span>
            </a>
          );
        },
      },
      { title: '设备价格', dataIndex: 'equipmentValue' },
      { title: '使用人', width: 150, dataIndex: 'userPeople' },
      { title: '房间号', width: 100, dataIndex: 'homeId' },
      {
        title: '操作',
        width: 120,
        render: (_: any, record: defs.MyhwVO) => (
          <>
            <a
              onClick={() => {
                  setMyhw({ ...record });
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
      let result;
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
          result = await API.myhw.remove.request(
            {},
            ids as number[]
          );
          if (result) {
            message.success("删除成功！")
            fetchList({
              ...searchProps,
              page: 1,
            });
            selectRow([]);
          }
        },
      });
    };


    const handleSave = async (values: defs.MyhwDTO) => {
      let result;
      if (myhw?.id) {
        result = await API.myhw.update.request(
          {},
          {
            id: myhw.id,
            ...values,
          },
        );
      } else {
        result = await API.myhw.add.request({}, values);
      }
      if (result) {
        setVisible(false);
        message.success("保存成功！");
      }
      fetchList({
        ...searchProps,
      });
    };

    const { TabPane } = Tabs;
    function callback(key:any) {
      console.log(key);
    }

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: <FileAddOutlined />,
        type: 'primary',
        onClick: () => {
          setMyhw({});
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
    

    const getData_value = async()=>{
      const result = await API.myhw.TotalValue.request({},{});
      setdata_value(result);
      console.dir(result)
    };

    const getData_num = async()=>{
      const result = await API.myhw.TotalNum.request({},{});
      setdata_num(result);
    };

  console.dir(data_value)
  console.dir(data_num)
  var config = {
    data: [data_value, data_num],
    xField: 'userPeople',
    yField: ['SumEquipmentValue', 'SumEquipmentNum'],
    geometryOptions: [
      { 
        geometry: 'column' 
      },
      {
        geometry: 'line'        
      },
    ],
  };

  const { list, page, total } = pageData;

  return(
    <>
    <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="数据表" key="1"> 
      <CustomTable
        loading={loading}
        columns={columns}
        buttons={buttons}
        dataSource={list || []}
        current={page}
        size="middle"
        total={total}
        genRowKey={(record: defs.MyhwVO) => `${record.id}`}
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
      detailData={myhw}
      onClose={() => setVisible(false)}
      onSubmit={handleSave}
    />
    </TabPane>

    <TabPane tab="统计图" key="2" >
      <DualAxes {...config} />
    </TabPane>
  </Tabs>
  </>
  );
}