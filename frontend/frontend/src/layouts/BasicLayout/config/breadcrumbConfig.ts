/*
 * @文件描述: 扩展面包屑
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-05 14:39:12
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
        path: '/department',
        breadcrumbName: '部门管理',
      },
      {
        path:'/myhw',
        breadcrumbName:'我的作业'
      }
    ],
  },
];
