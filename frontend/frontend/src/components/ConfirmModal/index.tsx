/*
 * @文件描述: 确认弹窗组件
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-06-03 16:53:32
 */

import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Iprops {
  title: string;
  onOk?: () => void;
}

export function confirmModal({ title, onOk }: Iprops) {
  Modal.confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    content: `确定要${title}?`,
    okText: '确认',
    cancelText: '取消',
    onOk,
  });
}
