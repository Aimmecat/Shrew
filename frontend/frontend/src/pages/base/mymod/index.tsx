/*
 * @Author: your name
 * @Date: 2021-04-03 16:31:36
 * @LastEditTime: 2021-04-17 20:37:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\pages\base\myMod\index.tsx
 */
import {Button,Table,Tabs} from 'antd'
import Item from 'antd/lib/list/Item';

const { TabPane } = Tabs;
import { useState, useEffect } from 'react';

import DemoDualAxes from  './InputDialog';

export default function myModPage() {
    const [count,  setCounts] = useState(1);
    const [result, setResult] = useState('');
    const [pageData, setPageData] = useState<defs.Page<defs.DepartmentDTO>>();
    const clickMyButton = ()=>{
        setCounts(count + 1)
    };

    const getBycode = async()=>{
        const result = await API.department.getByCode.request({},{});
        setResult(result);
    };
    // useEffect(()=>{
    //     getBycode();
    // })
    
    const getList = async()=>{
        const queryDTO:defs.DepartmentQueryDTO={
            departmentName: '',
            page:1,
            pageSize:3,
        };
        const result = await API.department.list.request({},queryDTO);
        setPageData(result);
    };


    const columns=[
        { title:'id', width:80, dataIndex:'id'},
        { title:'部门名称', width:80, dataIndex:'departmentName'}
    ];


    return (
    <div>
        <div>count = {count}</div>
        <div>result = {result}</div>
        <Button type="primary" onClick={clickMyButton} style={{margin:20}}>点击我</Button>
        <Button type="primary" onClick={getBycode}     style={{margin:20}}>调用后端getByCode</Button>
        <Button type="primary"  onClick={getList} >获取部门列表数据</Button>
        <Table dataSource={pageData?.list} columns={columns} ></Table>
        <Tabs defaultActiveKey="1" onChange={()=>{}}>
            <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
            </TabPane>
        </Tabs>
        <div>Hello world</div>
    
        <DemoDualAxes/>
    </div>
    ); 
}
