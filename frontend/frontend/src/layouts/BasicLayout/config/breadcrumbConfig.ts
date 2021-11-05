/*
 * @文件描述: 扩展面包屑
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-06 01:08:59
 */

export const routes = [
  {
    path: '/base',
    breadcrumbName: '基础管理',
    children: [
      {
        path: '/user',
        breadcrumbName: '用户管理',
        children: [
          { path: '/add', breadcrumbName: '新增' },
          { path: '/edit', breadcrumbName: '编辑' },
        ],
      },
      {
        path: '/IOT_Data',
        breadcrumbName: 'IOT信息',
      },
      {
        path:'/Map',
        breadcrumbName:'地图'
      }
    ],
  },
];
