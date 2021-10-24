/*
 * @文件描述: 路由
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-06-13 10:35:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-20 15:36:29
 */

import {
  HomeOutlined,
  SettingOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const menuConfig = [
  {
    key: 'home',
    name: '首页',
    link: '/home',
    icon: HomeOutlined,
  },
  {
    key: 'base',
    name: '基础数据',
    icon: SettingOutlined,
    children: [
      {
        key: 'myhw',
        link: '/base/myhw',
        name: '实验室设备管理系统'
      },
    ],
  },
  {
    key: 'system',
    link: '',
    icon: SettingOutlined,
    name: '系统管理',

    children: [
      {
        key: 'config',
        link: '/system/config',
        name: '参数设置',
      },
      {
        key: 'network',
        link: '/system/network',
        name: '网络设置',
      },
    ],
  },
];

export { menuConfig };
